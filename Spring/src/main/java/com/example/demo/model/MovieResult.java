package com.example.demo.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovieResult {
    private Integer id;
    private Integer searchConditionId;
    private String movieSeq;
    private String title;
    private String titleEng;
    private String directorNm;
    private String actorNm;
    private String genre;
    private String nation;
    private String prodYear;
    private String plot;      // 기본 줄거리
    private String plots;     // JSON 형식의 다중 언어 줄거리
    private String directors; // JSON 형식의 감독 정보
    private String actors;    // JSON 형식의 배우 정보
    private String posters;   // 포스터 URL 리스트
    private String runtime;
    private String rating;
    private String posterUrl;
    private String company;
}
