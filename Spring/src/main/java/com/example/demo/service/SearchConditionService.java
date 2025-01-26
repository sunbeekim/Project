package com.example.demo.service;

import org.springframework.stereotype.Service;
import com.example.demo.mapper.SearchConditionMapper;
import com.example.demo.model.SearchCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SearchConditionService {
    
    private final SearchConditionMapper searchConditionMapper;
    
    public void saveSearchCondition(SearchCondition searchCondition) {
        searchConditionMapper.save(searchCondition);
    }

    public SearchCondition findByConditions(String nation, String startYear, String endYear,
                                          String title, String actor, String director) {
        return searchConditionMapper.findByConditions(
            SearchCondition.builder()
                .nation(nation)
                .startYear(startYear)
                .endYear(endYear)
                .title(title)
                .actor(actor)
                .director(director)
                .build()
        );
    }
} 