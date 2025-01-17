package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UserRequest;
import com.example.demo.model.User;

import com.example.demo.service.UserService;

import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }


  //로그인 검증
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserRequest userRequest) {
    	//UserService의 validateLogin 메서드를 호출하여 입력된 아이디와 비밀번호가 유효한지 확인
    	boolean isValid = userService.validateLogin(userRequest.getUserId(), userRequest.getPassword());

        if (isValid) {
            return ResponseEntity.ok("로그인 성공!");
        } else {
            return ResponseEntity.status(401).body("아이디나 비밀번호가 잘못되었습니다.");
        }
   
  }
}

