import React from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

const NavBar = ({ isLogin, isModal, userProfile, loginModalToggle }) => {
  return (
    <nav className="navbar navbar-expand-md bg-white mt-2">
      <div className="container">
        <Link to="/" className="text-decoration-none">
          <h2 className="navbar-brand my-0 py-2 logo">INVITE 2 EARN</h2>
        </Link>
        <div>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item text-center">
              <h5 className="mx-2 my-0 py-2 fw-light">About</h5>
            </li>
            <li className="nav-item text-center">
              <h5 className="mx-2 my-0 py-2 fw-light">Contact</h5>
            </li>
          </ul>
        </div>
        <div className="navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item text-center">
              {isLogin ? (
                <div className="profile">
                  <div className="profile-image-container">
                    <img className="profile-image" src={userProfile.userProfileImage} alt="프로필 이미지"></img>
                  </div>
                  <p className="profile-nickname">{userProfile.userNickname}</p>
                </div>
              ) : (
                <h5 className="mx-2 my-0 py-2 fw-light login-button" onClick={loginModalToggle}>
                  로그인/회원가입
                </h5>
              )}
            </li>
            <li className="nav-item text-center">
              <Link to="/invitation/create">
                <div className="mx-2 my-0 py-2 link">링크 등록하기</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* 로그인 모달창 */}
      {isModal && <LoginModal loginModalToggle={loginModalToggle}></LoginModal>}
    </nav>
  );
};

export default NavBar;
