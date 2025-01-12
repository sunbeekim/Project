import axios from 'axios';

const springAPI = 'http://localhost:8080/api/users';

export const LoginAPI = async (formData) => {
  console.log(`${springAPI}/login`);
  try {
    const response = await axios.post(`${springAPI}/login`, formData);
    return response; // 성공 응답 반환
  } catch (error) {
    throw error; // 오류를 호출한 쪽에서 처리하도록 다시 던짐
  }
};

export const IdCheckAPI = async (userId) => {
  try {
    const response = await axios.get(`${springAPI}/check/${userId}`);
    return response; // 응답 데이터를 직접 반환
  } catch (error) {
    throw error.response?.data || 'ID check failed'; // 서버 응답이 있으면 반환
  }
};

export const SingupAPI = async (formData) => {
  try {
    const response = await axios.post(`${springAPI}/signup`, formData);
    return response; // 성공 응답 반환
  } catch (error) {
    throw error; // 오류를 호출한 쪽에서 처리하도록 다시 던짐
  }
};
