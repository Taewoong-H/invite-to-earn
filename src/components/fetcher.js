const fetcher = (url) => {
  const { Kakao } = window;

  // Kakao SDK API를 이용해 사용자 정보 획득
  return Kakao.API.request({
    url: url,
    success: function(response) {
      return response;
    },
  }).then((res) => res);
};

export default fetcher;
