package com.example.demo.service;

import com.example.demo.mapper.BoardMapper;
import com.example.demo.model.Board;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BoardService {
    
    @Autowired
    private BoardMapper boardMapper;

    public List<Board> getAllPosts() {
        try {
            return boardMapper.getAllPosts();
        } catch (Exception e) {
            throw new RuntimeException("게시글 목록을 불러오는데 실패했습니다.", e);
        }
    }

    public Board getPostById(Long id) {
        Board board = boardMapper.getPostById(id);
        if (board == null) {
            throw new RuntimeException("게시글을 찾을 수 없습니다.");
        }
        return board;
    }

    @Transactional
    public void updatePost(Board board) {
        try {
            int result = boardMapper.updatePost(board);
            if (result == 0) {
                throw new RuntimeException("게시글 수정 권한이 없거나 게시글이 존재하지 않습니다.");
            }
        } catch (Exception e) {
            throw new RuntimeException("게시글 수정에 실패했습니다.", e);
        }
    }
}
