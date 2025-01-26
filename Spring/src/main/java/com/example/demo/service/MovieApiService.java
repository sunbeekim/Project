package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import lombok.extern.slf4j.Slf4j;
import java.util.Optional;

@Slf4j
@Service
public class MovieApiService {
    
    private final WebClient webClient;
    
    @Value("${movie.api.key}")
    private String movieApiKey;
    
    public MovieApiService(WebClient webClient) {
        this.webClient = webClient;
    }
    
    public String searchByDirector(String director) {
        try {
            log.info("감독 검색 시작 - director: {}", director);
            
            return WebClient.builder()
                .baseUrl("http://api.koreafilm.or.kr")
                .codecs(configurer -> configurer
                    .defaultCodecs()
                    .maxInMemorySize(5 * 1024 * 1024))
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                    .path("/openapi-data2/wisenut/search_api/search_json2.jsp")
                    .queryParam("ServiceKey", movieApiKey)
                    .queryParam("collection", "kmdb_new2")
                    .queryParam("listCount", 100)
                    .queryParam("startCount", 0)
                    .queryParam("detail", "Y")
                    .queryParamIfPresent("director", Optional.ofNullable(director))
                    .build())
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
                
        } catch (Exception e) {
            log.error("감독 검색 실패 - director: {}, error: {}", director, e.getMessage());
            return null;
        }
    }
    
    public String searchByYearAndGenre(String nation, String year, 
                                     String title, String actor, String director, String genre) {
        try {
            log.info("연도/장르별 API 호출 파라미터 - nation: {}, year: {}, title: {}, actor: {}, director: {}, genre: {}", 
                     nation, year, title, actor, director, genre);
            
            String response = WebClient.builder()
                .baseUrl("http://api.koreafilm.or.kr")
                .codecs(configurer -> configurer
                    .defaultCodecs()
                    .maxInMemorySize(5 * 1024 * 1024))
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                    .path("/openapi-data2/wisenut/search_api/search_json2.jsp")
                    .queryParam("ServiceKey", movieApiKey)
                    .queryParam("collection", "kmdb_new2")
                    .queryParam("listCount", 500)
                    .queryParam("startCount", 0)
                    .queryParam("detail", "Y")
                    .queryParamIfPresent("genre", Optional.ofNullable(genre).filter(g -> !g.trim().isEmpty()))
                    .queryParamIfPresent("createDts", Optional.ofNullable(year).filter(y -> !y.trim().isEmpty()))
                    .queryParamIfPresent("createDte", Optional.ofNullable(year).filter(y -> !y.trim().isEmpty()))
                    .queryParamIfPresent("nation", Optional.ofNullable(nation).filter(n -> !n.trim().isEmpty()))
                    .queryParamIfPresent("title", Optional.ofNullable(title).filter(t -> !t.trim().isEmpty()))
                    .queryParamIfPresent("actor", Optional.ofNullable(actor).filter(a -> !a.trim().isEmpty()))
                    .queryParamIfPresent("director", Optional.ofNullable(director).filter(d -> !d.trim().isEmpty()))
                    .build())
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
                
            //log.info("API 응답 결과: {}", response);
            return response;
                
        } catch (Exception e) {
            log.error("연도/장르별 검색 실패 - year: {}, genre: {}, error: {}", 
                     year, genre, e.getMessage());
            log.error("상세 에러: ", e);
            return null;
        }
    }
    
    public String searchByGenre(String nation, String startYear, String endYear, 
                              String title, String actor, String director, String genre) {
        try {
            log.info("장르별 API 호출 - genre: {}", genre);
            
            return WebClient.builder()
                .baseUrl("http://api.koreafilm.or.kr")
                .codecs(configurer -> configurer
                    .defaultCodecs()
                    .maxInMemorySize(5 * 1024 * 1024))
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                    .path("/openapi-data2/wisenut/search_api/search_json2.jsp")
                    .queryParam("ServiceKey", movieApiKey)
                    .queryParam("collection", "kmdb_new2")
                    .queryParam("listCount", 500)
                    .queryParam("startCount", 0)
                    .queryParam("detail", "Y")
                    .queryParamIfPresent("genre", Optional.ofNullable(genre))
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
                
        } catch (Exception e) {
            log.error("장르별 검색 실패 - genre: {}, error: {}", genre, e.getMessage());
            return null;
        }
    }
} 