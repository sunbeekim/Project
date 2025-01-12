// minireact/src/page/SignUp.js

import React, { useState } from 'react';
import { IdCheckAPI, SingupAPI } from '../api/UserAPI';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    userId: '',
    forename: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [userIdCheck, setUserIdCheck] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const fetchSignUp = async () => {
    try {
      const response = await SingupAPI(formData);
      console.log('서버 응답:', response.data);
      alert('회원가입이 완료되었습니다!');
    } catch (error) {
      console.error('Error during sign-up:', error.response?.data || error.message);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleCheck = async () => {
    if (formData.userId.trim() === '') {
      alert('ID를 입력해주세요.');
      return; // userId가 비어 있으면 중단
    }
    try {
      const message = await IdCheckAPI(formData.userId); // API 호출
      alert(message.data); // 서버 응답 메시지를 표시
      setUserIdCheck(true);
    } catch (error) {
      console.error('ID CHECK', error);
      alert(`이미 존재하는 아이디 입니다.`); // 에러 메시지 표시
      setUserIdCheck(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // ID 검사
    if (formData.userId.trim() === '') {
      newErrors.userId = 'ID를 입력해주세요.';
    }
    if (userIdCheck === true && formData.userId.trim() !== '') {
      newErrors.userId = '중복확인을 해주세요.';
    }

    // 이름 검사
    if (formData.forename.trim() === '') {
      newErrors.forename = '이름을 입력해주세요.';
    }

    // 이메일 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    // 비밀번호 검사
    if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 전화번호 검사
    if (formData.phoneNumber.trim() && formData.phoneNumber.length < 11) {
      newErrors.phoneNumber = '유효하지 않은 전화번호입니다.';
    }

    if (Object.keys(newErrors).length === 0) {
      fetchSignUp();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="container mt-5">
      <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">회원가입</h2>

        {/* ID 입력 */}
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            ID
          </label>
          <div className="input-group">
            <input
              type="text"
              id="userId"
              className="form-control"
              placeholder="ID를 입력하세요"
              value={formData.userId}
              onChange={handleChange}
            />
            <button type="button" className="btn btn-outline-secondary" onClick={handleCheck}>
              중복확인
            </button>
          </div>
          {errors.userId && <small className="text-danger">{errors.userId}</small>}
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="비밀번호를 입력하세요"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>

        {/* 비밀번호 확인 */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            placeholder="비밀번호를 다시 입력하세요"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <small className="text-danger">{errors.confirmPassword}</small>
          )}
        </div>

        {/* 이름 입력 */}
        <div className="mb-3">
          <label htmlFor="forename" className="form-label">
            이름
          </label>
          <input
            type="text"
            id="forename"
            className="form-control"
            placeholder="이름을 입력하세요"
            value={formData.forename}
            onChange={handleChange}
          />
          {errors.forename && <small className="text-danger">{errors.forename}</small>}
        </div>

        {/* 전화번호 입력 */}
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            전화번호
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="form-control"
            placeholder="- 없이 전화번호를 입력"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
        </div>

        {/* 이메일 입력 */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            이메일
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="이메일을 입력하세요"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        {/* 회원가입 버튼 */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
