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
  // 만약 프로젝트 규모가 커진다면 DAO를 또 다른 계층으루 구분지어서 DAO Interface와 DAO Impl을 만들어야 합니다.
  // DAO Impl을 구현하면 그 안에는 Mapper 또는 sqlsession 같은 애들이 있어야 합니다.
  // 그러면 서비스에서는 DAO를 호출하여 데이터를 처리하게 되며, 서비스 계층이 DB연동과 구현 등에서 구분되어지게 됩니다.
  // 추후 DB연동 방식을 바꾸거나 확장하는 등의 변경사항이 생기면 서비스 계층을 수정하지 않고 대부분 DAO 계층만 수정하면 됩니다.
  // DAO는 실제 DB와 연결되는 로직이므로 이 계층을 수정하는 것은 데이터베이스 관련 변경사항을 반영하는 것이며,
  // 서비스 계층은 비즈니스 로직을 처리하는 계층이므로 이 계층을 수정하는 것은 비즈니스 로직을 변경하는 것입니다.
  // 이렇게 계층을 구분하여 각 계층이 독립적으로 변경될 수 있도록 하면 프로젝트의 유지보수와 확장성을 향상시킬 수 있습니다.
  // 쓰이지 않는 경우는 간단한 프로젝트인데 계층을 세분화한다면 오버헤드가 커질 수 있습니다.
  // 즉, 프로젝트 규모가 작다면 계층을 세분화하지 않아도 됩니다. 물론 해도 됩니다. 
  public UserService(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @Override
  public boolean findByUserId(String userId) { // 유저 아이디 조회
    try {
      return userMapper.isUserIdExists(userId);
    } catch (Exception e) {
      System.out.println("Error userID: " + userId + e);
      throw new RuntimeException("RunTimeException !@!@!");
    }
  }

  @Override
  @Transactional // 트랜잭션 무결성 - 실패하면 작업시작 전 상태 유지
  // Spring이 제공하는 트랜젝션 관리 기능 사용
  // config/TransactionConfig.java 참고
  public void createUser(UserRequest userRequest) {
    // UserRequest 객체는 사용자가 입력한 데이터를 담고 있는 객체입니다.
    // DB에 있는 테이블과 매핑되는 객체가 아닙니다.
    // User의 로그인 정보와 유저정보를 두 개의 테이블에 입력을 요청하기 위한 객체입니다.
    // 따라서 이 메서드는 userRequest 객체를 받아서 DB에 있는 users_login, users_data 테이블과 매핑되는 모델 객체를 생성하여 데이터를 입력합니다.
    try {
      if (userMapper.isEmailExists(userRequest.getEmail())) {
        throw new RuntimeException("이미 존재하는 이메일입니다.");
      }

      User user = new User();
      // 모델 객체 생성
      user.setUserId(userRequest.getUserId());
      user.setPassword(userRequest.getPassword());
      // 모델 객체에 로그인 정보 셋팅
      userMapper.insertUser(user);
      // 유저매퍼에 데이터 셋팅 된 모델 객체 전달

      UserData userData = new UserData();
      // 모델 객체 생성
      userData.setId(user.getId());
      userData.setForename(userRequest.getForename());
      userData.setEmail(userRequest.getEmail());
      userData.setPhoneNumber(userRequest.getPhoneNumber());
      // 모델 객체에 유저정보 셋팅
      userMapper.insertUserData(userData);
      // 유저매퍼에 데이터 셋팅 된 모델 객체 전달

    } catch (RuntimeException e) {
      throw e;
    } catch (Exception e) {
      System.err.println("Error in createUser: " + e.getMessage());
      throw new RuntimeException("회원가입 처리 중 오류가 발생했습니다.");
    }
  }

  @Override
  public String getForenameByUserId(String userId) { // 유저 이름 조회
    return userMapper.findForenameByUserId(userId);
  }

  @Override
  public boolean validUser(LoginRequest login) { // 로그인 유효성 검사
    User user = userMapper.findByUserId(login.getUserId()); // 유저 매퍼에서 유저 아이디 조회
    return user != null && user.getPassword().equals(login.getPassword()); // 유저가 존재하고 비밀번호가 일치하는 경우 true 반환
  }

}
