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
        headers: { 'Content-Type': 'applicatioin/json' },
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
    alert("Login Click!");
  };

  //vi? 프로젝트 위치로 가주세요
  // 깃 명령어에 marge 하신건가요?
  // 되는데요?ㅋㅋㅋㅋㄴ뭐아아zzzz good
  // 아마도 
  //  git fetch --all 이 명령어는 원격저장소의 브랜치를 찾아서 내 로컬 깃에도 저장하는 느낌
  // 딱 한번만 하면 됩니다 원격저장소에 브랜치가 추가 되거나 삭제되지 않는 이상.
  // 히스토리 보니까 깃 푸쉬 성공했는데 안된거 같아서 pull 하니까
  // vi편집기로 이동돼서 그랬던거 같아요
  
  // git reset --hard origin/feature_1 가장 최근 작업으로 복구
  
  // git add . 변경사항 업로드 준비
  // git status 변경사항 보기
  // git commit -m "작업내용" 변경사항 임시저장
  // git push origin feature_1 변경사항 원격저장소로 업로드
 
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1>Login page</h1> 

     <div>
      <label htmlfor="username">아이디</label>
        <input type="text" name="username" id="username" value={"id"} placeholder="아이디를 입력하세요" ></input>
      </div>
    
    <div>
      <label htmlfor="userpassword">비밀번호</label>
        <input type="password" name="password" id="password" value={"password"}placeholder="비밀번호호를 입력하세요" ></input>
    
        </div>

        <button type="submit">로그인</button>
        </form>

        <Link to="/signup">회원가입</Link>
      </div>
  );
};

export default Login;
