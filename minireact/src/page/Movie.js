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
    } catch (err) {
      console.error('Error in Movie component:', err);
    }
  };

  useEffect(() => {
    if (movies && movies.length > 0) {
      setIsLoading(true);
      
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

      // 차트 데이터 설정
      setGenreData([['장르', '편수'], ...Object.entries(genreCount)]);
      
      const sortedKeywords = Object.entries(keywordCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
      
      const keywordChartData = [['ID', 'X', 'Y', 'Keyword', 'Count']];
      sortedKeywords.forEach(([keyword, count], index) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        keywordChartData.push([index.toString(), x, y, keyword, count]);
      });
      setKeywordData(keywordChartData);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [movies]);

  return (
    <div className="container mt-5">
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">영화 검색</h3>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-label">국가이름</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="국가 이름을 입력하세요"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-label">시작 연도</label>
                <input 
                  type="number" 
                  className="form-control"
                  value={startYear}
                  min="1900"
                  max={new Date().getFullYear()}
                  onChange={(e) => setStartYear(e.target.value)}
                  placeholder="시작 연도"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-label">종료 연도</label>
                <input 
                  type="number" 
                  className="form-control"
                  value={endYear}
                  min="1900"
                  max={new Date().getFullYear()}
                  onChange={(e) => setEndYear(e.target.value)}
                  placeholder="종료 연도"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button 
              className="btn btn-primary px-4"
              onClick={fetchMovies}
            >
              검색
            </button>
          </div>
        </div>
      </div>

      {movies.length > 0 && (
        <div className="alert alert-info">
          <strong>검색된 영화 수:</strong> {movies.length}편
        </div>
      )}

      {genreData.length > 1 && (
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="mb-0">장르 분포</h4>
          </div>
          <div className="card-body">
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="mt-2">차트 데이터를 처리중입니다...</div>
              </div>
            ) : (
              <Chart
                chartType="PieChart"
                data={genreData}
                options={{
                  title: '장르별 영화 수',
                  pieHole: 0.4,
                  is3D: false,
                  backgroundColor: 'transparent',
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
                  chartArea: { width: '80%', height: '80%' }
                }}
                width="100%"
                height="400px"
              />
            )}
          </div>
        </div>
      )}

      {keywordData.length > 1 && (
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="mb-0">주요 키워드 분포</h4>
          </div>
          <div className="card-body">
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="mt-2">차트 데이터를 처리중입니다...</div>
              </div>
            ) : (
              <Chart
                chartType="BubbleChart"
                data={keywordData}
                options={{
                  title: '키워드 출현 빈도',
                  hAxis: { title: '', textPosition: 'none' },
                  vAxis: { title: '', textPosition: 'none' },
                  bubble: { textStyle: { fontSize: 12 } },
                  backgroundColor: 'transparent',
                  sizeAxis: { minSize: 10, maxSize: 40 },
                  legend: { position: 'none' }
                }}
                width="100%"
                height="400px"
              />
            )}
          </div>
        </div>
      )}

      {movies.length > 0 && (
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="mb-0">{name}의 영화 목록</h4>
          </div>
          <div className="card-body">
            {movies.length === 0 ? (
              <p className="text-center">해당 국가의 영화가 없습니다.</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {movies.map((movie, index) => {
                  const posterUrl = movie.posters?.split('|')[0] || null;
                  const stillUrl = movie.stlls?.split('|')[0] || null;
                  const imageUrl = posterUrl || stillUrl;
                  const directorNames = movie.directors?.director?.map((dir) => dir.directorNm).join(', ') || '정보 없음';

                  return (
                    <div key={index} className="col">
                      <div className="card h-100">
                        {imageUrl ? (
                          <img 
                            src={imageUrl} 
                            className="card-img-top" 
                            alt={`${movie.title || '영화'} Poster`}
                            style={{ height: '300px', objectFit: 'cover' }}
                          />
                        ) : (
                          <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                            <span className="text-muted">이미지가 없습니다</span>
                          </div>
                        )}
                        <div className="card-body">
                          <h5 className="card-title">{movie.title || '제목 없음'}</h5>
                          <p className="card-text">
                            <small className="text-muted">
                              제작 연도: {movie.prodYear || '알 수 없음'}<br/>
                              감독: {directorNames}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
