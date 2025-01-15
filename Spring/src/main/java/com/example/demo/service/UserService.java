package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UserRequest;
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

  public boolean findByUserId(String userId) {
    try {
      User user = sqlSession.selectOne("com.example.demo.mapper.UserMapper.findByUserId", userId);
      return user != null;
    } catch (Exception e) {
      // 예외 로그 출력
      System.out.println("Error while finding user by ID: {}" + userId + e);
      throw new RuntimeException("Internal Server Error occurred");
    }
  }

  public void createUser(UserRequest userRequest) {
    try {
      // users_login 테이블 데이터 생성 및 삽입
      User user = new User();
      user.setUserId(userRequest.getUserId());
      user.setPassword(userRequest.getPassword());
      sqlSession.insert("com.example.demo.mapper.UserMapper.insertUser", user);

      // users_data 테이블 데이터 생성 및 삽입
      UserData userData = new UserData();
      userData.setId(user.getId()); // users_login에서 생성된 ID 사용
      userData.setForename(userRequest.getForename());
      userData.setEmail(userRequest.getEmail());
      userData.setPhoneNumber(userRequest.getPhoneNumber());
      sqlSession.insert("com.example.demo.mapper.UserMapper.insertUserData", userData);
    } catch (Exception e) {
      System.err.println("Error in createUser: " + e.getMessage());
      throw e;
    }
  }

  public String getForenameByUserId(String userId) {
    return sqlSession.selectOne("com.example.demo.mapper.UserMapper.findForenameByUserId", userId);
  }

  public boolean validUser(LoginRequest login) {
    // MyBatis를 이용해 userId로 사용자 정보 조회
    User user = sqlSession.selectOne(
        "com.example.demo.mapper.UserMapper.findByUserId",
        login.getUserId());

    if (user != null && user.getPassword().equals(login.getPassword())) {
      return true;
    }

    return false;
  }

}
