package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.BoardDAO;
import com.example.demo.dto.CommentDTO;
import com.example.demo.mapper.BoardMapper;
import com.example.demo.mapper.CommentMapper;
import com.example.demo.model.Board;
import com.example.demo.model.Comment;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService implements BoardDAO {

  private final BoardMapper boardMapper;
  @Autowired
  private CommentMapper commentMapper;

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
  
  // 댓글 추가
  public void addCommentToBoard(int boardId, CommentDTO commentDTO) {
      Comment comment = new Comment();
      comment.setBoardId(boardId);
      comment.setContent(commentDTO.getContent());
      commentMapper.insertComment(comment);
  }
  // 게시글에 대한 댓글 조회
  public List<CommentDTO> getCommentsByBoard(int boardId) {
      List<Comment> comments = commentMapper.selectCommentsByBoard(boardId);
      return comments.stream()
                     .map(comment -> new CommentDTO(comment.getCommentId(), comment.getContent()))
                     .collect(Collectors.toList());
  }
  
}
