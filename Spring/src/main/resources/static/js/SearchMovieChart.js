const processChartData = (movies) => {
  // 장르 데이터 처리
  const genreCount = {};
  movies.forEach((movie) => {
    const genres = movie.genre?.split(',') || [];
    genres.forEach((genre) => {
      const trimmedGenre = genre.trim();
      if (trimmedGenre) {
        genreCount[trimmedGenre] = (genreCount[trimmedGenre] || 0) + 1;
      }
    });
  });

  // 배우 출연 빈도
  const actorCount = {};
  movies.forEach((movie) => {
    movie.actors?.actor?.forEach((actor) => {
      const name = actor.actorNm.trim();
      if (name) {
        actorCount[name] = (actorCount[name] || 0) + 1;
      }
    });
  });

  // 감독별 작품 수
  const directorCount = {};
  movies.forEach((movie) => {
    movie.directors?.director?.forEach((dir) => {
      const name = dir.directorNm;
      if (name) {
        directorCount[name] = (directorCount[name] || 0) + 1;
      }
    });
  });

  // 상영시간 분포
  const runtimeRanges = {
    '10분 미만': 0,
    '30분 미만': 0,
    '60분 미만': 0,
    '90분 미만': 0,
    '90-120분': 0,
    '120-150분': 0,
    '150분 이상': 0
  };
  movies.forEach((movie) => {
    const runtime = parseInt(movie.runtime);
    if (runtime) {
      if (runtime < 10) runtimeRanges['10분 미만']++;
      else if (runtime < 30) runtimeRanges['30분 미만']++;
      else if (runtime < 60) runtimeRanges['60분 미만']++;
      else if (runtime < 90) runtimeRanges['90분 미만']++;
      else if (runtime < 120) runtimeRanges['90-120분']++;
      else if (runtime < 150) runtimeRanges['120-150분']++;
      else runtimeRanges['150분 이상']++;
    }
  });

  // 차트 그리기
  drawRuntimeChart(runtimeRanges);
  drawGenreHeatmap(movies);

  $('#chartContainer').show();
}

const drawGenreHeatmap = (movies) => {
  // 년도별 장르 카운트 데이터 준비
  const yearGenreCounts = {};
  const genres = new Set();
  const years = new Set();

  // 데이터 집계
  movies.forEach((movie) => {
    const year = movie.prodYear;
    if (!year) return;

    const movieGenres = movie.genre?.split(',') || [];
    movieGenres.forEach((genre) => {
      const genreTrim = genre.trim();
      if (!genreTrim) return;

      genres.add(genreTrim);
      years.add(year);

      yearGenreCounts[year] = yearGenreCounts[year] || {};
      yearGenreCounts[year][genreTrim] = (yearGenreCounts[year][genreTrim] || 0) + 1;
    });
  });

  // 데이터 배열 생성
  const yearArray = Array.from(years).sort();
  const genreArray = Array.from(genres).sort();

  // 구글 차트 데이터 테이블 생성
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn('string', 'Year');
  genreArray.forEach((genre) => {
    dataTable.addColumn('number', genre);
  });

  // 데이터 행 추가
  yearArray.forEach((year) => {
    const row = [year.toString()];
    genreArray.forEach((genre) => {
      row.push(yearGenreCounts[year]?.[genre] || 0);
    });
    dataTable.addRow(row);
  });

  // 차트 옵션 설정
  const options = {
    title: '년도별 장르 분포',
    allowHtml: true,
    cssClassNames: {
      headerCell: 'gradient-header',
      tableCell: 'gradient-cell'
    },
    width: '100%',
    height: 400
  };

  // CSS 스타일 동적 추가
  const style = document.createElement('style');
  style.textContent = `
        .gradient-cell {
            background-color: white;
            transition: background-color 0.3s;
        }
        .gradient-header {
            background-color: #f8f9fa;
            font-weight: bold;
        }
    `;
  document.head.appendChild(style);

  try {
    const chart = new google.visualization.Table(document.getElementById('genreHeatmap'));
    chart.draw(dataTable, options);

    // 셀 색상 동적 적용
    const container = document.getElementById('genreHeatmap');
    const cells = container.getElementsByTagName('td');
    Array.from(cells).forEach((cell) => {
      const value = parseInt(cell.textContent);
      if (!isNaN(value)) {
        const intensity = Math.min(value / 20, 1); // 최대값 조정 가능
        cell.style.backgroundColor = `rgba(244, 67, 54, ${intensity})`;
      }
    });
  } catch (error) {
    console.error('히트맵 차트 그리기 실패:', error);
  }
}

const drawRuntimeChart = (runtimeRanges) => {
  // 1초 지연 후 차트 그리기 컨테이너 준비되면 렌더링 되게 바꿔야 함
  setTimeout(() => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', '상영시간 구간');
    data.addColumn('number', '영화 수');

    Object.entries(runtimeRanges).forEach(([range, count]) => {
      data.addRow([range, count]);
    });

    const options = {
      title: '상영시간별 영화 수',
      backgroundColor: 'transparent',
      hAxis: {
        title: '영화 수',
        minValue: 0
      },
      vAxis: {
        title: '상영시간 구간'
      },
      chartArea: {
        width: '80%',
        height: '80%'
      },
      colors: ['#FF6B6B'],
      animation: {
        duration: 500,
        easing: 'out'
      }
    };

    try {
      const container = document.getElementById('runtimeChart');
      if (container.offsetParent !== null) {
        const chart = new google.visualization.BarChart(container);
        chart.draw(data, options);
      }
    } catch (error) {
      console.error('상영시간 차트 그리기 실패:', error);
    }
  }, 1000); // 1초 지연
}
