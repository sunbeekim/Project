package com.example.demo.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Post {
    private Long id;
    private String postId;
    private String title;
    private String content;
    private String forename;
    private LocalDateTime createAt;
    private int views;
}
