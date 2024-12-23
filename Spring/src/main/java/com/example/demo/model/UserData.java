package com.example.demo.model;

import lombok.Data;

@Data
public class UserData {
    private Long id; // 참조되는 users_login의 id
    private String forename;
    private String email;
    private String phone_number;
}
