import React, { useEffect, useState } from 'react';
import { getComments } from '../api/CommentAPI';  // 수정: fetchComments -> getComments

const CommentList = ({ boardId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(boardId);  // getComments로 수정
        setComments(fetchedComments);
      } catch (error) {
        console.error('댓글 조회 실패');
      }
    };

    fetchComments();
  }, [boardId]);

  return (
    <div className="comment-list">
      <h4>댓글</h4>
      {comments.length > 0 ? (
        <ul className="list-group">
          {comments.map((comment) => (
            <li key={comment.id} className="list-group-item">
              {comment.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </div>
  );
};

export default CommentList;

