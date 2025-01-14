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
}
