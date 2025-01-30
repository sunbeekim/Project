// 차트 모달 HTML 생성 및 추가
function createChartModal() {
    const modalHTML = `
        <div class="modal fade" id="chartModal" tabindex="-1">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <!-- 모달 내용 -->
                </div>
            </div>
        </div>
    `;

    const existingModal = document.getElementById('chartModal');
    if (existingModal) {
        existingModal.remove();
    }
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// 영화 분석 모달 표시
function showMovieAnalysis(selectedMovie, movies) {
    const averages = calculateAverages(movies);
    
    drawBoxOfficeChart(selectedMovie, movies);
    drawDailySalesChart(movies, averages);
    drawSalesChart(movies, averages);
    scrnCntChart(movies, selectedMovie);
    drawDistributionChart(movies, selectedMovie);
    testChart(movies);

    new bootstrap.Modal(document.getElementById('chartModal')).show();
} 