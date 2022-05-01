import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchCode = () => {
  const location = useLocation();
  console.log(location);
  // 한글 인코딩 오류로 디코딩하기
  const queryString = decodeURI(location.search);
  const query = queryString.substring(3);
  console.log(query);
  const getServiceCode = async () => {
    try {
      const res = await axios.get(`/invitation/search-invitation/${query}`);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getServiceCode();
  }, []);

  return <>{query}</>;
};

export default SearchCode;
