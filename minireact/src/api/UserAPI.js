import axios from 'axios';

const springAPI = 'http://localhost:8080/api/users';
axios.defaults.withCredentials = true;
// 로그인
export const LoginAPI = async (formData) => {
  console.log(`${springAPI}/login`);
  try {
    const response = await axios.post(`${springAPI}/login`, formData);
    return response; // 성공 응답 반환
  } catch (error) {
    throw error; // 오류를 호출한 쪽에서 처리하도록 다시 던짐
  }
};
// 로그아웃
export const LogoutAPI = async () => {
  console.log(`${springAPI}/logout`);
  try {
    const response = await axios.post(`${springAPI}/logout`);
    return response; // 성공 응답 반환
  } catch (error) {
    throw error; // 오류를 호출한 쪽에서 처리하도록 다시 던짐
  }
};
// 중복아이디 체크
export const IdCheckAPI = async (userId) => {
  try {
    const response = await axios.get(`${springAPI}/check/${userId}`);
    return response; // 응답 데이터를 직접 반환
  } catch (error) {
    throw error.response?.data || 'ID check failed'; // 서버 응답이 있으면 반환
  }
};
// 회원가입
export const SingupAPI = async (formData) => {
  try {
    const response = await axios.post(`${springAPI}/signup`, formData);
    return response; // 성공 응답 반환
  } catch (error) {
    throw error; // 오류를 호출한 쪽에서 처리하도록 다시 던짐
  }
};

// 세션 검증
export const CheckSessionAPI = async () => {
  console.log('세션 검증');
  try {
    const response = await axios.get(`${springAPI}/check-session`);
    return response.data; // 세션 정보 반환
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { loggedIn: false }; // 세션이 없거나 만료된 경우
    }
    throw error; // 기타 오류 처리
  }
};
