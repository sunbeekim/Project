package com.example.demo.mapper;

import com.example.demo.model.SearchCondition;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SearchConditionMapper {
    void save(SearchCondition searchCondition);
    
    SearchCondition findByConditions(SearchCondition condition);

    SearchCondition findById(Integer id);

    void updateMovieCounts(@Param("id") Integer id, 
                          @Param("totalMovies") Integer totalMovies, 
                          @Param("uniqueMovies") Integer uniqueMovies);
} 