import { Link, useNavigate } from 'react-router-dom';
import { LoginAPI } from '../api/UserAPI';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const navigate = useNavigate();
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
      console.log("response.data", response.data);
      alert('로그인 성공!');     
        
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('로그인 실패: 아이디 또는 비밀번호를 확인해주세요.');
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Login Page</h3>
              <form onSubmit={handleLogin}>
                {/* 아이디 입력 */}
                <div className="mb-3">
                  <label htmlFor="userId" className="form-label">
                    아이디
                  </label>
                  <input
                    type="text"
                    id="userId"
                    name="userId"
                    className="form-control"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="아이디를 입력하세요."
                    required
                  />
                </div>

                {/* 비밀번호 입력 */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력하세요."
                    required
                  />
                </div>

                {/* 로그인 버튼 */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    로그인
                  </button>
                </div>
              </form>

              {/* 에러 메시지 */}
              {error && <p className="text-danger mt-3">{error}</p>}

              {/* 회원가입 링크 */}
              <div className="text-center mt-3">
                <Link to="/signup" className="text-decoration-none">
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
