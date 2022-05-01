import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import './Home.css';

const Home = () => {
  const [service, setService] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const { Kakao } = window;
  // 페이지 이동 훅(기존 useHistory)
  const navigate = useNavigate();

  const createInvitation = () => {
    navigate('/invitation/create');
  };

  const changeSearch = (e) => {
    setService(e.target.value);
  };

  const onSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${service}`);
    }
  };

  const loginModalToggle = () => {
    setIsModal(!isModal);
  };

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      await Kakao.API.request({
        url: '/v2/user/me',
        success: function(response) {
          console.log(response);
          // 사용자 정보 변수에 저장
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

  useEffect(() => {
    Kakao.Auth.getStatusInfo(({ status }) => {
      if (status === 'connected') {
        setIsLogin(true);
        getProfile();
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  return (
    <>
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
                <div className="mx-2 my-0 py-2 link" onClick={createInvitation}>
                  링크 등록하기
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

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
              value={service}
              onChange={changeSearch}
              placeholder="찾으시는 서비스를 검색해주세요 :)"
            ></input>
            <i className="bi bi-search"></i>
          </div>
        </div>
      </div>

      {/* 로그인 모달창 */}
      {isModal && <LoginModal loginModalToggle={loginModalToggle}></LoginModal>}
    </>
  );
};

export default Home;
