package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.example.demo.model.SearchCondition;
import java.util.Optional;

@Mapper
public interface SearchConditionMapper {
    void save(SearchCondition searchCondition);
    
    Optional<SearchCondition> findByConditions(
        String nation,
        String startYear,
        String endYear,
        String title,
        String actor,
        String director
    );
} 