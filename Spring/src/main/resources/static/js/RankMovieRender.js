// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  // Google Charts 초기화
  google.charts.load('current', {
    packages: ['corechart']
  });

  // 차트 로드 완료 후 콜백
  google.charts.setOnLoadCallback(() => {
    console.log('Google Charts loaded');
    loadBoxOfficeData();
  });
});

// 박스오피스 데이터 로드
function loadBoxOfficeData() {
  $('#rankList').html('<div class="text-center">박스오피스 데이터 로딩 중...</div>');

  MovieAPI.getBoxOffice()
    .then((response) => {
      const movies = response.boxOfficeResult.dailyBoxOfficeList;
      displayMovies(movies);
      console.log(movies);
    })
    .catch((error) => {
      console.error('박스오피스 데이터 로드 실패:', error);
      $('#rankList').html(
        '<div class="text-center text-danger">데이터를 불러오는데 실패했습니다.</div>'
      );
    });
}

// 영화 카드 표시
function displayMovies(movies) {
  const rankList = $('#rankList');
  rankList.empty();

  movies.forEach((movie) => {
    const card = createMovieCard(movie, movies);
    rankList.append(card);
  });
}

// 영화 카드 생성
function createMovieCard(movie, movies) {
  return ` 
        <div class="col-md-4 col-lg-3"> 
            <div class="card h-100" style="cursor: pointer" onclick="showMovieAnalysis(${JSON.stringify(
              movie
            ).replace(/"/g, '&quot;')}, ${JSON.stringify(movies).replace(/"/g, '&quot;')})">
                <div class="d-flex justify-content-between align-items-center p-2">
                    <span class="badge text-dark bg-secondary-subtle">${movie.rank}위</span>
                    <span class="badge text-dark bg-secondary-subtle">차트보기</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${movie.movieNm}</h5>
                    <p class="card-text">
                        관객수: ${Number(movie.audiCnt).toLocaleString()}명<br>
                        누적관객: ${Number(movie.audiAcc).toLocaleString()}명<br>
                        매출액: ${Number(movie.salesAmt).toLocaleString()}원<br>
                        누적매출: ${Number(movie.salesAcc).toLocaleString()}원
                    </p>
                </div>
            </div>
        </div>
    `;
}
