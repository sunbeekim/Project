package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;
import jakarta.servlet.http.HttpSession;

@Controller
public class MainController {
    
    @GetMapping("/")
    public String home() {
        return "home";
    }
    
    @GetMapping("/board")
    public String board() {
        return "redirect:/board/list";
    }
    
    @GetMapping("/board/list")
    public String boardList() {
        return "board/list";
    }
    
    @GetMapping("/board/write")
    public String boardWrite() {
        return "board/write";
    }
    
    @GetMapping("/board/read")
    public String boardRead(@RequestParam(required = false) Long id) {
        if (id == null) {
            return "redirect:/board";
        }
        return "board/read";
    }
    
    @GetMapping("/board/edit")
    public String boardEdit(@RequestParam(required = false) Long id) {
        if (id == null) {
            return "redirect:/board";
        }
        return "board/edit";
    }
    
    @GetMapping("/movie/search")
    public String movieSearch() {
        return "movie/search";
    }
    
    @GetMapping("/movie/rank")
    public String movieRank() {
        return "movie/rank";
    }
    
    @GetMapping("/movie/detail")
    public String movieDetail(@RequestParam String movieId, Model model) {
        return "movie/detail";
    }
    
    @GetMapping("/user/login")
    public String login() {
        return "user/login";
    }
    
    @GetMapping("/user/signup")
    public String signup() {
        return "user/signup";
    }
    
    @GetMapping("/user/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }
}