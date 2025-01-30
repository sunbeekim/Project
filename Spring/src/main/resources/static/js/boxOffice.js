// 초기화
function initializeBoxOffice() {
  $(document).ready(() => {
    createChartModal();
    loadBoxOfficeData();
    google.charts.load('current', { packages: ['corechart'] });
  });
}

// 데이터 로드
function loadBoxOfficeData() {
  $('#rankList').html('<div class="text-center">박스오피스 데이터 로딩 중...</div>');

  MovieAPI.getBoxOffice()
    .then((response) => {
      const movies = response.boxOfficeResult.dailyBoxOfficeList;
      displayBoxOfficeMovies(movies);
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
function displayBoxOfficeMovies(movies) {
  const rankList = $('#rankList');
  rankList.empty();

  movies.forEach((movie) => {
    const card = createMovieCard(movie, movies);
    rankList.append(card);
  });
}
