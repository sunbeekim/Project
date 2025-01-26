package com.example.demo.service;

import com.example.demo.mapper.SearchConditionMapper;
import com.example.demo.model.SearchCondition;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MovieSearchService {
    
    private final MovieApiService movieApiService;
    private final MovieCacheService movieCacheService;
    private final SearchConditionMapper searchConditionMapper;
    private final ObjectMapper objectMapper;
    
    private static final List<String> GENRES = Arrays.asList(
        "드라마", "액션", "코미디", "스릴러", "SF", "애니메이션", "다큐멘터리"
    );

    public JsonNode searchMovies(String nation, String startYear, String endYear, 
                               String title, String actor, String director) {
        try {
            log.info("검색 시작 - nation: {}, startYear: {}, endYear: {}, title: {}, actor: {}, director: {}", 
                     nation, startYear, endYear, title, actor, director);

            // 검색 조건으로 기존 결과 확인
            SearchCondition searchCondition = SearchCondition.builder()
                .nation(nation)
                .startYear(startYear)
                .endYear(endYear)
                .title(title)
                .actor(actor)
                .director(director)
                .build();

            // 기존 검색 결과 확인
            SearchCondition existingCondition = searchConditionMapper.findByConditions(searchCondition);
            if (existingCondition != null) {
                log.info("기존 검색 결과 존재 - searchConditionId: {}", existingCondition.getId());
                return movieCacheService.getCachedResult(existingCondition.getId());
            }

            List<String> responses = new ArrayList<>();

            // 연도별, 장르별 검색 수행
            if (startYear != null && endYear != null) {
                for (int year = Integer.parseInt(startYear); year <= Integer.parseInt(endYear); year++) {
                    final String yearStr = String.valueOf(year);
                    for (String genre : GENRES) {
                        log.debug("장르별 검색 시도 - year: {}, genre: {}", yearStr, genre);
                        String response = movieApiService.searchByYearAndGenre(
                            nation, yearStr, title, actor, director, genre);
                        if (response != null) {
                            log.debug("검색 결과 있음 - year: {}, genre: {}", yearStr, genre);
                            responses.add(response);
                        }
                    }
                }
            } else {
                // 연도 없이 검색
                log.debug("연도 없이 검색 시도");
                for (String genre : GENRES) {
                    String response = movieApiService.searchByGenre(
                        nation, startYear, endYear, title, actor, director, genre);
                    if (response != null) {
                        responses.add(response);
                    }
                }
            }

            // 결과가 없으면 빈 결과 반환
            if (responses.isEmpty()) {
                log.info("검색 결과 없음");
                return createEmptyResult();
            }

            log.info("검색 결과 병합 시작 - 응답 수: {}", responses.size());
            // 결과 병합
            JsonNode mergedResult = mergeResults(responses);

            // 검색 조건과 결과 저장
            log.info("검색 결과 저장 시작");
            movieCacheService.saveSearchResult(searchCondition, mergedResult);

            return mergedResult;
        } catch (NumberFormatException e) {
            log.error("연도 형식 오류", e);
            throw new RuntimeException("연도 형식이 올바르지 않습니다: " + e.getMessage());
        } catch (Exception e) {
            log.error("영화 검색 중 예외 발생", e);
            throw new RuntimeException("영화 검색 실패: " + e.getMessage(), e);
        }
    }

    private JsonNode createEmptyResult() {
        ObjectNode emptyResult = objectMapper.createObjectNode();
        emptyResult.put("TotalCount", 0);
        
        ArrayNode dataArray = objectMapper.createArrayNode();
        ObjectNode dataObject = objectMapper.createObjectNode();
        dataObject.put("TotalCount", 0);
        dataObject.set("Result", objectMapper.createArrayNode());
        dataArray.add(dataObject);
        emptyResult.set("Data", dataArray);
        
        return emptyResult;
    }

    private JsonNode mergeResults(List<String> responses) throws Exception {
        ObjectNode mergedResult = objectMapper.createObjectNode();
        ArrayNode mergedData = objectMapper.createArrayNode();
        ObjectNode dataObject = objectMapper.createObjectNode();
        ArrayNode movieArray = objectMapper.createArrayNode();
        
        Set<String> uniqueMovieSeqs = new HashSet<>();
        int totalCount = 0;

        for (String response : responses) {
            JsonNode result = objectMapper.readTree(response);
            JsonNode movies = result.path("Data").get(0).path("Result");
            totalCount += result.path("TotalCount").asInt(0);
            
            if (movies.isArray()) {
                for (JsonNode movie : movies) {
                    String movieSeq = movie.path("movieSeq").asText();
                    if (uniqueMovieSeqs.add(movieSeq)) {
                        movieArray.add(movie);
                    }
                }
            }
        }

        dataObject.put("TotalCount", totalCount);
        dataObject.set("Result", movieArray);
        mergedData.add(dataObject);
        mergedResult.set("Data", mergedData);
        mergedResult.put("TotalCount", totalCount);

        return mergedResult;
    }
} 