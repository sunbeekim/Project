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

function processChartData(movies) {
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

// 검색 처리 함수
async function handleSearch() {
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
function displayMovies(movies, response) {
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
        const directorNames = movie.directors?.director?.map((dir) => dir.directorNm).join(', ') || '정보 없음';
        
        const movieCard = `
            <div class="col">
                <div class="card h-100" onclick="showMovieDetail(${JSON.stringify(movie).replace(/"/g, '&quot;')})" style="cursor: pointer">
                    ${imageUrl 
                        ? `<img src="${imageUrl}" class="card-img-top" alt="${movie.title || '영화'}" style="height: 300px; object-fit: cover">`
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
function showMovieDetail(movie) {
    document.getElementById('movieDetailTitle').textContent = movie.title;

    const posterContainer = document.getElementById('posterContainer');
    if (movie.posters) {
        const posterUrl = movie.posters.split('|')[0];
        posterContainer.innerHTML = `<img src="${posterUrl}" alt="${movie.title}" class="img-fluid rounded shadow">`;
    } else {
        posterContainer.innerHTML = `<div class="bg-light p-5 text-center rounded"><span class="text-muted">이미지가 없습니다</span></div>`;
    }

    document.getElementById('directorInfo').textContent = movie.directors?.director?.map((d) => d.directorNm).join(', ') || '정보없음';
    document.getElementById('actorInfo').textContent = movie.actors?.actor?.map((a) => a.actorNm).join(', ') || '정보없음';
    document.getElementById('genreInfo').textContent = movie.genre || '정보없음';
    document.getElementById('yearInfo').textContent = movie.prodYear || '정보없음';
    document.getElementById('runtimeInfo').textContent = movie.runtime ? `${movie.runtime}분` : '정보없음';
    document.getElementById('ratingInfo').textContent = movie.rating || '정보없음';
    document.getElementById('companyInfo').textContent = movie.company || '정보없음';
    document.getElementById('plotInfo').textContent = movie.plots?.plot?.[0]?.plotText || '줄거리 정보가 없습니다.';

    const modal = new bootstrap.Modal(document.getElementById('movieDetailModal'));
    modal.show();
}

// 로딩 표시 함수
function showLoading(show) {
    $('#loadingSpinner').toggle(show);
}

// 채팅창 토글 함수
function toggleChat() {
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

function drawGenreHeatmap(movies) {
    // 년도별 장르 카운트 데이터 준비
    const yearGenreCounts = {};
    const genres = new Set();
    const years = new Set();

    // 데이터 집계
    movies.forEach(movie => {
        const year = movie.prodYear;
        if (!year) return;

        const movieGenres = movie.genre?.split(',') || [];
        movieGenres.forEach(genre => {
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
    genreArray.forEach(genre => {
        dataTable.addColumn('number', genre);
    });

    // 데이터 행 추가
    yearArray.forEach(year => {
        const row = [year.toString()];
        genreArray.forEach(genre => {
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
        Array.from(cells).forEach(cell => {
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

function drawRuntimeChart(runtimeRanges) {
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
