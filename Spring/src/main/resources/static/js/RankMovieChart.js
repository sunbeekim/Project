//========================================================================================================//

// 응답 필드	값	설명
// boxofficeType	문자열	박스오피스 종류를 출력합니다.
// showRange	문자열	박스오피스 조회 일자를 출력합니다.
// rnum	문자열	순번을 출력합니다.
// rank	문자열	해당일자의 박스오피스 순위를 출력합니다.
// rankInten	문자열	전일대비 순위의 증감분을 출력합니다.
// rankOldAndNew	문자열	랭킹에 신규진입여부를 출력합니다.
// “OLD” : 기존 , “NEW” : 신규
// movieCd	문자열	영화의 대표코드를 출력합니다.
// movieNm	문자열	영화명(국문)을 출력합니다.
// openDt	문자열	영화의 개봉일을 출력합니다.
// salesAmt	문자열	해당일의 매출액을 출력합니다.
// salesShare	문자열	해당일자 상영작의 매출총액 대비 해당 영화의 매출비율을 출력합니다.
// salesInten	문자열	전일 대비 매출액 증감분을 출력합니다.
// salesChange	문자열	전일 대비 매출액 증감 비율을 출력합니다.
// salesAcc	문자열	누적매출액을 출력합니다.
// audiCnt	문자열	해당일의 관객수를 출력합니다.
// audiInten	문자열	전일 대비 관객수 증감분을 출력합니다.
// audiChange	문자열	전일 대비 관객수 증감 비율을 출력합니다.
// audiAcc	문자열	누적관객수를 출력합니다.
// scrnCnt	문자열	해당일자에 상영한 스크린수를 출력합니다.
// showCnt	문자열	해당일자에 상영된 횟수를 출력합니다.

//========================================================================================================//
// 1. 차트 함수 정의 후 구글 차트 만들기
// 2. 모달에 차트 추가
// 3. body에 차트 추가
//========================================================================================================//
// 모달에 표시 할 차트 목록
const showMovieAnalysis = (selectedMovie, movies) => {
  const averages = calculateAverages(movies);

  // 1. 관객수 관련 차트
  drawBoxOfficeChart(selectedMovie, movies);

  // 2. 일일 매출 차트
  drawDailySalesChart(movies, averages);

  // 3. 누적매출 차트
  drawSalesChart(movies, averages);

  // 4. 스크린수 차트
  scrnCntChart(movies, selectedMovie);

  // 5. 1인당 매출 분석 차트
  drawDistributionChart(movies, selectedMovie);

  // 테스트 차트
  testChart(movies);

  // 모달 표시
  new bootstrap.Modal(document.getElementById('chartModal')).show();
};
//========================================================================================================//
// 평균 계산
const calculateAverages = (movies) => {
  return {
    // reduce 함수 사용 - 배열을 하나의 값으로 만들기
    // sum : 객체 movies를 reduce ((누적값(변수) , movie : 배열의 요소) => 누적값 + 배열의 요소), 0:누적초기값 ) = 배열 요소의 총합 / movies.length : 배열의 길이
    audiCnt: movies.reduce((sum, movie) => sum + parseInt(movie.audiCnt), 0) / movies.length, // 관객수 평균
    audiAcc: movies.reduce((sum, movie) => sum + parseInt(movie.audiAcc), 0) / movies.length, // 누적관객 평균
    salesAmt: movies.reduce((sum, movie) => sum + parseInt(movie.salesAmt), 0) / movies.length, // 매출액 평균
    salesAcc: movies.reduce((sum, movie) => sum + parseInt(movie.salesAcc), 0) / movies.length // 누적매출 평균
  };
};
//========================================================================================================//
// 공통 차트 옵션
const commonOptions = {
  height: 400,
  backgroundColor: 'transparent',
  animation: {
    startup: true,
    duration: 1000
  },
  legend: { position: 'none' },
  tooltip: { isHtml: true }
};
//========================================================================================================//
// 6. 테스트 차트 - 상영 횟수 차트
const testChart = (movies) => {
  const data = new google.visualization.DataTable();
  data.addColumn('string', '영화명');
  data.addColumn('number', '상영 횟수');

  movies.forEach((movie) => {
    data.addRow([movie.movieNm, parseInt(movie.showCnt)]);
  });

  const chart = new google.visualization.PieChart( // 빈 파이차트 객체 생성
    document.getElementById('testChart') // 차트를 표시할 HTML 요소 지정
  );
  chart.draw(data, {
    // 차트 그리기 data, 차트 옵션
    title: '상영 횟수 차트',
    height: 400
  });
};
//========================================================================================================//

