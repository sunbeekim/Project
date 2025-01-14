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
    //게시물 삭제
    public void deletePost(int id) {
    	try {
    		sqlSession.delete("com.example.demo.mapper.PostMapper.deletePost",id);
    	}catch(Exception e) {//예외
    		System.out.println("Error in deletePost: " + e.getMessage());
    		throw e;
    	}
        
    }
    
    public Post selectPost(String postId) {
    	try {
    		return sqlSession.selectOne("com.example.demo.mapper.PostMapper.selectPost", postId);
    	}catch(Exception e) {
    		System.out.println("Error in selectPost: " + e.getMessage());
    		throw e;
    		
    	}
    }
}