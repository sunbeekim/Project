const CommentAPI = {
    // 댓글 목록 조회
    getComments: (boardId) => {
        return $.ajax({
            url: `/api/comments/${boardId}`,
            method: 'GET'
        });
    },

    // 댓글 작성
    createComment: (commentData) => {
        return $.ajax({
            url: '/api/comments',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(commentData)
        });
    },

    // 댓글 수정
    updateComment: (commentId, commentData) => {
        return $.ajax({
            url: `/api/comments/${commentId}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(commentData)
        });
    },

    // 댓글 삭제
    deleteComment: (commentId) => {
        return $.ajax({
            url: `/api/comments/${commentId}`,
            method: 'DELETE'
        });
    },

    // 대댓글 작성
    createReply: (commentData) => {
        return $.ajax({
            url: '/api/comments/reply',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(commentData)
        });
    }
};
