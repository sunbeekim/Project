package com.example.demo.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.example.demo.mapper.MovieResultMapper;
import com.example.demo.model.MovieResult;
import com.example.demo.model.SearchCondition;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieSearchService movieSearchService; // 영화 검색 서비스
    private final MovieApiService movieApiService; // 영화 API 서비스
    private final WebClient kobisWebClient; // 영화 API 클라이언트
    
    @Value("${kobis.api.key}")
    private String apiKey;
    
    public Map<String, Object> getDailyBoxOffice(String targetDt) { // 일일 박스오피스 조회
        try {
            return kobisWebClient // 영화 API 클라이언트 사용
                .get() // GET 요청 생성
                .uri(uriBuilder -> uriBuilder // URI 빌더 사용
                    .path("/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json") // 경로 설정
                    .queryParam("key", apiKey) // API 키 추가
                    .queryParam("targetDt", targetDt) // 조회할 날짜 추가
                    .build()) // URI 빌더 사용
                .accept(MediaType.APPLICATION_JSON) // JSON 형식 지정
                .retrieve() // 응답 처리
                .bodyToMono(Map.class) // 응답 본문을 Map으로 변환
                .block(); // 비동기 요청 처리
        } catch (Exception e) {
            log.error("박스오피스 API 호출 실패 - targetDt: {}", targetDt, e);
            throw new RuntimeException("API 호출 실패: " + e.getMessage());
        }
    }
    
    public JsonNode searchMovies(String nation, String startYear, String endYear, 
                               String title, String actor, String director) {
        return movieSearchService.searchMovies(nation, startYear, endYear, title, actor, director); // 영화 검색 서비스 호출
    }
    
    public String testSingleSearch(String director) {
        return movieApiService.searchByDirector(director);
    }
}