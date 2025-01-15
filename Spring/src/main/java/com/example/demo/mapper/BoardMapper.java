package com.example.demo.mapper;

import com.example.demo.model.Board;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface BoardMapper {
    List<Board> getAllPosts();
    Board getPostById(Long id);
    int updatePost(Board board);
}
