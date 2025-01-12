import logo from './logo.svg';
import './App.css';
import Home from './page/Home.js';
import Board from './page/Board.js';
import Movie from './page/Movie.js';
import MyMovie from './page/MyMovie.js';
import Login from './page/Login.js';
import SignUp from './page/SignUp.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

// 훅을 이용한 상태 및 생명주기 관리
import React, { useState, useEffect } from 'react';
// 세션검증
import { CheckSessionAPI, LogoutAPI } from './api/UserAPI.js';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionData = await CheckSessionAPI();
        if (sessionData.loggedIn) {
          setIsLoggedIn(true);
          setUserId(sessionData.userId);
        } else {
          setIsLoggedIn(false);
          setUserId('');
        }
      } catch (error) {
        console.error('세션 확인 중 오류 발생:', error);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await LogoutAPI();
      setIsLoggedIn(false);
      setUserId('');
      alert('로그아웃 되었습니다.');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  console.log(isLoggedIn);
  return (
    <Router>
      <div className="d-flex flex-column vh-100">
        {/* 네비게이션 바 */}
        <Navbar
          bg="dark"
          variant="dark"
          expand="lg"
          collapseOnSelect
          expanded={expanded} // 상태에 따라 확장 상태를 조절
          onToggle={(isOpen) => setExpanded(isOpen)} // 토글 상태를 업데이트
        >
          <Container>
            <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
              My Movie App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
                  홈
                </Nav.Link>
                <Nav.Link as={Link} to="/board" onClick={() => setExpanded(false)}>
                  게시판
                </Nav.Link>
                <Nav.Link as={Link} to="/movie-booking" onClick={() => setExpanded(false)}>
                  영화 예매
                </Nav.Link>
                <Nav.Link as={Link} to="/my-movies" onClick={() => setExpanded(false)}>
                  나의 영화
                </Nav.Link>
                {isLoggedIn ? (
                  <>
                    <Nav.Link>안녕하세요, {userId}님!</Nav.Link>
                    <Nav.Link
                      onClick={() => {
                        handleLogout();
                        setExpanded(false);
                      }}
                    >
                      로그아웃
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login">
                      로그인
                    </Nav.Link>
                   
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* 메인 컨텐츠 영역 */}
        <main className="flex-grow-1 container my-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board" element={<Board />} />
            <Route path="/movie-booking" element={<Movie />} />
            <Route path="/my-movies" element={<MyMovie />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />}
            />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>

        {/* 푸터 */}
        <footer className="bg-light text-center py-3">
          <Container>
            <p className="mb-0">&copy; 2024 My Movie App. All rights reserved.</p>
          </Container>
        </footer>
      </div>
    </Router>
  );
};

export default App;
