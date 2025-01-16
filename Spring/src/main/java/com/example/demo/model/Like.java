package com.example.demo.model;

import lombok.Data;

@Data
public class Like {
	private int id; // 좋아요 ID (Primary Key, Auto Increment)
	private int postId; // 게시글 ID
	private int userId; // 사용자 ID

}
