// minireact/src/page/Board.js
<<<<<<< HEAD
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

  function likePost(postId) {
    fetch(`/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: postId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById(`like-count-${postId}`).textContent = `${data.likeCount}`.textContent = data.likeCount;
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

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
                      <td className="text-center">
                      <button  onClick={() => likePost(board.id)} className="btn btn-sm ">
                      ❤️좋아요</button>
                      <span id={"like-count-${board.id}"}>{board.likeCount}</span>
                      </td>
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
=======
import React, { useState,useEffect } from 'react';
import axios from "axios";

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

   //게시글 목록을 서버에서 가져오는 함수
   useEffect(() => {//화면이 처음 나타날 때 한 번 실행
    async function fetchPosts() {
       try {
         const response = await axios.get('/api/posts');
         //axios.get으로 서버에 요청보내고 게시글 목록 가져옴
         setPosts(response.data);
         //서버에서 받은 데이터를 (posts)상태에 저장
       } catch (error) {
         console.error('게시글 목록 조회 중 오류 발생:', error);
         alert('게시글 목록을 가져오는 데 오류가 발생했습니다.');
       }
     }
     fetchPosts();
   }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 설정
  
  

   // 삭제할 게시글을 요청하는 함수
   const deletePost = async (postId) => {
    try {
      //서버에 삭제 요청을 보냄 (Axios 사용)
      const response = await axios.delete(`/api/posts/delete/${postId}`);
      
      if (response.status === 200) {
        //삭제 성공 시 해당 게시글을 리스트에서 제거
        setPosts(posts.filter(post => post.id !== postId));
        //삭제된 게시글을 제거하기 위해 filter메서드 사용
        alert('게시글이 성공적으로 삭제되었습니다.');
      } else {
        alert('게시글 삭제 실패');
      }
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

 //선택한 게시글을 조회하는 함수
 const selectPost = async (postId) => {//postId로 게시글 조회
  try {
    //서버에 선택 조회 요청을 보냄
    const response = await axios.get(`/api/posts/select/${postId}`);
    //postId가 123=> 요청 URL: /api/posts/select/123
    
    if (response.status === 200) {//요청 성공했는지..

      // 게시글 조회 성공 시 response.data를 상태로 설정
      setSelectedPost(response.data);
    } else {
      alert('게시글 조회 실패');
    }
  } catch (error) {//예외상횡
    console.error('선택 조회 중 오류 발생:', error);
    alert('게시글 조회 중 오류가 발생했습니다.');
  }
};


  return (
    <div>
      <div>Board</div>
       
       <ul>

        {posts.map((post) => (//map 메서드 사용해서 post배열 순회
          
          <li key={post.id}> 
            <div>
              {/* 게시글 제목 */}
             <h2>{post.title}</h2>
              {/* 게시글 내용용 */}
              <p>{post.content}</p>
              {/* 선택 버튼:SelectPost함수호출. 클릭 시 post.postId 값을 전달해 게시글 선택*/}
              <button onClick={() => selectPost(post.postId)}>선택</button>
              {/* 삭제 버튼:클릭 시 post.id 값을 전달해 선택한한 게시글 삭제 */}
              <button onClick={() => deletePost(post.id)}>삭제</button>
            </div>
          </li>
        ))}
      </ul>

      {/* 선택된 게시글 */}
      {selectedPost && (//null이 아니면 선택된 게시글의 제목과 내용을 표시
        <div>
          <h2>선택된 게시글</h2>
          {/* 선택된 게시글 제목 */}
          <p>Title: {selectedPost.title}</p>
          {/* 선택된 게시글 내용 */}
          <p>Content: {selectedPost.content}</p>
        </div>
      )}
>>>>>>> 56db5919a45fec8f390bb6326281522620f0d26b
    </div>
  );
};

export default Board;