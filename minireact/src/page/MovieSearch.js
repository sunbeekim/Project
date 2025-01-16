import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { fetchMoviesByDirector } from '../api/ExternalAPI';
import { useNavigate } from 'react-router-dom';
import MovieDetail from './MovieDetail';

const MovieSearch = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [movies, setMovies] = useState([]);
  const [name, setName] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [genreData, setGenreData] = useState([]);
  const [keywordData, setKeywordData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [actor, setActor] = useState('');
  const [director, setDirector] = useState('');
  const [yearlyData, setYearlyData] = useState([]);
  const [actorData, setActorData] = useState([]);
  const [directorData, setDirectorData] = useState([]);
  const [runtimeData, setRuntimeData] = useState([]);
  const [minRuntime, setMinRuntime] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [yearlyKeywordData, setYearlyKeywordData] = useState([]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };
  
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const result = await fetchMoviesByDirector(
        name, 
        startYear, 
        endYear, 
        title, 
        actor, 
        director,
        minRuntime
      );
      setMovies(result);
      console.log(result);
    } catch (err) {
      console.error('Error in Movie component:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (movies && movies.length > 0) {
      setIsLoading(true);
      
      // 상영시간 필터링 적용
      const filtered = minRuntime 
        ? movies.filter(movie => {
            const runtime = parseInt(movie.runtime);
            return runtime && runtime >= parseInt(minRuntime);
          })
        : movies;
      
      setFilteredMovies(filtered);

      // 장르 데이터 처리
      const genreCount = {};
      filtered.forEach(movie => {
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
      filtered.forEach(movie => {
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
      
      // 1. 연도별 영화 수 집계
      const yearlyCount = {};
      filtered.forEach(movie => {
        const year = movie.prodYear;
        if (year) {
          yearlyCount[year] = (yearlyCount[year] || 0) + 1;
        }
      });
      const yearlyChartData = [
        ['연도', '제작 편수'],
        ...Object.entries(yearlyCount).sort()
      ];
      setYearlyData(yearlyChartData);

      // 2. 배우 출연 빈도
      const actorCount = {};
      filtered.forEach(movie => {
        movie.actors?.actor?.forEach(actor => {
          const name = actor.actorNm.trim();
          if (name) {
            actorCount[name] = (actorCount[name] || 0) + 1;
          }
        });
      });
      const topActors = Object.entries(actorCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
      setActorData([
        ['배우', '출연 횟수'],
        ...topActors
      ]);

      // 3. 감독별 작품 수
      const directorCount = {};
      filtered.forEach(movie => {
        movie.directors?.director?.forEach(dir => {
          const name = dir.directorNm;
          if (name) {
            directorCount[name] = (directorCount[name] || 0) + 1;
          }
        });
      });
      const topDirectors = Object.entries(directorCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
      setDirectorData([
        ['감독', '작품 수'],
        ...topDirectors
      ]);

      // 4. 상영시간 분포
      const runtimeRanges = {
        '90분 미만': 0,
        '90-120분': 0,
        '120-150분': 0,
        '150분 이상': 0
      };
      filtered.forEach(movie => {
        const runtime = parseInt(movie.runtime);
        if (runtime) {
          if (runtime < 90) runtimeRanges['90분 미만']++;
          else if (runtime < 120) runtimeRanges['90-120분']++;
          else if (runtime < 150) runtimeRanges['120-150분']++;
          else runtimeRanges['150분 이상']++;
        }
      });
      setRuntimeData([
        ['상영시간', '영화 수'],
        ...Object.entries(runtimeRanges)
      ]);


      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [movies, minRuntime]);



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
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-label">영화 제목</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="영화 제목을 입력하세요"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-label">배우</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={actor} 
                  onChange={(e) => setActor(e.target.value)}
                  placeholder="배우 이름을 입력하세요"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-label">감독</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={director} 
                  onChange={(e) => setDirector(e.target.value)}
                  placeholder="감독 이름을 입력하세요"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-label">최소 상영시간 (분)</label>
                <input 
                  type="number" 
                  className="form-control"
                  value={minRuntime}
                  min="0"
                  onChange={(e) => setMinRuntime(e.target.value)}
                  placeholder="최소 상영시간"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button 
              className="btn btn-primary px-4"
              onClick={handleSearch}
            >
              검색
            </button>
          </div>
        </div>
      </div>

      {filteredMovies.length > 0 && (
        <div className="alert alert-info">
          <strong>검색된 영화 수:</strong> {filteredMovies.length}편
          {minRuntime && (
            <span className="ms-2">
              (상영시간 {minRuntime}분 이상)
            </span>
          )}
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

      {yearlyData.length > 1 && (
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="mb-0">연도별 제작 현황</h4>
          </div>
          <div className="card-body">
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <Chart
                chartType="LineChart"
                data={yearlyData}
                options={{
                  title: '연도별 영화 제작 수',
                  curveType: 'function',
                  legend: { position: 'bottom' },
                  backgroundColor: 'transparent',
                  hAxis: { title: '연도' },
                  vAxis: { title: '제작 편수' }
                }}
                width="100%"
                height="400px"
              />
            )}
          </div>
        </div>
      )}

      {actorData.length > 1 && (
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="mb-0">주요 배우 출연 현황</h4>
          </div>
          <div className="card-body">
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <Chart
                chartType="BarChart"
                data={actorData}
                options={{
                  title: '배우별 출연 횟수 (상위 10명)',
                  backgroundColor: 'transparent',
                  hAxis: { title: '출연 횟수' },
                  vAxis: { title: '배우' }
                }}
                width="100%"
                height="400px"
              />
            )}
          </div>
        </div>
      )}

      {directorData.length > 1 && (
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="mb-0">감독별 작품 수</h4>
          </div>
          <div className="card-body">
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <Chart
                chartType="ColumnChart"
                data={directorData}
                options={{
                  title: '감독별 작품 수 (상위 10명)',
                  backgroundColor: 'transparent',
                  hAxis: { title: '감독' },
                  vAxis: { title: '작품 수' }
                }}
                width="100%"
                height="400px"
              />
            )}
          </div>
        </div>
      )}

      {runtimeData.length > 1 && (
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="mb-0">상영시간 분포</h4>
          </div>
          <div className="card-body">
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <Chart
                chartType="ColumnChart"
                data={runtimeData}
                options={{
                  title: '상영시간별 영화 수',
                  backgroundColor: 'transparent',
                  hAxis: { title: '상영시간 구간' },
                  vAxis: { title: '영화 수' }
                }}
                width="100%"
                height="400px"
              />
            )}
          </div>
        </div>
      )}

    
      {filteredMovies.length > 0 && (
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="mb-0">영화 목록</h4>
          </div>
          <div className="card-body">
            {filteredMovies.length === 0 ? (
              <p className="text-center">해당 국가의 영화가 없습니다.</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredMovies.map((movie, index) => {
                  const posterUrl = movie.posters?.split('|')[0] || null;
                  const stillUrl = movie.stlls?.split('|')[0] || null;
                  const imageUrl = posterUrl || stillUrl;
                  const directorNames = movie.directors?.director?.map((dir) => dir.directorNm).join(', ') || '정보 없음';

                  return (
                    <div key={index} className="col">
                      <div 
                        className="card h-100" 
                        onClick={() => handleMovieClick(movie)}
                        style={{ cursor: 'pointer' }}
                      >
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

      {selectedMovie && (
        <MovieDetail 
          show={showModal}
          onHide={() => setShowModal(false)}
          movie={selectedMovie}
        />
      )}
    </div>
  );
};

export default MovieSearch;
