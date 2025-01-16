// minireact/src/page/Home.js

import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      {/* 프로젝트 소개 */}
      <section className="mb-5">
        <h2 className="border-bottom pb-2 mb-4">Movie App Project - </h2>
        <p className="lead">
          영화 정보 검색과 커뮤니티 기능을 제공하는 웹 애플리케이션입니다.
          한국영화데이터베이스(KMDB) Open API를 활용하여 영화 정보를 제공하고,
          사용자들과 소통할 수 있는 게시판 기능을 구현했습니다.
        </p>
      </section>

      {/* 주요 기능 소개 */}
      <section className="mb-5">
        <h3 className="mb-4">주요 기능</h3>
        <Row className="g-4">
          <Col md={6} lg={3}>
            <Card className="h-100">
              <Card.Body>
                <h4 className="h5 mb-3">영화 검색</h4>
                <ul className="list-unstyled">
                  <li>• 제목, 감독, 배우 검색</li>
                  <li>• 연도별, 국가별 필터링</li>
                  <li>• 장르 분포 시각화</li>
                  <li>• 키워드 분석</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="h-100">
              <Card.Body>
                <h4 className="h5 mb-3">영화 순위</h4>
                <ul className="list-unstyled">
                  <li>• 일간/주간/월간 순위</li>
                  <li>• 관람객 수 통계</li>
                  <li>• 박스오피스 정보</li>
                  <li>• 개봉 예정작</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="h-100">
              <Card.Body>
                <h4 className="h5 mb-3">커뮤니티</h4>
                <ul className="list-unstyled">
                  <li>• 게시글 CRUD</li>
                  <li>• 조회수 관리</li>
                  <li>• 사용자 권한 관리</li>
                  <li>• 반응형 UI</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="h-100">
              <Card.Body>
                <h4 className="h5 mb-3">회원 관리</h4>
                <ul className="list-unstyled">
                  <li>• 세션 기반 인증</li>
                  <li>• Context API 상태관리</li>
                  <li>• 회원가입/로그인</li>
                  <li>• API 인증 검증</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* 기술 스택 */}
      <section className="mb-5">
        <h3 className="mb-4">기술 스택</h3>
        <Row className="g-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <h4 className="h5 mb-3">Frontend</h4>
                <ul className="list-unstyled">
                  <li>• React 18</li>
                  <li>• React Router 6</li>
                  <li>• React Bootstrap</li>
                  <li>• Google Charts</li>
                  <li>• Axios</li>
                  <li>• Context API</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <h4 className="h5 mb-3">Backend</h4>
                <ul className="list-unstyled">
                  <li>• Spring Boot 3.3.7</li>                 
                  <li>• Spring Mybatis</li>
                  <li>• MySQL</li>                  
                  <li>• RESTful API</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* 아키텍처 */}
      <section className="mb-5">
        <h3 className="mb-4">아키텍처</h3>
        <Card>
          <Card.Body>
            <h4 className="h5 mb-3">시스템 구성</h4>
            <ul className="list-unstyled">
              <li>• Frontend: SPA 아키텍처 (React)</li>
              <li>• Backend: 계층형 아키텍처 (Controller-Service-Repository)</li>
              <li>• Database: MySQL (게시판, 회원정보)</li>
              <li>• External API: KMDB Open API (영화 정보)</li>
              <li>• 상태 관리: Context Custom Hook + SessionCheck API</li>             
            </ul>
          </Card.Body>
        </Card>
      </section>

      {/* 데이터 흐름 */}
      <section>
        <h3 className="mb-4">데이터 흐름</h3>
        <Card>
          <Card.Body>
            <h4 className="h5 mb-3">주요 데이터 흐름</h4>
            <ul className="list-unstyled">
              <li>• 사용자 요청 → React Component → API Service → Spring Controller</li>
              <li>• Spring Controller(+DTO) → Service Layer(+MODEL+DAO(+Mapper) OR +MODEL+DAO(+SqlSession)) → Mybatis.XML → Database</li>
              <li>• Database → Repository → Service Layer → Controller → React Component</li>
              <li>• External API 요청 → React Component → KMDB API → 데이터 시각화</li>
            </ul>
          </Card.Body>
        </Card>
      </section>

      {/* API 통합 */}
      <section>
        <h3 className="mb-4">API 통합</h3>
        <Card>
          <Card.Body>
            <ul className="list-unstyled">
              <li>• KMDB Open API 연동</li>
              <li>• Spring Boot REST API 구현</li>
              <li>• Axios 인터셉터 설정</li>
              <li>• 프록시 서버 설정 (포트 8080)</li>
              <li>• 세션 기반 인증 처리</li>
            </ul>
          </Card.Body>
        </Card>
      </section>

      {/* 인증 처리 */}
      <section className="mb-5">
        <h3 className="mb-4">인증 처리</h3>
        <Card>
          <Card.Body>
            <ul className="list-unstyled">
              <li>• Spring Session 관리</li>
              <li>• HttpSession setAttribute/getAttribute</li>
              <li>• Context API를 통한 클라이언트 상태 관리</li>
              <li>• API 요청 시 세션 검증</li>
              <li>• 인증 상태에 따른 UI 처리</li>
            </ul>
          </Card.Body>
        </Card>
      </section>
    </Container>
  );
};

export default Home;
