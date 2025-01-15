package com.example.demo.mapper;

import com.example.demo.model.Board;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {

  // 모든 게시물 조회
  List<Board> findAll();

  // ID로 게시물 조회
  Board findById(@Param("id") Long id);

  // 게시물 추가
  void insertBoard(Board board);

  // 게시물 수정
  void updateBoard(Board board);

  // 게시물 삭제
  void deleteBoard(@Param("id") Long id);
}
