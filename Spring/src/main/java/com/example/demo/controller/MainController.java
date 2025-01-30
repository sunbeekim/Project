package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;
import jakarta.servlet.http.HttpSession;

// 메인 페이지 컨트롤러
// html(view) Thymeleaf 템플릿 파일들을 렌더링하는 역할
@Controller
public class MainController {

  // 메인 페이지
  @GetMapping("/") // 브라우저 url 주소
  public String home() {
    return "home"; // path : templates/home.html 파일을 route
  }

  // 게시판 페이지
  @GetMapping("/board")
  public String board() {
    return "redirect:/board/list";
  }

  // 게시판 목록 페이지
  @GetMapping("/board/list")
  public String boardList() {
    return "board/list";
  }

  // 게시판 작성 페이지
  @GetMapping("/board/write")
  public String boardWrite() {
    return "board/write";
  }

  // 게시판 상세 페이지
  @GetMapping("/board/read")
  public String boardRead(@RequestParam(required = false) Long id) { // mvc 어노테이션 RequestParam 사용해서 쿼리 파라미터 값 받기
    if (id == null) {
      return "redirect:/board";
    }
    return "board/read";
  }

  // 게시판 수정 페이지
  @GetMapping("/board/edit")
  public String boardEdit(@RequestParam(required = false) Long id) {
    if (id == null) {
      return "redirect:/board";
    }
    return "board/edit";
  }

  // 영화 검색 페이지
  @GetMapping("/movie/search")
  public String movieSearch() {
    return "movie/search";
  }

  // 영화 순위 페이지
  @GetMapping("/movie/rank")
  public String movieRank() {
    return "movie/rank";
  }

  // 로그인 페이지
  @GetMapping("/user/login")
  public String login() {
    return "user/login";
  }

  // 회원가입 페이지
  @GetMapping("/user/signup")
  public String signup() {
    return "user/signup";
  }

  // 로그아웃 페이지
  @GetMapping("/user/logout")
  public String logout(HttpSession session) {
    session.invalidate();
    return "redirect:/";
  }
}