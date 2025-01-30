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
    // 조건에 따라 검색한 적이 있는지 확인용
    List<MovieResult> findBySearchConditionId(Integer searchConditionId);
    // 영화 코드로 영화 결과 조회
    MovieResult findByMovieCd(String movieCd);
} 