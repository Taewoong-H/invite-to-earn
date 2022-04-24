import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // 페이지 이동 훅(기존 useHistory)
  const navigate = useNavigate();

  const createInvitation = () => {
    navigate('/invitation/create');
  };

  return (
    <>
      <nav className="navbar navbar-expand-md bg-white mt-2">
        <div className="container">
          <h2 className="navbar-brand logo">INVITE 2 EARN</h2>
          <div>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item text-center">
                <h5 className="mx-2 fw-light">About</h5>
              </li>
              <li className="nav-item text-center">
                <h5 className="mx-2 fw-light">Contact</h5>
              </li>
            </ul>
          </div>
          <div className="navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item text-center">
                <a className="text-decoration-none text-black">
                  <h5 className="mx-2 fw-light">로그인</h5>
                </a>
              </li>
              <li className="nav-item text-center">
                <a className="text-decoration-none text-black" onClick={createInvitation}>
                  <span className="mx-2 link">링크 등록하기</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <body>
        <div className="container">
          <div className="banner-container d-inline-block">
            <h1 className="banner text-start px-2">
              <span className="deco">링크 등록</span>하고, <br /> 필요한 <span className="deco">링크 찾아가고</span>
            </h1>
            <p className="banner-sm mt-4">
              필요한 링크를 검색해서 포인트를 얻어가거나 본인의 링크를 등록한 후<br />
              다른 유저를 초대하여 포인트 얻어가세요!
            </p>
            <input type="text" className="search mt-4"></input>
          </div>
        </div>
      </body>
    </>
  );
};

export default Home;
