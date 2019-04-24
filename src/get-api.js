import API from "./api";

const apiConfig = {
  END_POINT: `https://es8-demo-srv.appspot.com/moowle`,
  AUTHORIZATION: `Basic abrakadaaabra`
};

const api = new API({
  endPoint: apiConfig.END_POINT,
  authorization: apiConfig.AUTHORIZATION
});

const getApi = () => api;

export default getApi;
