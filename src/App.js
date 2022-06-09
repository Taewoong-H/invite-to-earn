import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import KakaoCallback from './auth/KakaoCallback';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SearchCode from './pages/SearchCode';
import CreateInvitation from './pages/invitation/Create';
import All from './pages/services/All';
import useUser from './components/useUser';
import { useSWRConfig } from 'swr';
import './App.css';

function App() {
  const [isModal, setIsModal] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const { Kakao } = window;

  const { mutate } = useSWRConfig();
  const { user, isLoading, isError } = useUser();

  const loginModalToggle = () => {
    setIsModal(!isModal);
  };

  console.log(user);
  console.log(isLoading);
  console.log(isError);
  // const getProfile = async () => {

  //   try {
  //     // Kakao SDK API를 이용해 사용자 정보 획득
  //     await Kakao.API.request({
  //       url: '/v2/user/me',
  //       success: function(response) {
  //         const userProfileData = {
  //           userId: response.id,
  //           userNickname: response.properties.nickname,
  //           userProfileImage: response.properties.profile_image,
  //         };
  //         setUserProfile(userProfileData);
  //       },
  //       fail: function(error) {},
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getLoginInfo = () => {
  //   Kakao.Auth.getStatusInfo(({ status }) => {
  //     if (status === 'connected') {
  //       setIsLogin(true);
  //     } else {
  //       setIsLogin(false);
  //     }
  //   });
  // };

  useEffect(() => {
    Kakao.Auth.getStatusInfo(({ status }) => {
      if (status === 'connected') {
        mutate('/v2/user/me');
      } else {
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        {/* ToDo: nav바 app.js말고 home이나 각 컴포넌트에 넣기.. 로그인할때 제대로 정보 업데이트가 안됨 */}
        <NavBar isModal={isModal} userProfile={user} loginModalToggle={loginModalToggle} />

        <Routes basename="https://joopjoop.xyz/">
          <Route path="/" element={<Home />}></Route>
          <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/search" element={<SearchCode />}></Route>
          <Route path="/invitation/create" element={<CreateInvitation />}></Route>
          <Route path="/services/all" element={<All />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
