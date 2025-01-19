package com.example.demo.mapper;

import com.example.demo.model.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommentMapper {
  // 게시글의 모든 댓글 조회
  List<Comment> findByBoardId(@Param("boardId") Long boardId);

  // ID로 댓글 조회
  Comment findById(@Param("id") Long id);

  // 댓글 추가
  void insert(Comment comment);

  // 댓글 수정
  void update(Comment comment);

  // 댓글 삭제
  void delete(@Param("id") Long id);
}