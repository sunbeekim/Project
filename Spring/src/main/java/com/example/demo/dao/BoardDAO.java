package com.example.demo.dao;

import com.example.demo.model.Board;
import java.util.List;

public interface BoardDAO {
  List<Board> findAll();

  Board findById(Long id);

  void insertBoard(Board board);

  void updateBoard(Board board);

  void deleteBoard(Long id);
}
