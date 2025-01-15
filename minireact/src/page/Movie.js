import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { fetchMoviesByDirector } from '../api/ExternalAPI';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [genreData, setGenreData] = useState([]);
  const [keywordData, setKeywordData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      const fetchedMovies = await fetchMoviesByDirector(name, startYear, endYear);
      setMovies(fetchedMovies);
      console.log("영화 데이터:", fetchedMovies);
    } catch (err) {
      console.error('Error in Movie component:', err);
    }
  };

  useEffect(() => {
    if (movies && movies.length > 0) {
      setIsLoading(true); // 데이터 처리 시작
      
      // 장르 데이터 처리
      const genreCount = {};
      movies.forEach(movie => {
        const genres = movie.genre?.split(',') || [];
        genres.forEach(genre => {
          const trimmedGenre = genre.trim();
          if (trimmedGenre) {
            genreCount[trimmedGenre] = (genreCount[trimmedGenre] || 0) + 1;
          }
        });
      });

      // 키워드 데이터 처리
    const keywordCount = {};
    movies.forEach(movie => {
      
      const keywords = movie.keywords?.split(',') || [];
      
      
      keywords.forEach(keyword => {
        const trimmedKeyword = keyword.trim();
        if (trimmedKeyword) {
          keywordCount[trimmedKeyword] = (keywordCount[trimmedKeyword] || 0) + 1;
        }
      });
    });

    console.log("키워드 카운트:", keywordCount); // 최종 키워드 카운트 확인

    // 키워드 차트 데이터 구성 (상위 10개만)
    const sortedKeywords = Object.entries(keywordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
    
    console.log("정렬된 상위 10개 키워드:", sortedKeywords); // 정렬된 키워드 확인
    
    const keywordChartData = [['ID', 'X', 'Y', 'Keyword', 'Count']];
    sortedKeywords.forEach(([keyword, count], index) => {
      // 랜덤한 위치에 버블을 배치
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      keywordChartData.push([index.toString(), x, y, keyword, count]);
    });

      // 차트 데이터 설정
      setGenreData([['장르', '편수'], ...Object.entries(genreCount)]);
      setKeywordData(keywordChartData);
      
      setTimeout(() => {
        setIsLoading(false); // 데이터 처리 완료
      }, 500); // 차트가 그려질 시간을 조금 주기 위해 지연
    }
  }, [movies]);

  // 영화 목록 렌더링 함수 - 최상위 스코프가 렌더링하는 곳이 아닌 그 다음 스코프에 함수로 만듬
  const renderMovies = () => {
    return movies.map((movie, index) => {
      
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
          
          <h2>{movie.title || '제목 없음'}</h2>
          <p>제작 연도: {movie.prodYear || '알 수 없음'}</p>
          <p>감독: {directorNames}</p>
          {imageUrl ? (
            <img src={imageUrl} alt={`${movie.title || '영화'} Poster`} width="200" />
          ) : (
            <p>이미지가 없습니다.</p>
          )}
          <div>
          </div>
        </li>
      );
    });
  };



  // 컴포넌트 UI 렌더링
  return (
    <div>
      <div className="search-container">
        <div className="form-group">
          <label>국가이름:</label>
          <input 
            type="text" 
            className="form-control"
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>시작 연도:</label>
          <input 
            type="number"
            className="form-control"
            value={startYear}
            min="1900"
            max={new Date().getFullYear()}
            onChange={(e) => setStartYear(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>종료 연도:</label>
          <input 
            type="number"
            className="form-control"
            value={endYear}
            min="1900"
            max={new Date().getFullYear()}
            onChange={(e) => setEndYear(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={fetchMovies}>
          검색
        </button>
      </div>

      {movies.length > 0 && (
        <div style={{ 
          marginBottom: '20px', 
          fontSize: '1.1em',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px'
        }}>
          <strong>검색된 영화 수:</strong> {movies.length}편
        </div>
      )}

      {genreData.length > 1 && (
        <div>
          <h2>장르 분포</h2>
          {isLoading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '400px',
              fontSize: '1.2em',
              color: '#666'
            }}>
              <div>차트 데이터를 처리중입니다...</div>
            </div>
          ) : (
            <Chart
              chartType="PieChart"
              data={genreData}
              options={{
                title: '장르별 영화 수',
                pieHole: 0.4,
                is3D: false,
                backgroundColor: '#f8f9fa',
                colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9FA4A9'],
                titleTextStyle: { 
                  color: '#2C3E50',
                  fontSize: 18,
                  fontName: 'Arial'
                },
                legend: {
                  position: 'right',
                  textStyle: {
                    color: '#2C3E50',
                    fontSize: 14
                  }
                },
                tooltip: { showColorCode: true },
                chartArea: { width: '80%', height: '80%' },
                animation: {
                  startup: true,
                  duration: 1000,
                  easing: 'out'
                }
              }}
              width="100%"
              height="400px"
            />
          )}
        </div>
      )}

{keywordData.length > 1 && (
  <div>
    <h2>주요 키워드 분포</h2>
    {isLoading ? (
      <div>차트 데이터를 처리중입니다...</div>
    ) : (
      <Chart
        chartType="BubbleChart"
        data={keywordData}
        options={{
          title: '키워드 출현 빈도',
          hAxis: { title: '', textPosition: 'none' },
          vAxis: { title: '', textPosition: 'none' },
          bubble: {
            textStyle: {
              fontSize: 12
            }
          },
          sizeAxis: {
            minSize: 10,
            maxSize: 20
          },
          legend: { position: 'none' }
        }}
        width="100%"
        height="400px"
      />
    )}
  </div>
)}

      <h1>{name}의 영화 목록</h1>
      {movies.length === 0 ? (
        <p>해당 국가의 영화가 없습니다.</p>
      ) : (
        <ul>{renderMovies()}</ul>
      )}
    </div>
  );
};

export default Movie;
