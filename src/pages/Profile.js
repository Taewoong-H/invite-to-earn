import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Home.css';

const Profile = ({ userProfile }) => {
  const [resultCode, setResultCode] = useState(['']);

  // ToDo: SWR을 이용해 전역 상태값으로 관리하기(새로고침시 userProfile을 못불러옴)
  const getProfile = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_DB_HOST + `/accounts/my-invitations/${userProfile.userId}`);
      const result = res.data;
      console.log(result);
      setResultCode(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="result-container">
      <div className="container">
        <div className="row align-items-center py-5">
          <div className="col text-start">
            <h5>안녕하세요 {userProfile.userNickname} 님</h5>
            <p>마이 프로필에서 {userProfile.userNickname} 님이 등록하신 서비스 목록과 사용횟수를 확인하세요</p>
          </div>
          <div className="col text-end">
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
