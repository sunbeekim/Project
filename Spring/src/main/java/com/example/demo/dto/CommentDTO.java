package com.example.demo.dto;


import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
  private Long id;
  private Long boardId;
  private String userId;
  private String content;
  private String forename;
  private LocalDateTime createAt;
  private LocalDateTime updateAt;

}
