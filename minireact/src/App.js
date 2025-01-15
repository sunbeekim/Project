import React, { useEffect } from 'react';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './page/Home.js';
import Board from './page/Board.js';
import Movie from './page/Movie.js';
import Login from './page/Login.js';
import SignUp from './page/SignUp.js';
import BoardWriting from './page/BoardWriting.js';
import BoardRead from './page/BoardRead.js';
import BoardEdit from './page/BoardEdit.js';
import { CheckSessionAPI, LogoutAPI } from './api/UserAPI.js';
import { useSession } from './context/SessionContext';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, userId, setUserId, forename, setForename } = useSession();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionData = await CheckSessionAPI();
        if (sessionData.loggedIn) {
          setIsLoggedIn(true);
          setUserId(sessionData.userId);
          setForename(sessionData.forename);
        } else {
          setIsLoggedIn(false);
          setUserId('');
          setForename('');          
        }
      } catch (error) {
        console.error('세션 확인 중 오류 발생:', error);
      }
    };
    checkSession();
  }, [location, navigate, setIsLoggedIn, setUserId, setForename]);

  const handleLogout = async () => {
    try {
      await LogoutAPI();
      setIsLoggedIn(false);
      setUserId('');
      setForename('');
      alert('로그아웃 되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="white" expand="lg" className="navbar-light shadow-sm fixed-top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            <span className="text-primary">Movie</span>App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/" className="mx-2 nav-link">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/board" className="mx-2 nav-link">
                Board
              </Nav.Link>
              <Nav.Link as={Link} to="/movie-booking" className="mx-2 nav-link">
                MovieData
              </Nav.Link>
              
              {isLoggedIn ? (
                <>
                  <span className="mx-2 text-muted">
                    Welcome, {forename}
                  </span>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={handleLogout}
                    className="ms-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="primary" 
                  size="sm" 
                  className="ms-2"
                >
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="flex-grow-1 container my-5 pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/movie-booking" element={<Movie />} />
          <Route path="/board-writing" element={<BoardWriting />} />
          <Route path="/board-read" element={<BoardRead />} />
          <Route path="/board-edit" element={<BoardEdit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>

      <footer className="bg-light py-4 mt-auto">
        <Container>
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start mb-2 mb-lg-0">
              <span className="text-muted small">&copy; 2024 MovieApp. All rights reserved.</span>
            </div>
            <div className="col-lg-6 text-center text-lg-end">
              <a href="#" className="text-decoration-none text-muted mx-2">이용약관</a>
              <a href="#" className="text-decoration-none text-muted mx-2">개인정보처리방침</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default App;
