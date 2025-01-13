import axios from 'axios';

axios.defaults.withCredentials = true;

// 로그인
export const LoginAPI = async (formData) => {
  try {
    const response = await axios.post('/api/users/login', formData);
    return response;
  } catch (error) {
    throw error;
  }
};

// 로그아웃
export const LogoutAPI = async () => {
  try {
    const response = await axios.post('/api/users/logout');
    return response;
  } catch (error) {
    throw error;
  }
};

// 중복아이디 체크
export const IdCheckAPI = async (userId) => {
  try {
    const response = await axios.get(`/api/users/check/${userId}`);
    return response;
  } catch (error) {
    throw error.response?.data || 'ID check failed';
  }
};

// 회원가입
export const SingupAPI = async (formData) => {
  try {
    const response = await axios.post('/api/users/signup', formData);
    return response;
  } catch (error) {
    throw error;
  }
};

// 세션 검증
export const CheckSessionAPI = async () => {
  try {
    const response = await axios.get('/api/users/check-session');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { loggedIn: false };
    }
    throw error;
  }
};