// 1. 박스오피스 차트
const drawBoxOfficeChart = (selectedMovie, movies) => {
  // 1-1. Google Charts 데이터테이블 생성
  const data = new google.visualization.DataTable();
  // 1-2. 컬럼 정의
  data.addColumn('string', '순위');
  data.addColumn('number', '관객수');
  data.addColumn({ type: 'string', role: 'style' });
  data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });

  // 1-3. 데이터 추가
  movies.forEach((movie) => {
    const isSelected = movie.movieNm === selectedMovie.movieNm;
    const color = isSelected ? '#FF6B6B' : '#4DABF7';
    const tooltip = `
            <div style="padding:10px">
                <strong>${movie.movieNm}</strong><br>
                순위: ${movie.rank}위<br>
                관객수: ${Number(movie.audiCnt).toLocaleString()}명<br>
                매출액: ${Number(movie.salesAmt).toLocaleString()}원<br>
                점유율: ${movie.salesShare}%
            </div>
        `;
    data.addRow([movie.rank + '위', parseInt(movie.audiCnt), color, tooltip]);
  });

  // 차트 옵션 - 구글 차트 들어가서 참고
  const options = {
    ...commonOptions,
    title: '박스오피스 순위별 관객수'
  };

  // 1-4. 차트 그리기
  const chart = new google.visualization.ColumnChart(document.getElementById('boxOfficeChart'));
  chart.draw(data, options);
};

