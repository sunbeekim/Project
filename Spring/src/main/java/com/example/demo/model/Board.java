package com.example.demo.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Board {
    private Long id;            // Primary key
    private String postId;      // Foreign key referencing users_login(userId)
    private String title;       // Post title
    private String content;     // Post content
    private String forename;    // Author name
    private LocalDateTime createAt;  // Creation timestamp
    private Integer views;      // View count
}
