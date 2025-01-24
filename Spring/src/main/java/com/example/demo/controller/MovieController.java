package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import java.util.Collections;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import java.net.URI;
import java.util.Map;
import java.util.HashMap;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import lombok.extern.slf4j.Slf4j;
import java.util.Optional;
import java.util.List;
import java.util.Arrays;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import java.util.Objects;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import java.util.Set;
import java.util.LinkedHashSet;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;
import com.example.demo.service.SearchConditionService;
import com.example.demo.model.SearchCondition;

@Slf4j
@RestController
@RequestMapping("/api/movie")
public class MovieController {

  @Value("${kobis.api.key}")
  private String apiKey;

  @Value("${movie.api.key}")
  private String movieApiKey;

  private final RestTemplate restTemplate;
  private final WebClient webClient;

 

  @Autowired
  private SearchConditionService searchConditionService;

  public MovieController(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
    this.webClient = WebClient.builder()
        .baseUrl("http://api.koreafilm.or.kr")
        .build();
  }

  @GetMapping("/boxoffice/daily")
  public ResponseEntity<?> getDailyBoxOffice(@RequestParam String targetDt) {
    String url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json";

    try {

      UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
          .queryParam("key", apiKey)
          .queryParam("targetDt", targetDt);

      ResponseEntity<Map> response = restTemplate.getForEntity(
          builder.toUriString(),
          Map.class);

      return ResponseEntity.ok(response.getBody());

    } catch (Exception e) {
      log.error("박스오피스 API 호출 실패", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("API 호출 실패: " + e.getMessage());
    }
  }

  @GetMapping("/search")
  public ResponseEntity<?> searchMovies(
      @RequestParam(required = false) String nation,
      @RequestParam(required = false) String startYear,
      @RequestParam(required = false) String endYear,
      @RequestParam(required = false) String title,
      @RequestParam(required = false) String actor,
      @RequestParam(required = false) String director
  ) {
      try {
          // DB에서 기존 검색 결과 확인
          Optional<SearchCondition> existingSearch = searchConditionService.findByConditions(
              nation, startYear, endYear, title, actor, director);
          
          if (existingSearch.isPresent()) {
              SearchCondition condition = existingSearch.get();
              log.info("캐시된 검색 결과 사용 - 검색일시: {}", condition.getSearchDate());
              return ResponseEntity.ok()
                  .contentType(MediaType.APPLICATION_JSON)
                  .body(condition.getSearchResult());
          }

          // 기존 API 검색 로직
          List<String> genres = Arrays.asList(
              "드라마", "코미디", "액션", "스릴러", "공포", "범죄",
              "로맨스", "판타지", "SF", "애니메이션", "다큐멘터리"
          );

          List<CompletableFuture<String>> futures = new ArrayList<>();

          // 장르별 검색
          genres.forEach(genre -> {
              futures.add(CompletableFuture.supplyAsync(() -> {
                  try {
                      String response = searchByGenre(nation, startYear, endYear, title, actor, director, genre);
                      log.info("장르: {} - 검색 완료", genre);
                      return response;
                  } catch (Exception e) {
                      log.error("Genre {} search failed", genre, e);
                      return null;
                  }
              }));
          });

          // 연도별 검색 (startYear부터 endYear까지)
          if (startYear != null && endYear != null) {
              int start = Integer.parseInt(startYear);
              int end = Integer.parseInt(endYear);

              for (int year = start; year <= end; year++) {
                  final String searchYear = String.valueOf(year);
                  futures.add(CompletableFuture.supplyAsync(() -> {
                      try {
                          String response = searchByYear(nation, searchYear, title, actor, director);
                          log.info("연도: {} - 검색 완료", searchYear);
                          return response;
                      } catch (Exception e) {
                          log.error("Year {} search failed", searchYear, e);
                          return null;
                      }
                  }));
              }
          }

          List<String> responses = futures.stream()
              .map(CompletableFuture::join)
              .filter(Objects::nonNull)
              .collect(Collectors.toList());

          ObjectMapper mapper = new ObjectMapper();
          JsonNode mergedResults = mergeResults(responses, mapper);
          String resultJson = mapper.writeValueAsString(mergedResults);

          // 검색 결과를 DB에 저장
          SearchCondition searchCondition = SearchCondition.builder()
              .nation(nation)
              .startYear(startYear)
              .endYear(endYear)
              .title(title)
              .actor(actor)
              .director(director)
              .searchDate(LocalDateTime.now())
              .searchResult(resultJson)
              .build();
          
          searchConditionService.saveSearchCondition(searchCondition);
          log.info("새로운 검색 결과 저장 완료");

          return ResponseEntity.ok()
              .contentType(MediaType.APPLICATION_JSON)
              .body(resultJson);

      } catch (Exception e) {
          log.error("영화 검색 실패", e);
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body(Map.of("error", "검색 실패", "message", e.getMessage()));
      }
  }

  private String searchByYear(String nation, String year, String title, String actor, String director) {
      WebClient client = WebClient.builder()
          .baseUrl("http://api.koreafilm.or.kr")
          .codecs(configurer -> configurer
              .defaultCodecs()
              .maxInMemorySize(5 * 1024 * 1024))
          .build();

      return client
          .get()
          .uri(uriBuilder -> uriBuilder
              .path("/openapi-data2/wisenut/search_api/search_json2.jsp")
              .queryParam("ServiceKey", movieApiKey)
              .queryParam("collection", "kmdb_new2")
              .queryParam("listCount", 500)
              .queryParam("startCount", 0)
              .queryParam("detail", "Y")
              .queryParam("createDts", year)
              .queryParam("createDte", year)
              .queryParamIfPresent("nation", Optional.ofNullable(nation))
              .queryParamIfPresent("title", Optional.ofNullable(title))
              .queryParamIfPresent("actor", Optional.ofNullable(actor))
              .queryParamIfPresent("director", Optional.ofNullable(director))
              .build())
          .accept(MediaType.APPLICATION_JSON)
          .retrieve()
          .bodyToMono(String.class)
          .block();
  }

  private String searchByGenre(String nation, String startYear, String endYear, 
                             String title, String actor, String director, String genre) {
      WebClient client = WebClient.builder()
          .baseUrl("http://api.koreafilm.or.kr")
          .codecs(configurer -> configurer
              .defaultCodecs()
              .maxInMemorySize(5 * 1024 * 1024))
          .build();

      return client
          .get()
          .uri(uriBuilder -> uriBuilder
              .path("/openapi-data2/wisenut/search_api/search_json2.jsp")
              .queryParam("ServiceKey", movieApiKey)
              .queryParam("collection", "kmdb_new2")
              .queryParam("listCount", 500)
              .queryParam("startCount", 0)
              .queryParam("detail", "Y")
              .queryParam("genre", genre)
              .queryParamIfPresent("nation", Optional.ofNullable(nation))
              .queryParamIfPresent("title", Optional.ofNullable(title))
              .queryParamIfPresent("actor", Optional.ofNullable(actor))
              .queryParamIfPresent("director", Optional.ofNullable(director))
              .queryParamIfPresent("createDts", Optional.ofNullable(startYear))
              .queryParamIfPresent("createDte", Optional.ofNullable(endYear))
              .build())
          .accept(MediaType.APPLICATION_JSON)
          .retrieve()
          .bodyToMono(String.class)
          .block();
  }

  private JsonNode mergeResults(List<String> responses, ObjectMapper mapper) throws Exception {
      int totalCount = 0;
      Set<JsonNode> uniqueMovies = new LinkedHashSet<>();

      // 각 응답을 파싱하고 영화 데이터 추출
      for (String response : responses) {
          JsonNode root = mapper.readTree(response);
          JsonNode data = root.path("Data");
          if (data.isArray() && data.size() > 0) {
              JsonNode firstResult = data.get(0);
              totalCount += firstResult.path("TotalCount").asInt();
              
              // 영화 목록 추출 및 중복 제거
              JsonNode movies = firstResult.path("Result");
              if (movies.isArray()) {
                  movies.forEach(movie -> uniqueMovies.add(movie));
              }
          }
      }

      // 결과 구조 생성
      ObjectNode result = mapper.createObjectNode();
      result.put("TotalCount", totalCount);
      
      ArrayNode dataArray = mapper.createArrayNode();
      ObjectNode dataObject = mapper.createObjectNode();
      dataObject.put("TotalCount", uniqueMovies.size());
      
      ArrayNode movieArray = mapper.createArrayNode();
      uniqueMovies.forEach(movieArray::add);
      dataObject.set("Result", movieArray);
      
      dataArray.add(dataObject);
      result.set("Data", dataArray);

      return result;
  }
}