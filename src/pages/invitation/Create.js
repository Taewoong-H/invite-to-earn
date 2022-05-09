import React, { useState } from 'react';
import axios from 'axios';

const CreateInvitation = ({ userProfile }) => {
  const [serviceName, setServiceName] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [invitationType, setInvitationType] = useState('');
  const [invitation, setInvitation] = useState('');
  const [desc, setDesc] = useState('');
  const clickCreateInvitation = async (e) => {
    const body = {
      user_kakao_id: userProfile.userId,
      service: serviceId[0],
      type: invitationType,
      invitation: invitation,
      desc: desc,
    };
    console.log(body);
    try {
      const res = await axios.post('/invitation/create', body);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const searchService = async (e) => {
    try {
      const res = await axios.get(`/invitation/search-service/${serviceName}`);
      const serviceIdArray = res.data.map((item) => {
        return item.id;
      });
      console.log(serviceIdArray);
      setServiceId(serviceIdArray);
    } catch (err) {
      console.log(err);
    }
  };
  const changeServiceName = (e) => {
    setServiceName(e.target.value);
  };
  const handleRadioChange = (e) => {
    setInvitationType(e.target.value);
  };
  const changeInvitation = (e) => {
    setInvitation(e.target.value);
  };
  const changeDesc = (e) => {
    setDesc(e.target.value);
  };
  return (
    <>
      <h2>링크 등록하기</h2>
      <div>
        <div className="service-search">
          <label>서비스검색</label>
          <input type="text" value={serviceName} onChange={changeServiceName}></input>
          <button onClick={searchService}>검색</button>
        </div>
        <div className="service">
          {serviceId
            ? serviceId.map((id) => {
                return <div>{id}</div>;
              })
            : ''}
        </div>
        <div className="invitation-type">
          <label>
            초대코드
            <input
              type="radio"
              value="초대 코드"
              checked={invitationType === '초대 코드'}
              onChange={handleRadioChange}
            ></input>
          </label>
          <label>
            초대링크
            <input
              type="radio"
              value="초대 링크"
              checked={invitationType === '초대 링크'}
              onChange={handleRadioChange}
            ></input>
          </label>
        </div>

        <label>{invitationType}</label>
        <input type="text" className="invitation" value={invitation} onChange={changeInvitation}></input>
        <label>설명</label>
        <input type="text" className="invitation" value={desc} onChange={changeDesc}></input>
      </div>

      <button type="button" onClick={clickCreateInvitation}>
        링크 등록하기
      </button>
    </>
  );
};

export default CreateInvitation;
