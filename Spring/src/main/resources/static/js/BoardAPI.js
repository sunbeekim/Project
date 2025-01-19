const BoardAPI = {
  // 게시글 목록 조회
  getAllBoards: () => {
    return $.ajax({
      url: '/api/board',
      method: 'GET'
    });
  },

  // 게시글 상세 조회
  getBoardById: (id) => {
    return $.ajax({
      url: `/api/board/${id}`,
      method: 'GET'
    });
  },

  // 게시글 작성
  createBoard: (formData) => {
    return $.ajax({
      url: '/api/board/add',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData)
    });
  },

  // 게시글 수정
  updateBoard: (id, formData) => {
    return $.ajax({
      url: `/api/board/${id}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(formData)
    });
  },

  // 게시글 삭제
  deleteBoard: (id) => {
    return $.ajax({
      url: `/api/board/${id}`,
      method: 'DELETE'
    });
  }
};
