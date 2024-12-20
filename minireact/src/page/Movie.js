import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

const Movie = () => {
  const [movies, setMovies] = useState([]); // kmdb 의 반환값을 저장하는 상태관리객체
  const [name, setName] = useState(""); // 검색할 이름의 변화를 감지하기 위한 "
  const [ratio, setRatio] = useState([]); // kmdb의 배우 수, 스태프 수를 배열에 누적
  const [showChart, setShowChart] = useState(false); // 기본 차트 상태는 안보여지게

  // API URL과 키를 상수로 정의 / 나중에 .env 파일 만들어서 따로 관리
  // 또 뭐적으려고했지
  const API_URL = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp";
  const API_KEY = "KZF0O6JP09Q6O216R86W";

  // 영화 데이터 가져오기 비동기 함수
  // fetch 써도 되지만, axios 패키지모듈 설치해서 사용했음
  // fetch는 브라우저 내장객체
  // axios는 req 보낼 때 context - applicatin(json) 같은
  // 헤더에 정의해줘야하는 구분값들을 자동으로 정의해주는 등의 기능이 있음
  const fetchMovies = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          ServiceKey: API_KEY, // API 키
          director: name, // 감독 이름
          startCount: 0, // 시작 인덱스
          collection: "kmdb_new2", // 컬렉션 종류 고정
          detail: "Y", // 세부 정보 여부
        },
      });
      // Data: [{Result :...}]
      // response(반환된 객체)data(실제값)Data(반환된 실제값의 구조)Result 마찬가지
      const fetchedMovies = response.data.Data?.[0]?.Result || [];
      setMovies(fetchedMovies);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  // 영화 목록 렌더링 함수 - 최상위 스코프가 렌더링하는 곳이 아닌 그 다음 스코프에 함수로 만듬
  const renderMovies = () => {
    return movies.map((movie, index) => {
      const staffCount = movie.staffs?.staff?.length || 0;
      const actorCount = movie.actors?.actor?.length || 1; // 배우가 없으면 기본값 1로 설정
      const cost = staffCount / actorCount;
      const posterUrl = movie.posters?.split("|")[0] || null;
      const stillUrl = movie.stlls?.split("|")[0] || null;
      const imageUrl = posterUrl || stillUrl;

      const directorNames =
        movie.directors?.director?.map((dir) => dir.directorNm).join(", ") || "정보 없음";

      return (
        <li key={index}>
          <p>{`"배우 1인당 스태프 수" ${cost.toFixed(2)}`}</p>
          <h2>{movie.title || "제목 없음"}</h2>
          <p>제작 연도: {movie.prodYear || "알 수 없음"}</p>
          <p>감독: {directorNames}</p>
          {imageUrl ? (
            <img src={imageUrl} alt={`${movie.title || "영화"} Poster`} width="200" />
          ) : (
            <p>이미지가 없습니다.</p>
          )}
          <div>
            <button onClick={() => handlerReservation(movie)}>예매하기</button>
            <button onClick={() => handlerCart(movie)}>장바구니</button>
          </div>
        </li>
      );
    });
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = () => {
    if (name.trim()) {
      fetchMovies();
    } else {
      alert("감독 이름을 입력하세요!");
    }
  };

  const handlerCart = (movie) => {
    console.log(`${movie.title || "영화"} 장바구니 추가`);
  };

  const handlerReservation = (movie) => {
    console.log(`${movie.title || "영화"} 예매하기`);
  };

  useEffect(() => {
    if (movies.length > 0) {
      const calculatedRatios = movies.map((movie) => {
        const staffCount = movie.staffs?.staff?.length || 0;
        const actorCount = movie.actors?.actor?.length || 1;
        const cost = staffCount / actorCount;
        return [movie.title, cost];
      });

      setRatio([["영화 제목", "배우 1인당 스태프 수"], ...calculatedRatios]); // 차트 데이터 업데이트
      setShowChart(true); // 차트 표시
    }
  }, [movies]);

  return (
    <div>
      <span>
        <label>영화감독</label>
        <input type="text" value={name} onChange={handleInputChange}></input>
        <button onClick={handleSearch}>검색</button>
      </span>
      <div>
        {showChart && (
          <Chart
            chartType="PieChart"
            data={ratio}
            options={{ title: "배우 1인당 스태프 수" }}
            width="100%"
            height="400px"
          />
        )}
      </div>
      <h1>{name} 감독의 영화 목록</h1>
      {movies.length === 0 ? <p>해당 감독의 영화가 없습니다.</p> : <ul>{renderMovies()}</ul>}
    </div>
  );
};

export default Movie;
