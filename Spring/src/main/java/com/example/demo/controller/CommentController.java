package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CommentDTO;
import com.example.demo.service.BoardService;

@RestController
@RequestMapping("/api/board")
public class CommentController {

    @Autowired
    private BoardService boardService;

    // 댓글 추가 API
    @PostMapping("/{boardId}/comments")
    public ResponseEntity<Void> addComment(@PathVariable int boardId, @RequestBody CommentDTO commentDTO) {
        boardService.addCommentToBoard(boardId, commentDTO);
        return ResponseEntity.ok().build();
    }

    // 댓글 조회 API
    @GetMapping("/{boardId}/comments")
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable int boardId) {
        List<CommentDTO> comments = boardService.getCommentsByBoard(boardId);
        return ResponseEntity.ok(comments);
    }
}
