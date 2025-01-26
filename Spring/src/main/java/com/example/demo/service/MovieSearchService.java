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
    
    private final MovieApiService movieApiService; // 영화 API 서비스 주입
    private final MovieCacheService movieCacheService; // 영화 캐시 서비스 주입
    private final SearchConditionMapper searchConditionMapper; // 검색 조건 매퍼 주입
    private final ObjectMapper objectMapper; // 객체 매퍼 주입
    
    private static final List<String> GENRES = Arrays.asList(
        "드라마", "액션", "코미디", "스릴러", "SF", "애니메이션", "다큐멘터리" // 장르 리스트 더 추가해야 됨
    );

    public JsonNode searchMovies(String nation, String startYear, String endYear, 
                               String title, String actor, String director) { // 영화 검색 메서드
        try {
            log.info("검색 시작 - nation: {}, startYear: {}, endYear: {}, title: {}, actor: {}, director: {}", 
                     nation, startYear, endYear, title, actor, director);

            // 검색 조건으로 기존 결과 확인
            SearchCondition searchCondition = SearchCondition.builder() // 검색 조건 빌더 패턴 사용
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
                
                // 캐시 된 결과가 있다면 캐시 서비스에서 DB에 저장된 검색 조건 조회 반환
                JsonNode cachedResult = movieCacheService.getCachedResult(existingCondition.getId());
                
                // 통계 정보 추가
                ((ObjectNode) cachedResult).put("totalMovies", existingCondition.getTotalMovies());
                ((ObjectNode) cachedResult).put("uniqueMovies", existingCondition.getUniqueMovies());
                ((ObjectNode) cachedResult).put("duplicateMovies", 
                    existingCondition.getTotalMovies() - existingCondition.getUniqueMovies());
                
                return cachedResult;
            }

            List<String> responses = new ArrayList<>();

            // 연도별, 장르별 검색 수행
            if (startYear != null && endYear != null) { // 시작 연도와 종료 연도가 모두 있는 경우
                for (int year = Integer.parseInt(startYear); year <= Integer.parseInt(endYear); year++) {                
                    final String yearStr = String.valueOf(year); // 연도 문자열로 변환
                    for (String genre : GENRES) { // 장르 리스트 반복
                        log.debug("장르별 검색 시도 - year: {}, genre: {}", yearStr, genre);
                        String response = movieApiService.searchByYearAndGenre( // 연도와 장르별 API 통해 검색
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
            JsonNode mergedResult = mergeResults(responses, searchCondition); // JsonNode 타입으로 반환 mergeResults 메서드에 list 타입 인자 responses와 searchCondition 전달

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

    private JsonNode createEmptyResult() { // 빈 결과 생성
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

    private JsonNode mergeResults(List<String> responses, SearchCondition searchCondition) throws Exception { // 결과 병합
        ObjectNode mergedResult = objectMapper.createObjectNode(); // 병합된 결과 생성
        ArrayNode mergedData = objectMapper.createArrayNode(); // 병합된 데이터 생성
        ObjectNode dataObject = objectMapper.createObjectNode(); // 데이터 객체 생성
        ArrayNode movieArray = objectMapper.createArrayNode(); // 영화 배열 생성
        
        Set<String> uniqueMovieSeqs = new HashSet<>(); // 중복 제거를 위한 영화 시퀀스 집합 HashSet은 중복된 값을 합침
        int totalCount = 0; // 총 영화 수
        int totalMoviesBeforeDuplication = 0; // 중복 제거 전 영화 수

        for (String response : responses) {
            JsonNode result = objectMapper.readTree(response); // 응답 문자열을 JsonNode로 변환
            JsonNode movies = result.path("Data").get(0).path("Result"); // 영화 배열 추출 객체 
            // response.Data.Result 의 배열 {[0 :{title : @@, movieSeq : @@...}], [1 :{title : @@, movieSeq : @@...}], ...}
            totalCount += result.path("TotalCount").asInt(0); // 총 영화 수 합산
            
            if (movies.isArray()) {
                int currentMoviesCount = movies.size(); // 현재 영화 수
                totalMoviesBeforeDuplication += currentMoviesCount; // 중복 제거 전 영화 수 합산
                
                for (JsonNode movie : movies) {
                    String movieSeq = movie.path("movieSeq").asText(); // 영화 시퀀스 추출
                    if (uniqueMovieSeqs.add(movieSeq)) { // 중복 제거를 위해 영화 시퀀스 집합에 추가
                        movieArray.add(movie); // 영화 배열에 추가
                    }
                }
            }
        }

        int uniqueMoviesCount = uniqueMovieSeqs.size(); // HashSet을 이용한 중복 제거 후 영화 수
        int duplicateCount = totalMoviesBeforeDuplication - uniqueMoviesCount; // 중복된 영화 수
        
        // 검색 조건에 통계 정보 설정
        searchCondition.setTotalMovies(totalMoviesBeforeDuplication);
        searchCondition.setUniqueMovies(uniqueMoviesCount);
        
        log.info("영화 검색 결과 통계:");
        log.info("- 총 API 응답 수: {}", responses.size());
        log.info("- 전체 영화 수 (중복 포함): {}", totalMoviesBeforeDuplication);
        log.info("- 중복 제거된 영화 수: {}", uniqueMoviesCount);
        log.info("- 중복된 영화 수: {}", duplicateCount);
        
        dataObject.put("TotalCount", totalCount);
        dataObject.set("Result", movieArray);
        mergedData.add(dataObject);
        mergedResult.set("Data", mergedData);
        mergedResult.put("TotalCount", totalCount);
        
        // 통계 정보 추가
        mergedResult.put("totalMovies", totalMoviesBeforeDuplication);
        mergedResult.put("uniqueMovies", uniqueMoviesCount);
        mergedResult.put("duplicateMovies", duplicateCount);

        return mergedResult;
    }
} 