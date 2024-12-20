package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
//데이터베이스와 상호작용해 데이터를 저장
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 기본 CRUD 메서드 자동 생성
}
