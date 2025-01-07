package com.example.demo.dto;

import lombok.Data;

@Data
public class UserRequest {
  private String userId; // users_login.userId
  private String password; // users_login.password
  private String forename; // users_data.forename
  private String email; // users_data.email
  private String phoneNumber; // users_data.phoneNumber
}
