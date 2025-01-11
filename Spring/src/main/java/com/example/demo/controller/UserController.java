package com.example.demo.controller;

import com.example.demo.dto.UserRequest;
import com.example.demo.model.User;
import com.example.demo.model.UserData;
import com.example.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  // ID로 사용자 조회
  @GetMapping("/{id}")
  public User getUserById(@PathVariable Long id) {
    return userService.findById(id);
  }

  // 회원가입
  @PostMapping("/signup")
  public ResponseEntity<String> createUser(@RequestBody UserRequest userRequest) {
    // UserService에서 User와 UserData를 처리하도록 위임
    userService.createUser(userRequest);
    return ResponseEntity.ok("User created successfully");
  }
}
