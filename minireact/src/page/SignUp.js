// minireact/src/page/SignUp.js

import React, { useState } from 'react';
import { IdCheckAPI, SingupAPI } from '../api/UserAPI';

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
    <div>
      <form onSubmit={handleSubmit}>
        <h2>회원가입</h2>

        <div>
          <label htmlFor="userId">ID</label>
          <input
            type="text"
            id="userId"
            placeholder="ID를 입력하세요"
            value={formData.userId}
            onChange={handleChange}
          />
          <button onClick={handleCheck}>중복확인</button>
          {errors.userId && <small className="error-msg">{errors.userId}</small>}
        </div>

        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <small className="error-msg">{errors.password}</small>}
        </div>

        <div>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="비밀번호를 다시 입력하세요"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <small>{errors.confirmPassword}</small>}
        </div>

        <div>
          <label htmlFor="forename">이름</label>
          <input
            type="text"
            id="forename"
            placeholder="이름을 입력하세요"
            value={formData.forename}
            onChange={handleChange}
          />
          {errors.forename && <small className="error-msg">{errors.forename}</small>}
        </div>

        <div>
          <label htmlFor="phoneNumber">전화번호</label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="- 없이 전화번호를 입력"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <small className="error-msg">{errors.phoneNumber}</small>}
        </div>

        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="error-msg">{errors.email}</small>}
        </div>

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
