package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Board;
import com.example.demo.service.BoardService;

import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/board")
public class BoardController { // 게시판 관련 요청 처리 컨트롤러

  private final BoardService boardService;

  public BoardController(BoardService boardService) { // 생성자에 게시판 서비스 의존성 주입
    this.boardService = boardService;
  }

  // 모든 게시물 조회
  @GetMapping
  public ResponseEntity<List<Board>> getAllBoards() { // HTTP 응답을 <List<Board>> 타입으로 반환하겠다고 정의
    List<Board> boards = boardService.findAll();
    return ResponseEntity.ok(boards); // 상태코드와 응답 body에 게시물 객체 반환
  }

  // ID로 특정 게시물 조회
  @GetMapping("/{id}")
  public ResponseEntity<Board> getBoardById(@PathVariable Long id) {
    Board board = boardService.findById(id);
    if (board != null) {
      return ResponseEntity.ok(board);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  // 새로운 게시물 추가
  @PostMapping("/add")
  public ResponseEntity<String> createBoard(@RequestBody Board board) { // HTTP 요청 본문의 데이터를 Board 객체에 자동으로 매핑
    log.info("Received board data: {}", board);
    boardService.insertBoard(board);
    return ResponseEntity.ok("게시물이 성공적으로 추가되었습니다."); // 반환 값을 String으로 정의 했기 때문에 "게시물이 성공적으로 추가되었습니다." String 타입 반환
  }

  // 게시물 읽기
  @PutMapping("/{id}")
  public ResponseEntity<String> updateBoard(@PathVariable Long id, @RequestBody Board board) {
    // PathVariable : 경로 변수를 통해 게시물 ID를 받음
    // RequestBody : 요청 본문의 데이터를 Board 객체에 자동으로 매핑
    Board existingBoard = boardService.findById(id);
    if (existingBoard != null) {
      board.setId(id); // ID 설정
      // 조회수만 업데이트하는 경우 다른 필드들 유지
      if (board.getTitle() == null) {
        board.setTitle(existingBoard.getTitle());
      }
      if (board.getContent() == null) {
        board.setContent(existingBoard.getContent());
      }
      if (board.getForename() == null) {
        board.setForename(existingBoard.getForename());
      }
      boardService.updateBoard(board);
      return ResponseEntity.ok("게시물이 성공적으로 수정되었습니다.");
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  // 게시물 삭제
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteBoard(@PathVariable Long id) {
    Board existingBoard = boardService.findById(id);
    if (existingBoard != null) {
      boardService.deleteBoard(id);
      return ResponseEntity.ok("게시물이 성공적으로 삭제되었습니다.");
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
