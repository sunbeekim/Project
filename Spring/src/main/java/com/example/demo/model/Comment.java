package com.example.demo.model;

import java.time.LocalDateTime;

public class Comment {

    private int commentId;
    private int boardId;
    private String content;
    private LocalDateTime createdAt;

    // 생성자, getter, setter
    public Comment() {}

    public Comment(int commentId, int boardId, String content, LocalDateTime createdAt) {
        this.commentId = commentId;
        this.boardId = boardId;
        this.content = content;
        this.createdAt = createdAt;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public int getBoardId() {
        return boardId;
    }

    public void setBoardId(int boardId) {
        this.boardId = boardId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
