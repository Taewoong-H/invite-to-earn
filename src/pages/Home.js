import React from 'react';

const Home = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-white absolute-top">
        <div className="container">
          <h2 className="navbar-brand">INVITE 2 EARN</h2>
          <div>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item text-center">
                <h5 className="px-2 fw-light">About</h5>
              </li>
              <li className="nav-item text-center">
                <h5 className="px-2 fw-light">Contact</h5>
              </li>
            </ul>
          </div>
          <div className="navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item text-center">
                <a className="text-decoration-none text-black">
                  <h5 className="fw-light">로그인</h5>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <body>
        <div className="container">
          <h2>링크 등록하고,</h2>
          <h2>필요한 링크 찾아가고</h2>
        </div>
      </body>
    </>
  );
};

export default Home;
