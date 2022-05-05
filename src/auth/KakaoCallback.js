import { useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
  const { Kakao } = window;
  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get('code');
  // 페이지 이동 훅(기존 useHistory)
  const navigate = useNavigate();

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_REST_API_KEY,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      code: code,
      // client_secret: process.env.REACT_APP_CLIENT_SECRET,
    });
    try {
      // access token 가져오기
      const res = await axios.post('https://kauth.kakao.com/oauth/token', payload);

      // access token 설정
      Kakao.Auth.setAccessToken(res.data.access_token);
      console.log(res.data);
      // 홈으로 이동, props 전달
      navigate('/', { state: { isLogin: true } }); //ToDo: 로그아웃 일 때는 state.isLogin = false이게끔
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return null;
};

export default KakaoCallback;
