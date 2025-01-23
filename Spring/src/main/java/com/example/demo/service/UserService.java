package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UserRequest;
import com.example.demo.model.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.mapper.UserMapper;
import com.example.demo.dao.UserDAO;

@Service
public class UserService implements UserDAO {

  private final UserMapper userMapper;

  // 초기 다양한 형태의 DB연동을 경험하기 위해 MyBatis SqlSession 객체를 사용했음
  // 저희 프로젝트의 DAO와 MAPPER가 쓰이는데 구분되는 이유는 DAO는 DB접근 로직(MAPPER를 가지고 있음)으로 쓰이고,
  // MAPPER는 실제 XML과 매핑되는 객체입니다.
  // 결국 실제 DB와 연결되는 로직(Mapper나 sqlsession 같은 애들)을 가지고 있는 메서드가 DAO
  // DAO를 구현하지 않으면 Mapper나 sqlsession이 작게 감싸진 DAO 자체가 됨
  public UserService(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @Override
  public boolean findByUserId(String userId) {
    try {
      return userMapper.isUserIdExists(userId);
    } catch (Exception e) {
      System.out.println("Error while finding user by ID: " + userId + e);
      throw new RuntimeException("Internal Server Error occurred");
    }
  }

  @Override
  @Transactional // 트랜잭션 무결성 - 실패하면 작업시작 전 상태 유지
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

  @Override
  public String getForenameByUserId(String userId) {
    return userMapper.findForenameByUserId(userId);
  }

  @Override
  public boolean validUser(LoginRequest login) {
    User user = userMapper.findByUserId(login.getUserId());
    return user != null && user.getPassword().equals(login.getPassword());
  }

}
