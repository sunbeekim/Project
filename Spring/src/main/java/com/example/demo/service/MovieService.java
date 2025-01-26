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
    private final MovieSearchService movieSearchService;
    private final MovieApiService movieApiService;
    private final WebClient webClient;
    
    @Value("${kobis.api.key}")
    private String apiKey;
    
    public Map<String, Object> getDailyBoxOffice(String targetDt) {
        try {
            return webClient
                .get()
                .uri(uriBuilder -> uriBuilder
                    .path("/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json")
                    .queryParam("key", apiKey)
                    .queryParam("targetDt", targetDt)
                    .build())
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
        } catch (Exception e) {
            log.error("박스오피스 API 호출 실패", e);
            throw new RuntimeException("API 호출 실패: " + e.getMessage());
        }
    }
    
    public JsonNode searchMovies(String nation, String startYear, String endYear, 
                               String title, String actor, String director) {
        return movieSearchService.searchMovies(nation, startYear, endYear, title, actor, director);
    }
    
    public String testSingleSearch(String director) {
        return movieApiService.searchByDirector(director);
    }
}