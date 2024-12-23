// minireact/src/page/SignUp.js

import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    forename: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const fetchSignUp = async () => {
    try {
      const response = await axios.post("/api/users/signup", formData);
      console.log("서버 응답:", response.data);
      alert("회원가입이 완료되었습니다!");
    } catch (error) {
      console.error("Error during sign-up:", error.response?.data || error.message);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // ID 검사
    if (formData.user_id.trim() === "") {
      newErrors.user_id = "ID를 입력해주세요.";
    }

    // 이름 검사
    if (formData.forename.trim() === "") {
      newErrors.forename = "이름을 입력해주세요.";
    }

    // 이메일 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    // 비밀번호 검사
    if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    // 전화번호 검사
    if (formData.phone_number.trim() && formData.phone_number.length < 11) {
      newErrors.phone_number = "유효하지 않은 전화번호입니다.";
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
          <label htmlFor="user_id">ID</label>
          <input
            type="text"
            id="user_id"
            placeholder="ID를 입력하세요"
            value={formData.user_id}
            onChange={handleChange}
          />
          {errors.user_id && <small className="error-msg">{errors.user_id}</small>}
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
          <label htmlFor="phone_number">전화번호</label>
          <input
            type="text"
            id="phone_number"
            placeholder="- 없이 전화번호를 입력"
            value={formData.phone_number}
            onChange={handleChange}
          />
          {errors.phone_number && <small className="error-msg">{errors.phone_number}</small>}
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
