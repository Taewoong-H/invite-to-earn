import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import createLinkButton from '../image/링크 등록 버튼.png';

const SearchCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const onSearchService = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${searchService}`);
      //링크 이동 후 리로드
      navigate(0);
    }
  };

  const doCopy = (code) => {
    const textarea = document.createElement('textarea');
    textarea.value = code;
    textarea.style.display = 'hidden';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert(`초대코드가 복사되었습니다.\n${code}`);
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
            <div className="container" onKeyPress={onSearchService}>
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
              <p className="desc">
                <span role="img" aria-label="happy">
                  🙂
                </span>
                &nbsp;서비스의 등록되어 있는 초대코드 / 초대링크 중 랜덤으로 하나만 보여드려요!
              </p>
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
                        <span className="copy-code" onClick={() => doCopy(item.invitation)}>
                          초대코드 복사하기&nbsp;
                          <span role="img" aria-label="hi">
                            👋
                          </span>
                        </span>
                      ) : (
                        <span className="copy-link">
                          <a href={item.invitation} target="_blank" className="text-decoration-none">
                            초대링크로 이동하기&nbsp;
                            <span role="img" aria-label="hi">
                              👋
                            </span>
                          </a>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              <Link to="/invitation/create">
                <img className="create-link-button" src={createLinkButton} width={320} alt="create-link-button"></img>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchCode;
