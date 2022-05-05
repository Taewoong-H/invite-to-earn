import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import KakaoCallback from './auth/KakaoCallback';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SearchCode from './pages/SearchCode';
import CreateInvitation from './pages/invitation/Create';
import './App.css';

function App() {
  const [isModal, setIsModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const { Kakao } = window;

  const loginModalToggle = () => {
    setIsModal(!isModal);
  };

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      await Kakao.API.request({
        url: '/v2/user/me',
        success: function(response) {
          const userProfileData = {
            userId: response.id,
            userNickname: response.properties.nickname,
            userProfileImage: response.properties.profile_image,
          };
          setUserProfile(userProfileData);
        },
        fail: function(error) {},
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getLoginInfo = () => {
    Kakao.Auth.getStatusInfo(({ status }) => {
      if (status === 'connected') {
        setIsLogin(true);
        getProfile();
      } else {
        setIsLogin(false);
      }
    });
  };

  useEffect(() => {
    getLoginInfo();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* ToDo: nav바 컴포넌트로 따로 빼기 */}
        <nav className="navbar navbar-expand-md bg-white mt-2">
          <div className="container">
            <h2 className="navbar-brand my-0 py-2 logo">INVITE 2 EARN</h2>
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
        </nav>

        <Routes>
          <Route path="/" element={<Home getLoginInfo={getLoginInfo} />}></Route>
          <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/search" element={<SearchCode />}></Route>
          <Route path="/invitation/create" element={<CreateInvitation />}></Route>
        </Routes>
        {/* 로그인 모달창 */}
        {isModal && <LoginModal loginModalToggle={loginModalToggle}></LoginModal>}
      </div>
    </Router>
  );
}

export default App;
