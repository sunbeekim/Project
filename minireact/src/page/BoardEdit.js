import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchBoardById, updateBoard } from '../api/BoardAPI';
import { useSession } from '../context/SessionContext';

const BoardEdit = () => {
  const [board, setBoard] = useState(null);
  const [content, setContent] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useSession();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const boardId = new URLSearchParams(location.search).get('id');
        if (boardId) {
          const data = await fetchBoardById(boardId);
          if (data.boardId !== userId) {
            alert('수정 권한이 없습니다.');
            navigate('/board');
            return;
          }
          setBoard(data);
          setContent(data.content);
        }
      } catch (error) {
        console.error('게시글 조회 실패:', error);
        alert('게시글을 불러오는데 실패했습니다.');
        navigate('/board');
      }
    };
    
    fetchBoard();
  }, [location, userId, navigate]);

  const handleUpdate = async () => {
    try {
      if (!content.trim()) {
        alert('내용을 입력해주세요.');
        return;
      }

      const updatedBoard = {
        ...board,
        content: content
      };

      await updateBoard(board.id, updatedBoard);
      alert('게시글이 수정되었습니다.');
      navigate(`/board-read?id=${board.id}`);
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  if (!board) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>게시글 수정</h1>
      <div className="mb-3">
        <label className="form-label">제목</label>
        <input
          type="text"
          className="form-control"
          value={board.title}
          disabled
        />
      </div>
      <div className="mb-3">
        <label className="form-label">내용</label>
        <textarea
          className="form-control"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="d-flex gap-2">
        <button 
          className="btn btn-primary" 
          onClick={handleUpdate}
        >
          확인
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate(-1)}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default BoardEdit;
    
