import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../App.css';



const Login = () => {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchLogin = async () => {
    setIsLoading(true);// 로딩 시작
    const loginData = {
      username: username,
      password: userpassword
    };
    try {
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json(); 

      if (data && data.success) {
        alert('로그인 성공!'); // 성공 메시지 알림창 표시
      } else {
        alert('아이디 또는 비밀번호가 잘못되었습니다.'); // 실패 메시지 알림창 표시
      }
      
    } catch (error) {
      console.error("에러 발생:", error);
      alert('로그인 중 오류가 발생했습니다.'); // 오류 메시지 알림창 표시
    }//catch
    finally {
      setIsLoading(false); // 로딩 종료
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !userpassword.trim()) {
      alert('아이디와 비밀번호를 모두 입력해주세요.'); // 유효성 검사 알림창
      return;
    }
    fetchLogin(); // 로그인 요청 함수 호출
  };

    
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
    <div className="login-container">
      <form onSubmit={handleSubmit}>
      <h1>Login page</h1> 

     <div>
      <label htmlFor="username">아이디</label>
          <input type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력하세요"
            className="form-control"></input>
      </div>
    
    <div>
      <label htmlFor="userpassword">비밀번호</label>
          <input type="password"
            name="userpassword"
            id="userpassword"
            value={userpassword}
            onChange={(e) => setUserpassword(e.target.value)} placeholder="비밀번호호를 입력하세요"
            className="form-control"></input>
    
        </div>

        <div className='button-container'>
        <button type="submit" class="btn btn-warning">로그인</button>
        <Link to="/signup" className="signup-link">회원가입</Link>
        </div>
        </form>
    </div>
  );
};

export default Login;
