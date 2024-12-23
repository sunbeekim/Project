package com.example.demo.service;

import com.example.demo.model.*;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    private final SqlSession sqlSession;

    public UserService(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public User findById(Long id) {
        return sqlSession.selectOne("com.example.demo.mapper.UserMapper.findById", id);
    }

    
    public void createUser(User user, UserData userData) {
        try {
            sqlSession.insert("com.example.demo.mapper.UserMapper.insertUser", user);
            userData.setId(user.getId());
            sqlSession.insert("com.example.demo.mapper.UserMapper.insertUserData", userData);
        } catch (Exception e) {
            // 오류 로그 출력
            System.err.println("Error in createUser: " + e.getMessage());
            throw e;
        }
    }

    
}
