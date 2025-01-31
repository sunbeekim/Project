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
const loadBoxOfficeData = () => {
  $('#rankList').html('<div class="text-center">박스오피스 데이터 로딩 중...</div>'); // 로딩중 표시

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
const displayMovies = (movies) => {
  const rankList = $('#rankList');
  rankList.empty(); // 로딩중 표시 제거 데이터가 많으면 forEach가 끝나고 제거해야 할듯

  movies.forEach((movie) => {
    const card = createMovieCard(movie, movies);
    rankList.append(card);
  });
}

// 영화 카드 생성
const createMovieCard = (movie, movies) => { // "movie" 객체를 받아서 영화 카드를 생성하는 함수
  // JSON.stringify(movie)를 사용하여 movie 객체를 문자열로 변환
  // /"/g 는 모든 따옴표를 치환하는 정규식
  // &quot;로 변환하여 안전한 데이터로 만듬
  // html 속성값은 ""로 구분되어 지는데, 객체에 있는 ""가 구문오류를 발생시킬 수 있음
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
