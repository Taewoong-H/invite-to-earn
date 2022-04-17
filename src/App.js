import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KakaoCallback from './auth/KakaoCallback';
import Home from './pages/Home';
import Profile from './pages/Profile';
import TestSearch from './pages/TestSearch';
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
            <Route path="/test" element={<TestSearch />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
