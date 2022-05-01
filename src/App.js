import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KakaoCallback from './auth/KakaoCallback';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SearchCode from './pages/SearchCode';
import CreateInvitation from './pages/invitation/Create';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/search" element={<SearchCode />}></Route>
          <Route path="/invitation/create" element={<CreateInvitation />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