//========================================================================================================//
// 2. 관객 1인당 매출 차트 그리기
const drawDistributionChart = (movies, selectedMovie) => {
  const data = new google.visualization.DataTable();
  data.addColumn('string', '영화명');
  data.addColumn('number', '관객 1인당 매출 (원)');
  data.addColumn({ type: 'string', role: 'style' });
  data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });

  // 관객 1인당 매출액으로 정렬
  const sortedMovies = [...movies].sort((a, b) => {
    const aPerCustomer = parseInt(a.salesAcc) / parseInt(a.audiAcc);
    const bPerCustomer = parseInt(b.salesAcc) / parseInt(b.audiAcc);
    return bPerCustomer - aPerCustomer;
  });

  sortedMovies.forEach((movie) => {
    const isSelected = movie.movieNm === selectedMovie.movieNm;
    const color = isSelected ? '#FF6B6B' : '#4DABF7';
    const perCustomer = parseInt(movie.salesAcc) / parseInt(movie.audiAcc);
    const tooltip = `
                    <div style="padding:10px">
                        <strong>${movie.movieNm}</strong><br>
                        순위: ${movie.rank}위<br>
                        관객 1인당 매출: ${Math.round(perCustomer).toLocaleString()}원<br>
                        누적관객: ${Number(movie.audiAcc).toLocaleString()}명<br>
                        누적매출: ${Number(movie.salesAcc).toLocaleString()}원
                    </div>
                `;
    data.addRow([movie.movieNm, perCustomer, color, tooltip]);
  });

  const options = {
    ...commonOptions,
    title: '관객 1인당 매출 분석'
  };

  const chart = new google.visualization.ColumnChart(document.getElementById('distributionChart'));
  chart.draw(data, options);
};
//========================================================================================================//
// 3. 누적매출 차트 그리기
const drawSalesChart = (movies, averages) => {
  const data = new google.visualization.DataTable();
  data.addColumn('string', '순위');
  data.addColumn('number', '누적매출');
  data.addColumn({ type: 'string', role: 'style' });
  data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
  data.addColumn('number', '평균');
  data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });

  movies.forEach((movie) => {
    const tooltip = `
                    <div style="padding:10px">
                        <strong>${movie.movieNm}</strong><br>
                        순위: ${movie.rank}위<br>
                        누적매출: ${Number(movie.salesAcc).toLocaleString()}원<br>
                        평균대비: ${Math.round(
                          (parseInt(movie.salesAcc) / averages.salesAcc) * 100
                        )}%
                    </div>
                `;
    const avgTooltip = `
                    <div style="padding:10px">
                        <strong>전체 평균</strong><br>
                        ${Number(averages.salesAcc).toLocaleString()}원
                    </div>
                `;

    data.addRow([
      movie.rank + '위',
      parseInt(movie.salesAcc),
      parseInt(movie.salesAcc) > averages.salesAcc ? '#FF6B6B' : '#4DABF7',
      tooltip,
      averages.salesAcc,
      avgTooltip
    ]);
  });

  const options = {
    ...commonOptions,
    title: '순위별 누적매출 분포'
  };

  const chart = new google.visualization.ComboChart(document.getElementById('salesChart'));
  chart.draw(data, options);
};
//========================================================================================================//
// 4. 스크린 수 차트를 그리는 함수 정의 (화살표 함수 사용)
const scrnCntChart = (movies, selectedMovie) => {
  // 4-1. Google Chart 데이터 테이블 객체 생성
  const data = new google.visualization.DataTable();
  // 4-2. 차트에 표시할 열(column) 정의
  data.addColumn('string', '영화명'); // X축: 영화 제목
  data.addColumn('number', '스크린 수'); // Y축: 스크린 수
  data.addColumn({ type: 'string', role: 'style' }); // 막대 스타일(색상)
  data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } }); // HTML 툴팁

  // 4-3. 스크린 수 기준으로 내림차순 정렬 ([...movies]로 원본 배열 복사 후 정렬)
  const sortedMovies = [...movies].sort((a, b) => b.scrnCnt - a.scrnCnt);
  // 4-5. 정렬된 영화 목록을 순회하며 차트 데이터 추가
  sortedMovies.forEach((movie) => {
    // 4-6. 현재 선택된 영화인지 확인
    const isSelected = movie.movieNm === selectedMovie.movieNm;
    // 4-7. 선택된 영화는 빨간색, 나머지는 파란색으로 표시
    const color = isSelected ? '#FF6B6B' : '#4DABF7';
    // 4-8. HTML 툴팁 내용 정의
    const tooltip = `
            <div style="padding:10px">
                <strong>${movie.movieNm}</strong><br>
                순위: ${movie.rank}위<br>
                스크린 수: ${Number(movie.scrnCnt).toLocaleString()}개<br>
                일일 매출: ${Number(movie.salesAmt).toLocaleString()}원
            </div>
        `;
    // 4-9. 차트 데이터 행 추가
    data.addRow([movie.movieNm, parseInt(movie.scrnCnt), color, tooltip]);
  });

  // 4-10. 차트 옵션 설정
  const options = {
    ...commonOptions,
    title: '스크린 수 분석'
  };

  // 4-11. ColumnChart(막대 차트) 객체 생성 및 차트 그리기
  const chart = new google.visualization.ColumnChart(
    document.getElementById('scrnCntChart') // 차트를 표시할 HTML 요소 지정
  );
  chart.draw(data, options); // 설정된 데이터와 옵션으로 차트 그리기
};
//========================================================================================================//
// 5. 일일 매출 차트 그리기
const drawDailySalesChart = (movies, averages) => {
  const data = new google.visualization.DataTable();
  data.addColumn('string', '순위');
  data.addColumn('number', '일일 매출');
  data.addColumn({ type: 'string', role: 'style' });
  data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
  data.addColumn('number', '평균');
  data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });

  movies.forEach((movie) => {
    const tooltip = `
            <div style="padding:10px">
                <strong>${movie.movieNm}</strong><br>
                순위: ${movie.rank}위<br>
                일일 매출: ${Number(movie.salesAmt).toLocaleString()}원<br>
                평균대비: ${Math.round((parseInt(movie.salesAmt) / averages.salesAmt) * 100)}%
            </div>
        `;
    const avgTooltip = `
            <div style="padding:10px">
                <strong>전체 평균</strong><br>
                ${Number(averages.salesAmt).toLocaleString()}원
            </div>
        `;

    data.addRow([
      movie.rank + '위',
      parseInt(movie.salesAmt),
      parseInt(movie.salesAmt) > averages.salesAmt ? '#FF6B6B' : '#4DABF7',
      tooltip,
      averages.salesAmt,
      avgTooltip
    ]);
  });

  const options = {
    ...commonOptions,
    title: '순위별 일일 매출 분포'
  };

  const chart = new google.visualization.ComboChart(document.getElementById('dailySalesChart'));
  chart.draw(data, options);
};
