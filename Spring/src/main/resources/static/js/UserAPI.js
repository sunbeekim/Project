const UserAPI = {
    // 아이디 중복 체크
    checkId: (userId) => {
      return $.ajax({
        url: '/api/users/check-id',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ userId })
      });
    },
  
    // 회원가입
    signup: (formData) => {
      // formData 구조 맞추기
      const requestData = {
        userId: formData.userId,
        password: formData.password,
        forename: formData.forename,
        email: formData.email,
        phoneNumber: formData.phoneNumber.replace(/-/g, '') // 하이픈 제거
      };

      return $.ajax({
        url: '/api/users/signup',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestData)
      });
    },
  
    // 로그인
    login: (formData) => {
      return $.ajax({
        url: '/api/users/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData)
      });
    },

    // 로그아웃
    logout: () => {
      return $.ajax({
        url: '/api/users/logout',
        method: 'POST',
        contentType: 'application/json'
      });
    },

    // 세션 체크
    checkSession: () => {
      return $.ajax({
        url: '/api/users/check-session',
        method: 'GET',
        contentType: 'application/json'
      });
    }
  };