import React from 'react';
import kakaoLoginBtnImg from '../image/kakao_login_large_narrow.png';

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
                카카오 로그인
              </h5>
              {/* ToDo: 닫기버튼 활성화 */}
              <button type="button" className="btn-close" onClick={modalClose}></button>
            </div>
            <div className="modal-body">우리는 익명이에요~</div>
            <div className="modal-footer">
              <div className="login-button" onClick={kakaoLogin}>
                <img src={kakaoLoginBtnImg} alt="카카오 로그인 버튼"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
