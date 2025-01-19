package com.example.demo.dto;

import com.example.demo.model.Comment;

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

  public static CommentDTO fromComment(Comment comment) {
    CommentDTO dto = new CommentDTO();
    dto.setId(comment.getId());
    dto.setBoardId(comment.getBoardId());
    dto.setUserId(comment.getUserId());
    dto.setContent(comment.getContent());
    dto.setForename(comment.getForename());
    dto.setCreateAt(comment.getCreateAt());
    dto.setUpdateAt(comment.getUpdateAt());
    return dto;
  }
}
