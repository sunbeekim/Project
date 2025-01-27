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

@Slf4j // 로깅 기능 제공
@RestController // 컨트롤러 클래스 정의
@RequestMapping("/api/movies") // 기본 URL 경로 설정
@RequiredArgsConstructor // 생성자 주입 어노테이션
public class MovieController {
    private final MovieService movieService; // 영화 서비스 주입

    // 일일 박스오피스 조회
    @GetMapping("/boxoffice/daily")
    public ResponseEntity<?> getDailyBoxOffice(@RequestParam String targetDt) {
        try {
            Map<String, Object> result = movieService.getDailyBoxOffice(targetDt); // 영화 서비스에서 일일 박스오피스 조회
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("박스오피스 API 호출 실패", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("API 호출 실패: " + e.getMessage());
        }
    }

    // 영화 검색
    @GetMapping("/search")
    public ResponseEntity<?> searchMovies(
        @RequestParam(required = false) String nation, // 국가 조회
        @RequestParam(required = false) String startYear, // 시작 연도 조회
        @RequestParam(required = false) String endYear, // 종료 연도 조회
        @RequestParam(required = false) String title, // 영화 제목 조회
        @RequestParam(required = false) String actor, // 영화 출연 배우 조회
        @RequestParam(required = false) String director // 영화 감독 조회
    ) {
        try {
            JsonNode result = movieService.searchMovies(nation, startYear, endYear, title, actor, director); // JsonNode 타입으로 반환
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