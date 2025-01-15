package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.ibatis.session.SqlSession;
import com.example.demo.model.Post;

@Service
public class PostService {
    
    @Autowired
    private SqlSession sqlSession;
    
    public void createPost(Post post) {
        try {
            sqlSession.insert("com.example.demo.mapper.PostMapper.insertPost", post);
        } catch (Exception e) {
            System.err.println("Error in createPost: " + e.getMessage());
            throw e;
        }
    }
    
    public void updatePost(Post post) {
        try {
            int updatedRows = sqlSession.update("com.example.demo.mapper.PostMapper.updatePost", post);
            if (updatedRows == 0) {
                throw new RuntimeException("게시글이 존재하지 않거나 수정 권한이 없습니다.");
            }
        } catch (Exception e) {
            System.err.println("Error in updatePost: " + e.getMessage());
            throw e;
        }
    }
}
