package com.example.demo.service;

import org.springframework.stereotype.Service;
import com.example.demo.mapper.SearchConditionMapper;
import com.example.demo.model.SearchCondition;
import lombok.RequiredArgsConstructor;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SearchConditionService {
    
    private final SearchConditionMapper searchConditionMapper;
    
    public void saveSearchCondition(SearchCondition searchCondition) {
        searchConditionMapper.save(searchCondition);
    }
    
    public Optional<SearchCondition> findByConditions(
        String nation,
        String startYear,
        String endYear,
        String title,
        String actor,
        String director
    ) {
        return searchConditionMapper.findByConditions(
            nation, startYear, endYear, title, actor, director
        );
    }
} 