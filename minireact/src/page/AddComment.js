// AddComment.js
import React, { useState } from 'react';
import { addComment } from '../api/CommentAPI'; // 댓글 추가 API 호출 함수

const AddComment = ({ boardId }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment(boardId, comment);
      setComment('');
      alert('댓글이 추가되었습니다.');
    } catch (error) {
      console.error('댓글 추가 실패', error);
      alert('댓글 추가에 실패했습니다.');
    }
  };

  return (
    <div className="mt-4">
      <h5>댓글 작성</h5>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          className="form-control"
          rows="3"
          value={comment}
          onChange={handleCommentChange}
          placeholder="댓글을 작성해주세요"
        ></textarea>
        <button type="submit" className="btn btn-primary mt-2">
          댓글 추가
        </button>
      </form>
    </div>
  );
};

export default AddComment;
