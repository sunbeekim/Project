package com.example.demo.mapper;

import com.example.demo.model.MovieResult;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface MovieResultMapper {
    // XML에 정의된 메서드들
    void save(MovieResult movieResult);
    List<MovieResult> findBySearchConditionId(Integer searchConditionId);
    MovieResult findByMovieCd(String movieCd);
} 