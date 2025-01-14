import axios from 'axios';

// 외부 API용 axios 인스턴스 생성
const externalAPI = axios.create({
  withCredentials: false
});

// API 관련 상수
const API_URL = 'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp';
const API_KEY = 'KZF0O6JP09Q6O216R86W';

// 영화 데이터 fetch 함수
export const fetchMoviesByDirector = async (nation, startYear, endYear) => {
  try {
    const response = await externalAPI.get(API_URL, {
      params: {
        ServiceKey: API_KEY,
        listCount: 500,
        nation: nation,
        startCount: 0,
        createDts: startYear || '',
        createDte: endYear || '',
        sort: 'prodYear,1',
        collection: 'kmdb_new2',
        detail: 'Y'
      }
    });
    return response.data.Data?.[0]?.Result || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
