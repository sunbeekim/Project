package com.example.demo.model;

import lombok.Data;

@Data
public class User {
    private Long id; // auto_increment 필드
    private String user_id;
    private String password;
    private String created_at;
}
