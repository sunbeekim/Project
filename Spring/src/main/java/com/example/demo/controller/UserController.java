package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UserRequest;

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

  // 회원가입
  @PostMapping("/signup")
  public ResponseEntity<String> signup(@RequestBody UserRequest userRequest) {
    try {
      userService.createUser(userRequest);
      return ResponseEntity.ok("회원가입이 완료되었습니다.");
    } catch (RuntimeException e) {
      // RuntimeException으로 던져진 사용자 정의 메시지 처리
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(e.getMessage());
    } catch (Exception e) {
      // 기타 예외 처리
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  }

  // 로그인
  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody LoginRequest login, HttpSession session) {

    System.out.println("로그인 아이디 : " + login.getUserId());
    System.out.println("로그인 패스워드 : " + login.getPassword());
    System.out.println("세션 :" + session);

    boolean isValid = userService.validUser(login);

    if (isValid) {
      String forename = userService.getForenameByUserId(login.getUserId());
      session.setAttribute("userId", login.getUserId());
      session.setAttribute("forename", forename);
      return ResponseEntity.ok("Login successful");

    } else {
      return ResponseEntity.status(401).body("Login failed");
    }
  }

  // 로그아웃
  @PostMapping("/logout")
  public ResponseEntity<String> logout(HttpSession session) {
    session.invalidate(); // 세션 무효화
    return ResponseEntity.ok("Logged out successfully");
  }

  // 세션 확인 엔드포인트
  @GetMapping("/check-session")
  public ResponseEntity<Map<String, Object>> checkSession(HttpSession session) {
    String userId = (String) session.getAttribute("userId");
    String forename = (String) session.getAttribute("forename");
    System.out.println("유저아이디 어트리뷰트에서 확인" + userId);
    Map<String, Object> response = new HashMap<>();
    if (userId != null) {
      response.put("loggedIn", true);
      response.put("userId", userId);
      response.put("forename", forename);
      System.out.println("세션 검증 성공");
      return ResponseEntity.ok(response);
    } else {
      response.put("loggedIn", false);
      return ResponseEntity.status(401).body(response);
    }
  }

  @PostMapping("/check-id")
  public ResponseEntity<String> checkUserId(@RequestBody Map<String, String> request) {
    String userId = request.get("userId");
    System.out.println("아이디 확인: " + userId);
    boolean userExists = userService.findByUserId(userId);

    if (userExists) {
      return ResponseEntity.status(409).body("이미 존재하는 아이디입니다.");
    } else {
      return ResponseEntity.ok("사용 가능한 아이디입니다.");
    }
  }

}
