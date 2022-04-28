import React from 'react';
import axios from 'axios';

const CreateInvitation = () => {
  const clickCreateInvitation = async (e) => {
    const body = {
      user_kakao_id: 12345,
      service: 1,
      type: '초대 코드',
      invitation: 'testcode1234',
      desc: '회원가입시 5,000원 지급',
    };
    try {
      const res = await axios.post('/invitation/create', body);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h2>링크 등록하기</h2>
      <button type="button" onClick={clickCreateInvitation}>
        링크 등록하기
      </button>
    </>
  );
};

export default CreateInvitation;
