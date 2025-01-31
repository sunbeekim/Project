package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebConfig {

  @Bean
  public WebMvcConfigurer corsConfigurer() { // CORS 설정
    return new WebMvcConfigurer() { 
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 URL 허용
            .allowedOrigins("http://183.105.171.41:3000", "http://localhost:3000", "http://sunbee.world", "http://www.sunbee.world", "http://localhost:8080") // 허용할 Origin
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
            .allowedHeaders("*") // 모든 헤더 허용
            .allowCredentials(true); // 쿠키/세션 허용 (옵션)
      }
    };
  }

  @Bean
  public WebClient webClient() { // 영화 정보 조회를 위한 WebClient 빈 등록
    return WebClient.builder()
        .baseUrl("http://api.koreafilm.or.kr") // 기본 URL 설정
        .build();
  }

  @Bean
  public WebClient kobisWebClient() {
    return WebClient.builder()
        .baseUrl("http://www.kobis.or.kr")
        .codecs(configurer -> configurer
            .defaultCodecs()
            .maxInMemorySize(5 * 1024 * 1024)) // 1회 호출 시 최대 근사치 2.3MB 메모리 사용 넉넉하게 5MB로 설정
        .build();
  }
}
