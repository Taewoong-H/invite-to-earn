import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = ({ getLoginInfo }) => {
  const [serviceName, setServiceName] = useState('');
  const [services, setServices] = useState(['', '', '', '', '']);

  // 페이지 이동 훅(기존 useHistory)
  const navigate = useNavigate();
  // 현재 위치 객체 반환(navigate props 가져옴)
  const location = useLocation();

  const changeSearch = (e) => {
    setServiceName(e.target.value);
  };

  const onSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${serviceName}`);
    }
  };

  const getAllService = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_DB_HOST + '/invitation/all-services');
      const sliceService = res.data.slice(0, 5);
      console.log(sliceService);
      setServices(sliceService);
    } catch (err) {
      console.log(err);
    }
  };

  const searchService = (e, param) => {
    console.log(e.target);
    navigate(`/search?q=${param}`);
  };

  useEffect(() => {
    //ToDo: 로그아웃 일 때는 state.isLogin = false이게끔
    if (location.state && location.state.isLogin) {
      console.log(location.state);
      getLoginInfo();
    }
    // 서비스 목록 불러오기
    getAllService();
  }, []);

  return (
    <>
      <div className="container">
        <div className="banner-container d-inline-block">
          <h1 className="banner text-start px-2">
            <span className="deco">링크 등록</span>하고, <br /> 필요한 <span className="deco">링크 찾아가고</span>
          </h1>
          <p className="banner-sm mt-4">
            필요한 링크를 검색해서 포인트를 얻어가거나 본인의 링크를 등록한 후<br />
            다른 유저를 초대하여 포인트 얻어가세요!
          </p>
          <div className="search-container mt-4" onKeyPress={onSearch}>
            <input
              type="text"
              className="search"
              value={serviceName}
              onChange={changeSearch}
              placeholder="찾으시는 서비스를 검색해주세요 :)"
            ></input>
            <i className="bi bi-search"></i>
          </div>
          <div className="container mt-5">
            <div className="row">
              {services
                ? services.map((item) => {
                    return (
                      <div
                        className="col service-box pt-1 px-0"
                        key={item.id}
                        onClick={(e) => searchService(e, item.service_kr)}
                      >
                        <img src={item.logo_img} width={30} height={30}></img>
                        <p className="mb-0 mt-1 service-name">{item.service_kr}</p>
                      </div>
                    );
                  })
                : ''}
              <div className="col service-box pt-1 px-0">
                <p className="mb-0 fs-5">🧐</p>
                <p className="mb-0 mt-1">전체보기</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
