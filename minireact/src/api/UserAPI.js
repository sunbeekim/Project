import axios from 'axios';

const springAPI = 'http://localhost:8080/api';

export const LoginAPI = async (formData) => {
  try {
    const response = await axios.post(`${springAPI}/login`, formData);
    return response; // 성공 응답 반환
  } catch (error) {
    throw error; // 오류를 호출한 쪽에서 처리하도록 다시 던짐
  }
};

export const SingupAPI = async () => {
  const response = await axios.put(springAPI, '/singup');
};
