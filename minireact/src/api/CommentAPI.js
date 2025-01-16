import axios from 'axios';

const API_URL = 'http://localhost:8080/api/comments';  // 실제 API 서버 주소로 수정

// 댓글 추가 함수
export const addComment = async (boardId, commentContent) => {
  try {
    const response = await axios.post(`${API_URL}/add`, {
      boardId,
      content: commentContent
    });
    return response.data;
  } catch (error) {
    console.error('댓글 추가 실패:', error);
    throw error;
  }
};

// 댓글 조회 함수
export const getComments = async (boardId) => {
  try {
    const response = await axios.get(`${API_URL}/list/${boardId}`);
    return response.data;
  } catch (error) {
    console.error('댓글 조회 실패:', error);
    throw error;
  }
};
