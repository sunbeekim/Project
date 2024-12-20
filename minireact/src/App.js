import logo from "./logo.svg";
import "./App.css";
import Home from "./page/Home.js";
import Board from "./page/Board.js";
import Movie from "./page/Movie.js";
import MyMovie from "./page/MyMovie.js";
import Login from "./page/Login.js";
import SignUp from "./page/SignUp.js";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column vh-100">
        {/* 네비게이션 바 */}
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <Navbar.Brand as={Link} to="/">
              My Movie App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">
                  홈
                </Nav.Link>
                <Nav.Link as={Link} to="/board">
                  게시판
                </Nav.Link>
                <Nav.Link as={Link} to="/movie-booking">
                  영화 예매
                </Nav.Link>
                <Nav.Link as={Link} to="/my-movies">
                  나의 영화
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
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
            <Route path="/login" element={<Login />} />
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
}

export default App;
