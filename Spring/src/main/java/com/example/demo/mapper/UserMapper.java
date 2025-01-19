package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.example.demo.model.User;
import com.example.demo.model.UserData;

@Mapper
public interface UserMapper {
  // 사용자 ID로 사용자 조회
  User findByUserId(String userId);

  // users_login 테이블에 사용자 삽입
  void insertUser(User user);

  // users_data 테이블에 사용자 데이터 삽입
  void insertUserData(UserData userData);

  // userId 중복 여부 확인
  boolean isUserIdExists(String userId);

  // email 중복 여부 확인
  boolean isEmailExists(String email);

  // userId로 forename 조회
  String findForenameByUserId(String userId);
}
