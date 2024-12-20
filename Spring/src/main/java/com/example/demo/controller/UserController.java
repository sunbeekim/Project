package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// 클라이언트 요청을 받고 Service에 전달
@RestController // controller + responsebody
// http 요청을 처리하는 컨트롤러를 스프링에게 알림
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {//파서
        userService.saveUser(user);
        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }
    // 쿼리 파라미터 사용 시
    // @PostMapping("/signup")
    // public ResponseEntity<String> signUp(
    //     @RequestParam String username,
    //     @RequestParam String password) {

    //     // User 객체 수동 생성
    //     User user = new User();
    //     user.setUsername(username);
    //     user.setPassword(password);

    //     // 서비스에 전달
    //     userService.saveUser(user);

    //     return ResponseEntity.ok("회원가입이 완료되었습니다.");
    // }
}
