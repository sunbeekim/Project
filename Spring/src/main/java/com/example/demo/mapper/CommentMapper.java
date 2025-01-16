package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.demo.model.Comment;

@Mapper
public interface CommentMapper {

    // 댓글 추가
    @Insert("INSERT INTO comment (board_id, content, created_at) VALUES (#{boardId}, #{content}, NOW())")
    void insertComment(Comment comment);

    // 게시글에 대한 댓글 조회
    @Select("SELECT * FROM comment WHERE board_id = #{boardId}")
    List<Comment> selectCommentsByBoard(int boardId);
}