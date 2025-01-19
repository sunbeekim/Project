package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.example.demo.dao.CommentDAO;
import com.example.demo.mapper.CommentMapper;
import com.example.demo.model.Comment;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService implements CommentDAO {

  private final CommentMapper commentMapper;

  @Override
  public List<Comment> findByBoardId(Long boardId) {
    return commentMapper.findByBoardId(boardId);
  }

  @Override
  public Comment findById(Long id) {
    return commentMapper.findById(id);
  }

  @Override
  public void insert(Comment comment) {
    commentMapper.insert(comment);
  }

  @Override
  public void update(Comment comment) {
    commentMapper.update(comment);
  }

  @Override
  public void delete(Long id) {
    commentMapper.delete(id);
  }
}