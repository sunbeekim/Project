package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.BoardDAO;
import com.example.demo.mapper.BoardMapper;
import com.example.demo.model.Board;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService implements BoardDAO {

  private final BoardMapper boardMapper;

  @Override
  public List<Board> findAll() {
    // 모든 게시물 조회
    return boardMapper.findAll();
  }

  @Override
  public Board findById(Long id) {
    // ID로 게시물 조회
    return boardMapper.findById(id);
  }

  @Override
  public void insertBoard(Board board) {
    // 게시물 추가
    boardMapper.insertBoard(board);
  }

  @Override
  public void updateBoard(Board board) {
    // 게시물 수정
    boardMapper.updateBoard(board);
  }

  @Override
  public void deleteBoard(Long id) {
    // 게시물 삭제
    boardMapper.deleteBoard(id);
    
  }
 
  
}