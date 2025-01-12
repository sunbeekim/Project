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

    // USER ID로 사용자 조회
  @GetMapping("/check/{userId}")
  public ResponseEntity<String> getUserByUserId(@PathVariable String userId) {
    System.out.println("아이디 확인: " + userId);
    boolean userExists = userService.findByUserId(userId);

    if (userExists) {
      return ResponseEntity.status(409).body("이미 존재하는 아이디입니다.");
    } else {
      return ResponseEntity.ok("사용 가능한 아이디입니다.");
    }
  }
  // 회원가입
  @PostMapping("/signup")
  public ResponseEntity<String> createUser(@RequestBody UserRequest userRequest) {
    // UserService에서 User와 UserData를 처리하도록 위임
    userService.createUser(userRequest);
    return ResponseEntity.ok("User created successfully");
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
