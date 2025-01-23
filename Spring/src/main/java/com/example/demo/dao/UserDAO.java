package com.example.demo.dao;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UserRequest;

public interface UserDAO {
    void createUser(UserRequest userRequest);
    boolean validUser(LoginRequest loginRequest);
    boolean findByUserId(String userId);
    String getForenameByUserId(String userId);
}