// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  // Google Charts 초기화
  google.charts.load('current', {
    packages: ['corechart', 'table']
  });

  // 차트 로드 완료 후 콜백
  google.charts.setOnLoadCallback(() => {
    console.log('Google Charts loaded');
    // 검색 버튼에 이벤트 리스너 추가
    document.querySelector('#searchButton')?.addEventListener('click', handleSearch);
  });
});

// 검색 처리 함수
const handleSearch = async () => {
  showLoading(true);

  try {
    const params = {
      nation: $('#nation').val(),
      startYear: $('#startYear').val(),
      endYear: $('#endYear').val(),
      title: $('#title').val(),
      actor: $('#actor').val(),
      director: $('#director').val()
    };

    const response = await MovieAPI.searchMovies(params);
    const movies = response.Data?.[0]?.Result || [];
    console.log(movies);
    displayMovies(movies, response);

    if (google && google.visualization) {
      processChartData(movies);
    } else {
      console.log('Google Charts not loaded yet, waiting...');
      google.charts.setOnLoadCallback(() => {
        processChartData(movies);
      });
    }
  } catch (error) {
    console.error('영화 검색 실패:', error);
    alert('영화 검색에 실패했습니다.');
  } finally {
    showLoading(false);
  }
}

// 영화 목록 표시 함수
const displayMovies = (movies, response) => {
  const movieGrid = $('#movieGrid');
  movieGrid.empty();

  const totalMovies = response.totalMovies || 0;
  const uniqueMovies = response.uniqueMovies || 0;
  const duplicateMovies = totalMovies - uniqueMovies;

  $('#totalMovieCount').text(`전체 영화: ${totalMovies}개`);
  $('#duplicateMovieCount').text(`중복 영화: ${duplicateMovies}개`);
  $('#uniqueMovieCount').text(`검색 영화: ${uniqueMovies}개`);

  if (movies.length === 0) {
    movieGrid.html('<p class="text-center w-100">검색 결과가 없습니다.</p>');
    return;
  }

  movies.forEach((movie) => {
    const posterUrl = movie.posters?.split('|')[0] || null;
    const stillUrl = movie.stlls?.split('|')[0] || null;
    const imageUrl = posterUrl || stillUrl;
    const directorNames =
      movie.directors?.director?.map((dir) => dir.directorNm).join(', ') || '정보 없음';

    const movieCard = `
            <div class="col">
                <div class="card h-100" onclick="showMovieDetail(${JSON.stringify(movie).replace(
                  /"/g,
                  '&quot;'
                )})" style="cursor: pointer">
                    ${
                      imageUrl
                        ? `<img src="${imageUrl}" class="card-img-top" alt="${
                            movie.title || '영화'
                          }" style="height: 300px; object-fit: cover">`
                        : `<div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 300px">
                            <span class="text-muted">이미지가 없습니다</span>
                           </div>`
                    }
                    <div class="card-body">
                        <h5 class="card-title">${movie.title || '제목 없음'}</h5>
                        <p class="card-text">
                            <small class="text-muted">
                                제작 연도: ${movie.prodYear || '알 수 없음'}<br>
                                감독: ${directorNames}
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        `;
    movieGrid.append(movieCard);
  });

  $('#movieList').show();
}

// 영화 상세 정보 표시 함수
const showMovieDetail = (movie) => {
  document.getElementById('movieDetailTitle').textContent = movie.title;

  const posterContainer = document.getElementById('posterContainer');
  if (movie.posters) {
    const posterUrl = movie.posters.split('|')[0];
    posterContainer.innerHTML = `<img src="${posterUrl}" alt="${movie.title}" class="img-fluid rounded shadow">`;
  } else {
    posterContainer.innerHTML = `<div class="bg-light p-5 text-center rounded"><span class="text-muted">이미지가 없습니다</span></div>`;
  }

  document.getElementById('directorInfo').textContent =
    movie.directors?.director?.map((d) => d.directorNm).join(', ') || '정보없음';
  document.getElementById('actorInfo').textContent =
    movie.actors?.actor?.map((a) => a.actorNm).join(', ') || '정보없음';
  document.getElementById('genreInfo').textContent = movie.genre || '정보없음';
  document.getElementById('yearInfo').textContent = movie.prodYear || '정보없음';
  document.getElementById('runtimeInfo').textContent = movie.runtime
    ? `${movie.runtime}분`
    : '정보없음';
  document.getElementById('ratingInfo').textContent = movie.rating || '정보없음';
  document.getElementById('companyInfo').textContent = movie.company || '정보없음';
  document.getElementById('plotInfo').textContent =
    movie.plots?.plot?.[0]?.plotText || '줄거리 정보가 없습니다.';

  const modal = new bootstrap.Modal(document.getElementById('movieDetailModal'));
  modal.show();
}

// 로딩 표시 함수
const showLoading = (show) => {
  $('#loadingSpinner').toggle(show);
}

// 채팅창 토글 함수
const toggleChat = () => {
  const chatWindow = document.querySelector('.chat-window');
  const chatButton = document.querySelector('.chat-button');

  if (chatWindow.style.display === 'none') {
    chatWindow.style.display = 'block';
    chatButton.style.display = 'none';
  } else {
    chatWindow.style.display = 'none';
    chatButton.style.display = 'flex';
  }
}
