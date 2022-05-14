import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
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
        <NavBar isLogin={isLogin} isModal={isModal} userProfile={userProfile} loginModalToggle={loginModalToggle} />

        <Routes basename="https://joopjoop.xyz/">
          <Route path="/" element={<Home getLoginInfo={getLoginInfo} />}></Route>
          <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/search" element={<SearchCode />}></Route>
          <Route path="/invitation/create" element={<CreateInvitation userProfile={userProfile} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
