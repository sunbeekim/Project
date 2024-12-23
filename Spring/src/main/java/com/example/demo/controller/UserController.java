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
        // users_login 테이블 데이터를 생성
        User user = new User();
        user.setUser_id(userRequest.getUser_id()); // DTO에서 가져온 user_id 설정
        user.setPassword(userRequest.getPassword()); // DTO에서 가져온 password 설정

        // users_data 테이블 데이터를 생성
        UserData userData = new UserData();
        userData.setForename(userRequest.getForename()); // DTO에서 가져온 forename 설정
        userData.setEmail(userRequest.getEmail());       // DTO에서 가져온 email 설정
        userData.setPhone_number(userRequest.getPhone_number()); // DTO에서 가져온 phone_number 설정

        // UserService를 통해 두 테이블에 삽입
        userService.createUser(user, userData);

        return ResponseEntity.ok("User created successfully");
    }
}
