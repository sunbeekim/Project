const MovieAPI = {
  // 일일 박스오피스 API 조회
  getBoxOffice: () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const targetDate = yesterday.toISOString().split('T')[0].replace(/-/g, '');

    return $.ajax({
      url: '/api/movie/boxoffice/daily',
      method: 'GET',
      data: {
        targetDt: targetDate
      }
    });
  },

  // 영화 검색 API
  searchMovies: (params) => {
    return $.ajax({
      url: '/api/movie/search',
      method: 'GET',
      data: params
    });
  }
};
