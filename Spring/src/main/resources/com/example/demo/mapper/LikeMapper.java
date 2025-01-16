package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LikeMapper {
    boolean isLiked(int postId, int userId);
    void addLike(int postId, int userId);
    void removeLike(int postId, int userId);
    int countLikes(int postId);
}
