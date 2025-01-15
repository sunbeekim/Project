import axios from 'axios';

export const getAllPosts = async () => {
  try {
    const response = await axios.get('/api/boards');
    return response.data;
  } catch (error) {
    throw new Error('게시글 목록을 불러오는데 실패했습니다.');
  }
};

export const getPostById = async (id) => {
  try {
    const response = await axios.get(`/api/boards/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('게시글을 불러오는데 실패했습니다.');
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`/api/boards/${id}`, postData);
    return response.data;
  } catch (error) {
    throw new Error('게시글 수정에 실패했습니다.');
  }
};