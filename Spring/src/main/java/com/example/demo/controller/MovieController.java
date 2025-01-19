package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/movie")
public class MovieController {

  @Value("${kobis.api.key}")
  private String apiKey;

  private final RestTemplate restTemplate;

  public MovieController(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
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
}