package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.client.RestTemplate;

@Configuration
public class WebConfig {

  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 URL 허용
            .allowedOrigins("http://183.105.171.41:3000", "http://localhost:3000", "http://subee.world", "http://www.subee.world") // 허용할 Origin
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
            .allowedHeaders("*") // 모든 헤더 허용
            .allowCredentials(true); // 쿠키/세션 허용 (옵션)
      }
    };
  }

  @Bean
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }
}
