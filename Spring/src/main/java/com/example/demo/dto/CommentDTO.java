package com.example.demo.dto;

public class CommentDTO {

    private int commentId;
    private String content;

    // 생성자, getter, setter
    public CommentDTO(int commentId, String content) {
        this.commentId = commentId;
        this.content = content;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
