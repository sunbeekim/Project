package com.example.demo.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchCondition {
    private Long id;
    private String nation;
    private String startYear;
    private String endYear;
    private String title;
    private String actor;
    private String director;
    private LocalDateTime searchDate;
    private String searchResult;
} 