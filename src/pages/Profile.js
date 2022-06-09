import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../components/useUser';
import './Home.css';

const Profile = () => {
  const [resultCode, setResultCode] = useState(['']);

  const navigate = useNavigate();
  const { Kakao } = window;

  const { user, isLoading, isError } = useUser();

  const getProfile = async () => {
    // ToDo: 새로고침 시 user 업데이트 안됨. mutate로 갱신해줘야함
    try {
      const res = await axios.get(process.env.REACT_APP_DB_HOST + `/accounts/my-invitations/${user.id}`);
      const result = res.data;
      console.log(result);
      setResultCode(result);
    } catch (err) {
      console.log(err);
    }
  };

  const getLogout = () => {
    if (!Kakao.Auth.getAccessToken()) {
      alert('Not logged in.');
      return;
    }

    Kakao.Auth.logout(() => {
      alert('로그아웃 되었습니다.');
      navigate('/');
      navigate(0);
    });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="result-container">
      <div className="container">
        <div className="row align-items-center py-5">
          <div className="col text-start">
            <h5>안녕하세요 {user ? user.kakao_account.profile.nickname : ''} 님</h5>
            <p>
              마이 프로필에서 {user ? user.kakao_account.profile.nickname : ''} 님이 등록하신 서비스 목록과 사용횟수를
              확인하세요
            </p>
          </div>
          <div className="logout col text-end" role="button" onClick={getLogout}>
            <p>로그아웃</p>
          </div>
        </div>
        <div>
          <h5>등록하신 서비스</h5>
          {resultCode.map((item, index) => {
            return (
              <div className="result row" key={index}>
                <div className="col-auto logo-container">
                  <img className="logo" src={item.service_logo} alt={item.service_en}></img>
                </div>
                <div className="col name-container">
                  <span className="tag">{item.category}</span>
                  <h3 className="name">{item.service_kr}</h3>
                  <p className="desc">{item.desc}</p>
                </div>
                <div className="col copy-container">
                  {item.type === '초대 코드' ? (
                    <span className="copy-code">{item.invitation}</span>
                  ) : (
                    <span className="copy-link">
                      <a href={item.invitation} target="_blank" className="text-decoration-none">
                        초대링크로 이동하기&nbsp;
                        <span role="img" aria-label="hi">
                          👋
                        </span>
                      </a>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
