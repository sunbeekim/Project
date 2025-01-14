package com.example.demo.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RequestDeletePost {
	private Long id;
    private String postId;
    private String title;
    private String content;
    private String forename;
    private LocalDateTime createAt;
    private int views;

}
