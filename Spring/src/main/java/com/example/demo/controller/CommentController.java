package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

import com.example.demo.service.CommentService;
import com.example.demo.model.Comment;

@Slf4j
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long boardId) {
        List<Comment> comments = commentService.findByBoardId(boardId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping
    public ResponseEntity<String> createComment(@RequestBody Comment comment) {
        try {
            commentService.insert(comment);
            return ResponseEntity.ok("댓글이 등록되었습니다.");
        } catch (Exception e) {
            log.error("댓글 등록 실패: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                               .body("댓글 등록에 실패했습니다.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateComment(@PathVariable Long id, @RequestBody Comment comment) {
        Comment existingComment = commentService.findById(id);
        if (existingComment != null) {
            comment.setId(id);
            commentService.update(comment);
            return ResponseEntity.ok("댓글이 수정되었습니다.");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Long id) {
        Comment existingComment = commentService.findById(id);
        if (existingComment != null) {
            commentService.delete(id);
            return ResponseEntity.ok("댓글이 삭제되었습니다.");
        }
        return ResponseEntity.notFound().build();
    }
}
