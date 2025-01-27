package com.example.demo.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchCondition {
    private Integer id;
    private String nation;
    private String startYear;
    private String endYear;
    private String title;
    private String actor;
    private String director;
    private LocalDateTime createdAt;
    private Integer totalMovies;
    private Integer uniqueMovies;
} 