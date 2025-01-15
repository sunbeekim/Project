// minireact/src/page/Board.js

const Board = () => {
  return (
    <div className="board-container">
      <h2 className="board-title">게시판</h2>
      <table className="table board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {/* Board content will go here */}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
