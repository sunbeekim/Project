package com.example.demo.service;

import com.example.demo.dto.UserRequest;
import com.example.demo.model.*;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {//sqlSession 객체를 사용해 쿼리를 실행,MyBatis 프레임워크를 이용하여 SQL을 데이터베이스에 실행하는 방식
	private final SqlSession sqlSession;

	public UserService(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public User findById(Long id) {
		return sqlSession.selectOne("com.example.demo.mapper.UserMapper.findById", id);
	}

	public boolean validateLogin(String userId, String password) {
		User user = sqlSession.selectOne("com.example.demo.mapper.UserMapper.findByUserId\", userId");

		// 사용자 정보가 존재하고, 비밀번호가 일치하는지 확인
		if (user != null && user.getPassword().equals(password)) {
			return true; 
		}
		return false; 
	}

	public void createUser(UserRequest userRequest) {
		try {
			// users_login 테이블 데이터 생성 및 삽입
			User user = new User();
			user.setUserId(userRequest.getUserId());
			user.setPassword(userRequest.getPassword());
			sqlSession.insert("com.example.demo.mapper.UserMapper.insertUser", user);
			// com.example.demo.mapper.UserMapper 경로의 xml이 가지고 있는 insertUser에
			// 명시 된 쿼리문을 mybatis를 이용해서 보냄
			

			// users_data 테이블 데이터 생성 및 삽입
			UserData userData = new UserData();
			userData.setId(user.getId()); // users_login에서 생성된 ID 사용
			userData.setForename(userRequest.getForename());
			userData.setEmail(userRequest.getEmail());
			userData.setPhoneNumber(userRequest.getPhoneNumber());
			sqlSession.insert("com.example.demo.mapper.UserMapper.insertUserData", userData);
		} catch (Exception e) {//예외
			System.err.println("Error in createUser: " + e.getMessage());
			throw e;
		}
	}

}
