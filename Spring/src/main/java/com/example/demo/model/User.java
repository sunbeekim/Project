package com.example.demo.model;

import lombok.Data;

@Data
public class User {
  private Long id; // auto_increment 필드
  private String userId;
  private String password;
  private String createdAt;
}
