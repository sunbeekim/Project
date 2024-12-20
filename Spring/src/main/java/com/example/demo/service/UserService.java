package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
// 비즈니스 로직 처리 후 Repository에 저장 요청
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
//비밀번호 해시 처리
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
