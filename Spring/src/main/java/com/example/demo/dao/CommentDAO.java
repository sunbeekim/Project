package com.example.demo.dao;

import java.util.List;

import com.example.demo.model.Comment;

public interface CommentDAO {
    List<Comment> findByBoardId(Long boardId);
    Comment findById(Long id);
    void insert(Comment comment);
    void update(Comment comment);
    void delete(Long id);
}
