import { Link } from 'react-router-dom';
import { LoginAPI } from '../api/UserAPI';
import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    console.log(name);
    console.log(value);
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await LoginAPI(formData);
      console.log(response.data);
      alert('로그인 성공!');
    } catch (err) {
      console.error(err);
      setError('로그인 실패: 아이디 또는 비밀번호를 확인해주세요.');
    }
  };
  return (
    <div>
      Login page
      <form onSubmit={handleLogin}>
        <div>
          <label>아이디</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="아이디를 입력하세요."
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요."
            required
          />
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default Login;
