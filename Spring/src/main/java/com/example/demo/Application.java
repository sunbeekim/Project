package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.controller.MovieController;
import org.springframework.http.ResponseEntity;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
public class Application {

    @Autowired
    private MovieController movieController;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    // @Bean
    // public CommandLineRunner test() {
    //     return args -> {
    //         log.info("MovieController 테스트 API 호출 시작");
    //         try {
    //             ResponseEntity<?> response = movieController.testSearch("봉준호");
    //             log.info("MovieController 테스트 API 응답: {}", response.getBody());
    //         } catch (Exception e) {
    //             log.error("MovieController 테스트 API 호출 실패", e);
    //         }
    //     };
    // }
}
