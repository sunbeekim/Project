import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createBoard } from '../api/BoardAPI';
import { useSession } from '../context/SessionContext';

const BoardWriting = () => {
  const { userId, forename } = useSession();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async () => {
    try {
      if (!formData.title || !formData.content) {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
      }
      
      const boardData = {
        ...formData,
        boardId: userId,
        forename: forename
      };
      
      await createBoard(boardData);
      alert('게시글이 등록되었습니다.');
      navigate('/board');
    } catch (error) {
      console.error('게시글 등록 실패:', error);
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <div className="container mt-5">
      {userId ? (
        <div className="card">
          <div className="card-header">
            <h2>게시글 작성</h2>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">제목</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="제목을 입력하세요"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">내용</label>
              <textarea
                name="content"
                className="form-control"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="내용을 입력하세요"
                rows="10"
              />
            </div>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-primary" 
                onClick={handleRegister}
              >
                등록
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => navigate('/board')}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="alert alert-warning" role="alert">
            로그인이 필요한 서비스입니다.
          </div>
          <Link 
            to="/login" 
            className="btn btn-primary"
          >
            로그인 페이지로 이동
          </Link>
        </div>
      )}
    </div>
  );
};

export default BoardWriting;
