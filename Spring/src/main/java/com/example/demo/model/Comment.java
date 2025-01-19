package com.example.demo.model;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    private Long id;
    private Long boardId;
    private String userId;
    private String content;
    private String forename;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private Long parentId;
    private int depth;
}
