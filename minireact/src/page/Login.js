import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";



const Login = () => {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const fetchLogin = async () => {
    const loginData = {
      username: username,
      password: userpassword
    }
    try {
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json(); 

      if (data.success) {
        setLoginStatus('로그인 성공!');
      } else {
        setLoginStatus('아이디 또는 비밀번호가 잘못되었습니다.');
      }
      
    } catch (error) {
      console.error("에러 발생:", error);
      setLoginStatus('로그인 중 오류가 발생했습니다.');
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin();
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1>Login page</h1> 

     <div>
      <label htmlfor="username">아이디</label>
        <input type="text" name="username" id="username" value={"username"} onChange={(e) => setUsername(e.target.value)} placeholder="아이디를 입력하세요" ></input>
      </div>
    
    <div>
      <label htmlfor="userpassword">비밀번호</label>
        <input type="password" name="userpassword" id="userpassword" value={"userpassword"} onChange={(e) => setUserpassword(e.target.value)} placeholder="비밀번호호를 입력하세요" ></input>
    
        </div>

        <button type="submit">로그인</button>
        </form>

        <Link to="/signup">회원가입</Link>
      </div>
  );
};

export default Login;
