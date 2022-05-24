import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Create.css';

const CreateInvitation = ({ userProfile }) => {
  const navigate = useNavigate();

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
      const res = await axios.post(process.env.REACT_APP_DB_HOST + '/invitation/create', body);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const searchService = async (e) => {
    try {
      const res = await axios.get(process.env.REACT_APP_DB_HOST + `/invitation/search-service/${serviceName}`);
      const serviceIdArray = res.data.map((item) => {
        return item.id;
      });
      setServiceId(serviceIdArray);
    } catch (err) {
      console.log(err);
    }
  };
  const changeServiceName = (e) => {
    setServiceName(e.target.value);
  };

  const onServiceSearch = (e) => {
    if (e.key === 'Enter') {
      alert(serviceName);
    }
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

  useEffect(() => {
    console.log(userProfile);
    if (userProfile.constructor === Object && Object.keys(userProfile).length === 0) {
      // alert('로그인하셔야 링크등록이 가능합니다^^');
      // navigate('/');
    }
  });
  return (
    <div className="background">
      <div className="container">
        <div className="create-container d-inline-block text-start">
          <h5 className="desc">
            <strong>{userProfile.userNickname} 님</strong>의 서비스 초대코드 / 초대링크를 등록해주세요!
          </h5>

          <p className="service-search">
            <span role="img" aria-label="search">
              🔎
            </span>
            &nbsp;서비스 검색
          </p>
          <input
            type="text"
            className="service-search-input"
            value={serviceName}
            onChange={changeServiceName}
            onKeyPress={onServiceSearch}
            placeholder="서비스를 검색해주세요."
          ></input>
          {/* <div className="service-search">
            <button onClick={searchService}>검색</button>
          </div> */}

          <p className="invitation-type">
            <span role="img" aria-label="letter">
              💌
            </span>
            &nbsp;초대 유형
          </p>
          <div className="invitation-type-input">
            <input
              type="radio"
              value="초대 코드"
              id="invitation-code-check"
              checked={invitationType === '초대 코드'}
              onChange={handleRadioChange}
            ></input>
            <label htmlFor="invitation-code-check">
              <span>초대코드</span>
            </label>

            <input
              type="radio"
              value="초대 링크"
              id="invitation-link-check"
              checked={invitationType === '초대 링크'}
              onChange={handleRadioChange}
            ></input>
            <label htmlFor="invitation-link-check" className="mx-3">
              <span>초대링크</span>
            </label>
          </div>
          <p className="invitation-desc">
            <span role="img" aria-label="memo">
              📝
            </span>
            &nbsp;혜택 설명
          </p>
          <textarea className="invitation-desc-input" value={desc} onChange={changeDesc} rows="5" cols="100"></textarea>
        </div>
        <div>
          <div className="service">
            {serviceId
              ? serviceId.map((id) => {
                  return <div>{id}</div>;
                })
              : ''}
          </div>

          <label>{invitationType}</label>
          <input type="text" className="invitation" value={invitation} onChange={changeInvitation}></input>
          <label>설명</label>
        </div>

        <button type="button" onClick={clickCreateInvitation}>
          링크 등록하기
        </button>
      </div>
    </div>
  );
};

export default CreateInvitation;
