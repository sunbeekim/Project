// minireact/src/page/Board.js
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchAllBoards } from '../api/BoardAPI';

const Board = () => {
  const [boards, setBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBoards, setFilteredBoards] = useState([]);
  const navigate = useNavigate();

  const loadBoards = async () => {
    try {
      const data = await fetchAllBoards();
      setBoards(data);
      setFilteredBoards(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  useEffect(() => {
    const filtered = boards.filter(board => 
      board.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBoards(filtered);
  }, [searchTerm, boards]);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-white py-3">
          <div className="row align-items-center mb-3">
            <div className="col">
              <h2 className="mb-0">Board</h2>
            </div>
            
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="제목으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 text-md-end mt-2 mt-md-0">
              <small className="text-muted">
                총 {filteredBoards.length}개의 게시글
              </small>
            </div>
          </div>
        </div>
        
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr className="bg-light">
                  <th scope="col" className="text-center" width="10%">번호</th>
                  <th scope="col" width="40%">제목</th>
                  <th scope="col" className="text-center" width="15%">작성자</th>
                  <th scope="col" className="text-center" width="25%">작성일</th>
                  <th scope="col" className="text-center" width="10%">조회수</th>
                </tr>
              </thead>
              <tbody>
                {filteredBoards.length > 0 ? (
                  filteredBoards.map((board) => (
                    <tr 
                      key={board.id} 
                      onClick={() => navigate(`/board-read?id=${board.id}`)}
                      style={{ cursor: 'pointer' }}
                      className="align-middle"
                    >
                      <td className="text-center">{board.id}</td>
                      <td>{board.title}</td>
                      <td className="text-center">{board.forename}</td>
                      <td className="text-center">{new Date(board.createAt).toLocaleString()}</td>
                      <td className="text-center">{board.views}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      {searchTerm ? '검색 결과가 없습니다.' : '게시글이 없습니다.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col text-end">
              <Link to="/board-writing">
                <button className="btn btn-sm btn-light fw-semibold text-secondary">
                  <i className="fas fa-pen me-1"></i>글쓰기
                </button>
              </Link>
            </div>
      </div>      
    </div>
  );
};

export default Board;
