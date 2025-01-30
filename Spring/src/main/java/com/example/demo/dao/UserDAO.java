package com.example.demo.dao;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UserRequest;

public interface UserDAO { // DB 관련 작업을 수행 할 메서드를 담은 인터페이스 정의
    void createUser(UserRequest userRequest); // 사용자 생성 메서드
    boolean validUser(LoginRequest loginRequest); // 사용자 유효성 검사 메서드
    boolean findByUserId(String userId); // 사용자 아이디 조회 메서드
    String getForenameByUserId(String userId); // 사용자 이름 조회 메서드
}