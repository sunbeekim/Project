import React, { createContext, useContext, useState } from 'react';

// Context 생성
const SessionContext = createContext();

// Context를 제공하는 Provider 컴포넌트
export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [forename, setForename] = useState('');

  return (
    <SessionContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        forename,
        setForename
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// Context를 사용하는 커스텀 훅
export const useSession = () => {
  return useContext(SessionContext);
};
