package com.example.demo.mapper;

import com.example.demo.model.Board;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {

  // 데이터베이스에서 모든 게시물을 조회하는 SQL 쿼리를 실행합니다.
  // 조회된 각 행(row)은 Board 객체로 매핑되며, 결과는 Board 객체로 이루어진 리스트(List<Board>)로 반환됩니다.
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
