// src/page/BoardWriting

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchBoardById, updateBoard, deleteBoard } from '../api/BoardAPI';
import { useSession } from '../context/SessionContext';

const BoardRead = () => {
  const [board, setBoard] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useSession();
  
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const boardId = new URLSearchParams(location.search).get('id');
        if (boardId) {
          const data = await fetchBoardById(boardId);
          const updatedBoard = {
            ...data,
            views: data.views + 1
          };
          await updateBoard(boardId, updatedBoard);
          setBoard(updatedBoard);
        }
      } catch (error) {
        console.error('게시글 조회 실패:', error);
        alert('게시글을 불러오는데 실패했습니다.');
      }
    };
    
    fetchBoard();
  }, [location]);

  const handleDelete = async () => {
    try {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        await deleteBoard(board.id);
        alert('게시글이 삭제되었습니다.');
        navigate('/board');
      }
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  if (!board) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-white py-3">
          <h2 className="mb-1">{board.title}</h2>
          <div className="text-muted small">
            <span className="me-3">
              <i className="fas fa-user me-1"></i>{board.forename}
            </span>
            <span className="me-3">
              <i className="far fa-calendar me-1"></i>
              {new Date(board.createAt).toLocaleString()}
            </span>
            <span>
              <i className="far fa-eye me-1"></i>{board.views}
            </span>
          </div>
        </div>
        <div className="card-body min-vh-50">
          <p className="card-text" style={{ whiteSpace: 'pre-wrap', minHeight: '200px' }}>
            {board.content}
          </p>
        </div>
        <div className="card-footer bg-white py-3">
          <div className="d-flex justify-content-between">
            <button 
              className="btn btn-outline-secondary" 
              onClick={() => navigate('/board')}
            >
              <i className="fas fa-list me-1"></i>목록으로
            </button>
            
            {userId === board.boardId && (
              <div>
                <button 
                  className="btn btn-outline-primary me-2" 
                  onClick={() => navigate(`/board-edit?id=${board.id}`)}
                >
                  <i className="fas fa-edit me-1"></i>수정
                </button>
                <button 
                  className="btn btn-outline-danger" 
                  onClick={handleDelete}
                >
                  <i className="fas fa-trash me-1"></i>삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardRead;
