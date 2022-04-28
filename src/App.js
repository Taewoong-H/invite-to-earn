import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KakaoCallback from './auth/KakaoCallback';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SearchCode from './pages/SearchCode';
import CreateInvitation from './pages/invitation/Create';
import kakaoLoginBtnImg from './image/kakao_login_large_narrow.png';
import './App.css';

function App() {
  const { Kakao } = window;
  const kakaoLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: `${process.env.REACT_APP_REDIRECT_URI}`,
    });
  };
  return (
    <Router>
      <div className="App">
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/login"
              element={
                <a className="login-button" onClick={kakaoLogin}>
                  <img src={kakaoLoginBtnImg}></img>
                </a>
              }
            ></Route>
            <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/search" element={<SearchCode />}></Route>
            <Route path="/invitation/create" element={<CreateInvitation />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
