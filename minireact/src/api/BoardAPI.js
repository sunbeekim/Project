import axios from 'axios';

axios.defaults.withCredentials = true;

// 모든 게시물 조회
export const fetchAllBoards = async () => {
  try {
    const response = await axios.get('/api/board');
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch boards';
  }
};

// 특정 게시물 조회
export const fetchBoardById = async (id) => {
  try {
    const response = await axios.get(`/api/board/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || `Failed to fetch board with ID: ${id}`;
  }
};

// 게시물 추가
export const createBoard = async (boardData) => {
  try {
    const response = await axios.post('/api/board/add', boardData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to create board';
  }
};

// 게시물 수정
export const updateBoard = async (id, boardData) => {
  try {
    const response = await axios.put(`/api/board/${id}`, boardData);
    return response.data;
  } catch (error) {
    throw error.response?.data || `Failed to update board with ID: ${id}`;
  }
};

// 게시물 삭제
export const deleteBoard = async (id) => {
  try {
    const response = await axios.delete(`/api/board/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || `Failed to delete board with ID: ${id}`;
  }
};
