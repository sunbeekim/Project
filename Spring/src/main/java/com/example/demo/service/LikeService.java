package com.example.demo.service;

import com.example.demo.mapper.LikeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

    @Autowired
    private LikeMapper likeMapper;

    /**
     * 특정 게시글에 대해 사용자의 좋아요 상태를 토글합니다.
     * @param postId 게시글 ID
     * @param userId 사용자 ID
     * @return 토글 후 좋아요 수
     */
    public int toggleLike(int postId, int userId) {
        boolean isLiked = likeMapper.isLiked(postId, userId);

        if (isLiked) {
            likeMapper.removeLike(postId, userId);
        } else {
            likeMapper.addLike(postId, userId);
        }

        return likeMapper.countLikes(postId);
    }

    /**
     * 특정 게시글의 좋아요 수를 가져옵니다.
     * @param postId 게시글 ID
     * @return 좋아요 수
     */
    public int getLikeCount(int postId) {
        return likeMapper.countLikes(postId);
    }
}
