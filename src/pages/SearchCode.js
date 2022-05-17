import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchCode = () => {
  const location = useLocation();
  // 한글 인코딩 오류로 디코딩하기
  const queryString = decodeURI(location.search);
  const query = queryString.substring(3);

  const [isLoading, setIsLoading] = useState(false);
  const [resultCode, setResultCode] = useState(['']);
  const [searchService, setSearchService] = useState(query);

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

  const changeSearchService = (e) => {
    setSearchService(e.target.value);
  };

  useEffect(() => {
    getServiceCode();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div className="search-code-container">
          <div className="search-service-container">
            <div className="container">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="search-service"
                value={searchService}
                onChange={changeSearchService}
              ></input>
            </div>
          </div>
          <div className="result-container">
            <div className="container">
              <p className="desc">🙂 서비스의 등록되어 있는 초대코드 / 초대링크 중 랜덤으로 하나만 보여드려요!</p>
              {resultCode.map((item, index) => {
                return (
                  <div className="result row" key={index}>
                    <div className="col-auto logo-container">
                      <img className="logo" src={item.service_logo} alt={item.service_en}></img>
                    </div>
                    <div className="col name-container">
                      <span className="tag">구독 서비스</span>
                      <h3 className="name">{item.service_kr}</h3>
                      <p className="desc">{item.desc}</p>
                    </div>
                    <div className="col copy-container">
                      {item.type === '초대 코드' ? (
                        <span className="copy-code">초대코드 복사하기 👋</span>
                      ) : (
                        <span className="copy-link">초대링크로 이동하기 👋</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchCode;
