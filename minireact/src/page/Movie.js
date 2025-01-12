import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const Movie = () => {
  // 상태 관리 Hook 선언부
  const [movies, setMovies] = useState([]); // kmdb API로부터 받아온 영화 데이터를 저장
  const [name, setName] = useState(''); // 검색할 감독 이름 상태 관리
  const [ratio, setRatio] = useState([]); // 영화별 배우/스태프 비율 데이터 저장
  const [showChart, setShowChart] = useState(false); // 차트 표시 여부 상태

  // API 관련 상수
  const API_URL = 'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp';
  const API_KEY = 'KZF0O6JP09Q6O216R86W';

  // 영화 데이터 fetch 함수
  const fetchMovies = async () => {
    try {
      // axios를 사용하여 KMDB API 호출
      const response = await axios.get(API_URL, {
        params: {
          ServiceKey: API_KEY,
          director: name, // 입력받은 감독 이름으로 검색
          startCount: 0,
          collection: 'kmdb_new2', // KMDB 신규 컬렉션 사용
          detail: 'Y' // 상세 정보 포함 요청
        }
      });
      // API 응답에서 영화 목록 추출 (없을 경우 빈 배열 반환)
      const fetchedMovies = response.data.Data?.[0]?.Result || [];
      setMovies(fetchedMovies);
      console.log(fetchedMovies);
      console.log(response.data);
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  };

  // 영화 목록 렌더링 함수 - 최상위 스코프가 렌더링하는 곳이 아닌 그 다음 스코프에 함수로 만듬
  const renderMovies = () => {
    return movies.map((movie, index) => {
      // 스태프와 배우 수 계산
      const staffCount = movie.staffs?.staff?.length || 0;
      const actorCount = movie.actors?.actor?.length || 1; // 배우 정보가 없을 경우 기본값 1
      const cost = staffCount / actorCount; // 배우 1인당 스태프 수 계산

      // 포스터 이미지 URL 처리 (포스터가 없을 경우 스틸컷 사용)
      const posterUrl = movie.posters?.split('|')[0] || null;
      const stillUrl = movie.stlls?.split('|')[0] || null;
      const imageUrl = posterUrl || stillUrl;

      // 감독 이름 추출 및 문자열로 변환
      const directorNames =
        movie.directors?.director?.map((dir) => dir.directorNm).join(', ') || '정보 없음';

      // 영화 정보 카드 렌더링
      return (
        <li key={index}>
          <p>{`"배우 1인당 스태프 수" ${cost.toFixed(2)}`}</p>
          <h2>{movie.title || '제목 없음'}</h2>
          <p>제작 연도: {movie.prodYear || '알 수 없음'}</p>
          <p>감독: {directorNames}</p>
          {imageUrl ? (
            <img src={imageUrl} alt={`${movie.title || '영화'} Poster`} width="200" />
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

  // 입력 필드 변경 이벤트 핸들러
  const handleInputChange = (event) => {
    setName(event.target.value); // 입력값으로 감독 이름 상태 업데이트
  };

  // 검색 버튼 클릭 이벤트 핸들러
  const handleSearch = () => {
    if (name.trim()) {
      fetchMovies(); // 입력값이 있을 경우에만 검색 실행
    } else {
      alert('감독 이름을 입력하세요!');
    }
  };

  // 장바구니 추가 핸들러 (향후 구현 예정)
  const handlerCart = (movie) => {
    console.log(`${movie.title || '영화'} 장바구니 추가`);
  };

  // 예매하기 핸들러 (향후 구현 예정)
  const handlerReservation = (movie) => {
    console.log(`${movie.title || '영화'} 예매하기`);
  };

  // 영화 데이터가 변경될 때마다 차트 데이터 업데이트
  useEffect(() => {
    if (movies.length > 0) {
      // 각 영화의 배우/스태프 비율 계산
      const calculatedRatios = movies.map((movie) => {
        const staffCount = movie.staffs?.staff?.length || 0;
        const actorCount = movie.actors?.actor?.length || 1;
        const cost = staffCount / actorCount;
        return [movie.title, cost];
      });

      // 차트 데이터 구조 생성 (헤더 포함)
      setRatio([['영화 제목', '배우 1인당 스태프 수'], ...calculatedRatios]);
      setShowChart(true); // 차트 표시 활성화
    }
  }, [movies]); // movies 배열이 변경될 때만 실행

  // 컴포넌트 UI 렌더링
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
            options={{ title: '배우 1인당 스태프 수' }}
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
