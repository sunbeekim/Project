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

@RestController // 이 클래스가 REST API 엔드포인트를 제공하는 컨트롤러임을 나타냄
@RequestMapping("/api/users") // 이 컨트롤러의 모든 엔드포인트는 /api/users 경로로 시작
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) { // 생성자에 유저 서비스 의존성 주입
    this.userService = userService;
  }

  // 회원가입
  @PostMapping("/signup")
  public ResponseEntity<String> signup(@RequestBody UserRequest userRequest) { // HTTP 요청 본문의 데이터를 UserRequest 객체에 자동으로 매핑
    try {
      userService.createUser(userRequest);
      return ResponseEntity.ok("회원가입이 완료되었습니다.");
    } catch (RuntimeException e) {
      // RuntimeException으로 던져진 사용자 정의 메시지 처리
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(e.getMessage());
    } catch (Exception e) {
      // 기타 예외 처리
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) // 서버 내부 오류 발생 시 500 상태 코드 반환
          .body("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  }

  // 로그인
  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody LoginRequest login, HttpSession session) { // HTTP 요청 본문의 데이터를 LoginRequest 객체에 자동으로 매핑

    System.out.println("로그인 아이디 : " + login.getUserId());
    System.out.println("로그인 패스워드 : " + login.getPassword());
    System.out.println("세션 :" + session);

    boolean isValid = userService.validUser(login); // 유저 서비스의 validUser 메서드를 호출하여 유효성 검사

    if (isValid) { // 유효성 검사 결과가 true인 경우
      String forename = userService.getForenameByUserId(login.getUserId()); // 유저 서비스의 getForenameByUserId 메서드를 호출하여 유저 이름 조회
      session.setAttribute("userId", login.getUserId()); // 세션에 유저 아이디 저장
      session.setAttribute("forename", forename); // 세션에 유저 이름 저장
      return ResponseEntity.ok("Login successful"); // 로그인 성공 응답 반환

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
  @GetMapping("/check-session") // 세션 확인 엔드포인트
  public ResponseEntity<Map<String, Object>> checkSession(HttpSession session) { // 반환 타입을 Map<String, Object>로 정의
    String userId = (String) session.getAttribute("userId"); // 세션에서 유저 아이디 조회
    String forename = (String) session.getAttribute("forename"); // 세션에서 유저 이름 조회
    System.out.println("유저아이디 어트리뷰트에서 확인" + userId);
    Map<String, Object> response = new HashMap<>(); // 응답 데이터를 담을 Map 객체 생성
    if (userId != null) {
      response.put("loggedIn", true); // 로그인 상태 표시
      response.put("userId", userId); // 유저 아이디 추가
      response.put("forename", forename); // 유저 이름 추가
      System.out.println("세션 검증 성공");
      return ResponseEntity.ok(response); // 200 상태 코드와 응답 body에 response 객체 반환
    } else {
      response.put("loggedIn", false); // 로그인 상태 표시
      return ResponseEntity.status(401).body(response); // 401 상태 코드와 응답 본문에 응답 데이터 추가
    }
  }

  // 아이디 중복 체크
  @PostMapping("/check-id")
  public ResponseEntity<String> checkUserId(@RequestBody Map<String, String> request) { // 반환 값 String 정의 & 요청 본문의 데이터를 Map<String, String> 타입으로 매핑
    String userId = request.get("userId"); 
    System.out.println("아이디 확인: " + userId);
    boolean userExists = userService.findByUserId(userId); // 유저 서비스의 findByUserId 메서드를 호출하여 유저 존재 여부 확인

    if (userExists) {
      return ResponseEntity.status(409).body("이미 존재하는 아이디입니다."); // 409 상태 코드와 응답 본문에 "이미 존재하는 아이디입니다." 반환
    } else {
      return ResponseEntity.ok("사용 가능한 아이디입니다."); // 200 상태 코드와 응답 본문에 "사용 가능한 아이디입니다." 반환
    }
  }

}
