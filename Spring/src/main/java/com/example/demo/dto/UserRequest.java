package com.example.demo.dto;

import lombok.Data;

@Data
public class UserRequest {
    private String user_id;        // users_login.user_id
    private String password;      // users_login.password
    private String forename;      // users_data.forename
    private String email;         // users_data.email
    private String phone_number;   // users_data.phone_number
}
