package com.example.demo.dto;

import lombok.Data;

@Data
public class LikeDTO {
	private int postId; // 게시글 ID
	private int userId; // 사용자 ID
	private boolean liked; // 좋아요 여부
	private int likeCount; // 좋아요 수

}
