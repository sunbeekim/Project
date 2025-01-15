import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPostById, updatePost } from '../api/BoardAPI';

const BoardModify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [board, setBoard] = useState({
    title: '',
    content: '',
    forename: ''
  });

  const boardId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const data = await getPostById(boardId);
        setBoard(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (boardId) {
      fetchBoard();
    }
  }, [boardId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoard(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(boardId, board);
      alert('게시글이 수정되었습니다.');
      navigate(`/board-read?id=${boardId}`);
    } catch (error) {
      setError(error.message);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  if (loading) return <div className="text-center mt-5">로딩중...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">게시글 수정</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">제목</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={board.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">내용</label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                rows="10"
                value={board.content}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                수정완료
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BoardModify;