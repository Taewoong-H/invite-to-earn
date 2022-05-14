import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultCode, setResultCode] = useState(['']);
  const location = useLocation();
  console.log(location);
  // 한글 인코딩 오류로 디코딩하기
  const queryString = decodeURI(location.search);
  const query = queryString.substring(3);
  console.log(query);
  const getServiceCode = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(process.env.REACT_APP_DB_HOST + `/invitation/search-invitation/${query}`);
      const result = res.data;
      console.log(result);
      setResultCode(result);
      if (res.status === 200) {
        setIsLoading(false);
      } else {
        // ToDo: 검색 에러 페이지
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getServiceCode();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div className="search-container">
          <div>{query}</div>
          <div className="result-container">
            <div className="container">
              <p>🙂 서비스의 등록되어 있는 초대코드 / 초대링크 중 랜덤으로 하나만 보여드려요!</p>
              <div>
                {resultCode.map((item) => {
                  return <div>{item.id}</div>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchCode;
