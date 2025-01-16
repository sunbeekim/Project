package com.example.demo.controller;

import com.example.demo.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/like")
public class LikeController {

    @Autowired
    private LikeService likeService;

    /**
     * 좋아요 상태를 토글합니다.
     * @param postId 게시글 ID
     * @param userId 사용자 ID (세션 또는 인증 정보에서 가져옴)
     * @return 좋아요 결과
     */
    @PostMapping
    public Map<String, Object> toggleLike(@RequestParam int postId, @RequestParam int userId) {
        Map<String, Object> response = new HashMap<>();
        try {
            int likeCount = likeService.toggleLike(postId, userId);
            response.put("success", true);
            response.put("likeCount", likeCount);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "오류가 발생했습니다.");
        }
        return response;
    }

    /**
     * 특정 게시글의 좋아요 수를 가져옵니다.
     * @param postId 게시글 ID
     * @return 좋아요 수
     */
    @GetMapping("/{postId}")
    public Map<String, Object> getLikeCount(@PathVariable int postId) {
        Map<String, Object> response = new HashMap<>();
        try {
            int likeCount = likeService.getLikeCount(postId);
            response.put("success", true);
            response.put("likeCount", likeCount);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "오류가 발생했습니다.");
        }
        return response;
    }
}
