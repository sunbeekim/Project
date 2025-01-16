package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CommentDTO;
import com.example.demo.model.Board;
import com.example.demo.service.BoardService;

@RestController
@RequestMapping("/api/board")
public class BoardController {

  private final BoardService boardService;

  public BoardController(BoardService boardService) {
    this.boardService = boardService;
  }

  // 모든 게시물 조회
  @GetMapping
  public ResponseEntity<List<Board>> getAllBoards() {
    List<Board> boards = boardService.findAll();
    return ResponseEntity.ok(boards);
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
  public ResponseEntity<String> createBoard(@RequestBody Board board) {
    boardService.insertBoard(board);
    return ResponseEntity.ok("게시물이 성공적으로 추가되었습니다.");
  }

  // 게시물 읽기
  @PutMapping("/{id}")
  public ResponseEntity<String> updateBoard(@PathVariable Long id, @RequestBody Board board) {
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
  // 댓글 추가
  @PostMapping("/{boardId}/comments")
  public ResponseEntity<String> addComment(@PathVariable int boardId, @RequestBody CommentDTO commentDTO) {
      try {
          boardService.addCommentToBoard(boardId, commentDTO);
          return new ResponseEntity<>("댓글이 추가되었습니다.", HttpStatus.CREATED);
      } catch (Exception e) {
          return new ResponseEntity<>("댓글 추가 실패", HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
  
  // 게시글에 대한 댓글 조회
  @GetMapping("/{boardId}/comments")
  public ResponseEntity<List<CommentDTO>> getComments(@PathVariable int boardId) {
      List<CommentDTO> comments = boardService.getCommentsByBoard(boardId);
      return new ResponseEntity<>(comments, HttpStatus.OK);
  }
  
}
