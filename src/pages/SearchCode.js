import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  console.log(location);
  // 한글 인코딩 오류로 디코딩하기
  const queryString = decodeURI(location.search);
  const query = queryString.substring(3);
  console.log(query);
  const getServiceCode = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/invitation/search-invitation/${query}`);

      console.log(res);
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

  return <>{isLoading ? <div>로딩중</div> : query}</>;
};

export default SearchCode;
