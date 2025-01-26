package com.example.demo.mapper;

import com.example.demo.model.SearchCondition;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SearchConditionMapper {
    void save(SearchCondition searchCondition);
    
    SearchCondition findByConditions(SearchCondition condition);

    SearchCondition findById(Integer id);
} 