import React from 'react';
import kakaoLoginBtnImg from '../image/kakao_login_large_wide.png';
import { Link } from 'react-router-dom';

const LoginModal = ({ loginModalToggle }) => {
  const { Kakao } = window;

  const kakaoLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: `${process.env.REACT_APP_REDIRECT_URI}`,
    });
  };

  const modalClose = () => {
    loginModalToggle();
  };

  return (
    <>
      <div className="login-modal">
        <div className="login-modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                <strong>
                  <span className="deco">줍줍</span> 로그인하기
                </strong>{' '}
                👋
              </h5>
              {/* ToDo: 닫기버튼 활성화 */}
              <button type="button" className="btn-close" onClick={modalClose}></button>
            </div>
            <div className="modal-body">
              <p className="desc">
                내 초대 코드 등록을 위해서는 로그인이 필요해요. <br />
                로그인 후 다양한 서비스의 초대 코드를 등록하고 관리해보세요!
              </p>
              <div className="login-button" onClick={kakaoLogin}>
                <img className="kakao-login-button" src={kakaoLoginBtnImg} alt="카카오 로그인 버튼" width={320}></img>
              </div>
              <p className="s-desc">내 개인정보는 다른 유저들에게 전-혀 노출되지 않아요</p>
            </div>
            <div className="modal-footer">
              <Link to="/about">
                <div className="about-button" onClick={modalClose}>
                  서비스를 소개해드릴까요? <span className="deco">Click me!</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
