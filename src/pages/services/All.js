import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './All.css';

const All = () => {
  const [category, setCategory] = useState([]);
  const [allService, setAllService] = useState([]);

  // 페이지 이동 훅(기존 useHistory)
  const navigate = useNavigate();

  const getAllService = async () => {
    const res = await axios.get(process.env.REACT_APP_DB_HOST + '/invitation/all-services');

    setAllService(res.data);
    // category list
    const categories = res.data.map((item) => {
      return item.category;
    });
    const categorySet = new Set(categories);
    const uniqueCategories = [...categorySet];
    setCategory(uniqueCategories);

    console.log(res.data);
    console.log(uniqueCategories);
  };

  const searchService = (e, param) => {
    navigate(`/search?q=${param}`);
  };

  useEffect(() => {
    getAllService();
  }, []);

  return (
    <>
      <div className="service-all-container">
        <div className="row service-all-header">
          <h3 className="col text-start p-0 pb-2">
            <span role="img" aria-label="monocle">
              🧐
            </span>
            &nbsp;전체 서비스보기
          </h3>
          <div className="col text-end">
            <span className="tag" id="one">
              {category[0]}
            </span>
            <span className="tag" id="two">
              {category[1]}
            </span>
            <span className="tag" id="three">
              {category[2]}
            </span>
            <span className="tag" id="four">
              ...
            </span>
          </div>
        </div>
        <div className="text-start service-all">
          <div>
            {category.map((item, index) => {
              return (
                <div key={index} className="my-5">
                  <h4>{item}</h4>
                  <div className="row">
                    {allService.map((service, i) => {
                      if (service.category === item) {
                        return (
                          <div className="col-1" key={i}>
                            <div
                              className="service-box text-center pt-1 px-0"
                              onClick={(e) => searchService(e, service.service_kr)}
                            >
                              <img src={service.logo_img} width={40} height={40}></img>
                              <p className="mb-1 mt-1 service-name">{service.service_kr}</p>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default All;
