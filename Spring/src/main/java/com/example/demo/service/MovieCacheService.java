package com.example.demo.service;

import com.example.demo.mapper.MovieResultMapper;
import com.example.demo.mapper.SearchConditionMapper;
import com.example.demo.model.MovieResult;
import com.example.demo.model.SearchCondition;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class MovieCacheService {
    
    private final SearchConditionMapper searchConditionMapper;
    private final MovieResultMapper movieResultMapper;
    private final ObjectMapper objectMapper;

    public SearchCondition findByConditions(String nation, String startYear, String endYear,
                                          String title, String actor, String director) {
        return searchConditionMapper.findByConditions(
            SearchCondition.builder()
                .nation(nation)
                .startYear(startYear)
                .endYear(endYear)
                .title(title)
                .actor(actor)
                .director(director)
                .build()
        );
    }

    public JsonNode getCachedResult(Integer searchConditionId) {
        try {
            List<MovieResult> cachedResults = movieResultMapper.findBySearchConditionId(searchConditionId);
            
            ObjectNode result = objectMapper.createObjectNode();
            result.put("TotalCount", cachedResults.size());
            
            ArrayNode dataArray = objectMapper.createArrayNode();
            ObjectNode dataObject = objectMapper.createObjectNode();
            dataObject.put("TotalCount", cachedResults.size());
            
            ArrayNode movieArray = objectMapper.createArrayNode();
            
            for (MovieResult movie : cachedResults) {
                ObjectNode movieNode = objectMapper.createObjectNode();
                movieNode.put("movieSeq", movie.getMovieSeq());
                movieNode.put("title", movie.getTitle());
                movieNode.put("titleEng", movie.getTitleEng());
                
                // JSON 문자열을 JsonNode로 변환하여 설정
                movieNode.set("directors", objectMapper.readTree(movie.getDirectors()));
                movieNode.set("actors", objectMapper.readTree(movie.getActors()));
                movieNode.set("plots", objectMapper.readTree(movie.getPlots()));
                
                movieNode.put("genre", movie.getGenre());
                movieNode.put("nation", movie.getNation());
                movieNode.put("prodYear", movie.getProdYear());
                movieNode.put("runtime", movie.getRuntime());
                movieNode.put("rating", movie.getRating());
                movieNode.put("posters", movie.getPosters());
                movieNode.put("company", movie.getCompany());
                
                movieArray.add(movieNode);
            }
            
            dataObject.set("Result", movieArray);
            dataArray.add(dataObject);
            result.set("Data", dataArray);
            
            return result;
        } catch (Exception e) {
            log.error("캐시된 결과 조회 중 오류 발생", e);
            throw new RuntimeException("캐시된 결과 조회 실패: " + e.getMessage());
        }
    }

    public void saveSearchResult(SearchCondition searchCondition, JsonNode results) {
        try {
            // 검색 조건 저장 (이미 통계 정보가 설정되어 있음)
            searchConditionMapper.save(searchCondition);
            
            // 영화 결과 저장
            JsonNode movies = results.path("Data").get(0).path("Result");
            if (movies.isArray()) {
                for (JsonNode movie : movies) {
                    MovieResult movieResult = MovieResult.builder()
                        .searchConditionId(searchCondition.getId())
                        .movieSeq(movie.path("movieSeq").asText())
                        .title(movie.path("title").asText())
                        .titleEng(movie.path("titleEng").asText())
                        .directorNm(movie.path("directors").path("director").get(0).path("directorNm").asText())
                        .actorNm(movie.path("actors").path("actor").get(0).path("actorNm").asText())
                        .genre(movie.path("genre").asText())
                        .nation(movie.path("nation").asText())
                        .prodYear(movie.path("prodYear").asText())
                        .plot(movie.path("plots").path("plot").get(0).path("plotText").asText())
                        .plots(movie.path("plots").toString())  // JSON 문자열로 저장
                        .directors(movie.path("directors").toString())  // JSON 문자열로 저장
                        .actors(movie.path("actors").toString())  // JSON 문자열로 저장
                        .posters(movie.path("posters").asText())
                        .runtime(movie.path("runtime").asText())
                        .rating(movie.path("rating").asText())
                        .posterUrl(movie.path("posters").asText())
                        .company(movie.path("company").asText())
                        .build();
                        
                    movieResultMapper.save(movieResult);
                }
            }
        } catch (Exception e) {
            log.error("영화 결과 저장 중 오류 발생", e);
            throw new RuntimeException("영화 결과 저장 실패: " + e.getMessage());
        }
    }

    private JsonNode convertToJsonNode(List<MovieResult> movieResults) {
        ObjectNode result = objectMapper.createObjectNode();
        result.put("TotalCount", movieResults.size());
        
        ArrayNode dataArray = objectMapper.createArrayNode();
        ObjectNode dataObject = objectMapper.createObjectNode();
        dataObject.put("TotalCount", movieResults.size());
        
        ArrayNode movieArray = objectMapper.createArrayNode();
        
        for (MovieResult movie : movieResults) {
            ObjectNode movieNode = objectMapper.createObjectNode();
            movieNode.put("movieSeq", movie.getMovieSeq());
            movieNode.put("title", movie.getTitle());
            movieNode.put("director", movie.getDirectorNm());
            movieNode.put("actor", movie.getActorNm());
            movieNode.put("genre", movie.getGenre());
            movieNode.put("nation", movie.getNation());
            movieNode.put("prodYear", movie.getProdYear());
            movieNode.put("plot", movie.getPlot());
            movieNode.put("posters", movie.getPosterUrl());
            movieArray.add(movieNode);
        }
        
        dataObject.set("Result", movieArray);
        dataArray.add(dataObject);
        result.set("Data", dataArray);
        
        return result;
    }

    // 숫자 파싱 헬퍼 메서드들
    private Integer parseIntSafely(String value) {
        try {
            return value != null && !value.trim().isEmpty() ? Integer.parseInt(value.trim()) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private Long parseLongSafely(String value) {
        try {
            return value != null && !value.trim().isEmpty() ? Long.parseLong(value.trim()) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }
} 