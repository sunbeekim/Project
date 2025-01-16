package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UserRequest;
import com.example.demo.model.*;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.mapper.UserMapper;

@Service
public class UserService {

  private final UserMapper userMapper;

  public UserService(SqlSession sqlSession, UserMapper userMapper) {   
    this.userMapper = userMapper;
  }

  public boolean findByUserId(String userId) {
    try {
      return userMapper.isUserIdExists(userId);
    } catch (Exception e) {
      System.out.println("Error while finding user by ID: " + userId + e);
      throw new RuntimeException("Internal Server Error occurred");
    }
  }

  @Transactional
  public void createUser(UserRequest userRequest) {
    try {
        if (userMapper.isEmailExists(userRequest.getEmail())) {
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }

        User user = new User();
        user.setUserId(userRequest.getUserId());
        user.setPassword(userRequest.getPassword());
        userMapper.insertUser(user);

        UserData userData = new UserData();
        userData.setId(user.getId());
        userData.setForename(userRequest.getForename());
        userData.setEmail(userRequest.getEmail());
        userData.setPhoneNumber(userRequest.getPhoneNumber());
        userMapper.insertUserData(userData);
        
    } catch (RuntimeException e) {
        throw e;
    } catch (Exception e) {
        System.err.println("Error in createUser: " + e.getMessage());
        throw new RuntimeException("회원가입 처리 중 오류가 발생했습니다.");
    }
  }

  public String getForenameByUserId(String userId) {
    return userMapper.findForenameByUserId(userId);
  }

  public boolean validUser(LoginRequest login) {
    User user = userMapper.findByUserId(login.getUserId());
    return user != null && user.getPassword().equals(login.getPassword());
  }

}
