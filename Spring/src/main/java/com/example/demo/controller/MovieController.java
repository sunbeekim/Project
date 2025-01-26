package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.Map;
import com.example.demo.service.MovieService;
import com.fasterxml.jackson.databind.JsonNode;

@Slf4j
@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;

    @GetMapping("/boxoffice/daily")
    public ResponseEntity<?> getDailyBoxOffice(@RequestParam String targetDt) {
        try {
            Map<String, Object> result = movieService.getDailyBoxOffice(targetDt);
            return ResponseEntity.ok(result);
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
            JsonNode result = movieService.searchMovies(nation, startYear, endYear, title, actor, director);
            return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(result);
        } catch (Exception e) {
            log.error("영화 검색 실패", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "검색 실패", "message", e.getMessage()));
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> testSearch(@RequestParam String director) {
        try {
            String result = movieService.testSingleSearch(director);
            return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(result);
        } catch (Exception e) {
            log.error("테스트 검색 실패", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "검색 실패", "message", e.getMessage()));
        }
    }
}