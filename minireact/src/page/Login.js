import React, { useState } from 'react';
import { Link } from "react-router-dom";



const Login = () => {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Click!");
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1>Login page</h1> 

     <div>
      <label htmlfor="username">아이디</label>
        <input type="text" name="username" id="username" value={"id"} placeholder="아이디를 입력하세요" ></input>
      </div>
    
    <div>
      <label htmlfor="userpassword">비밀번호호</label>
        <input type="password" name="password" id="password" value={"password"}placeholder="비밀번호호를 입력하세요" ></input>
    
        </div>

        <button type="submit">로그인</button>
        </form>

        <Link to="/signup">회원가입</Link>
      </div>
  );
};

export default Login;
