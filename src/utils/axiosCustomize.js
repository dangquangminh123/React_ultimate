import axios from "axios";
import { store } from "../redux/store";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

// Phần này sẽ thực hiện 1 hành động trước khi client gửi request về server
instance.interceptors.request.use(
  function (config) {
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = `Bearer ${access_token}`;
    NProgress.start();
    return config;
  },
  function (error) {
    // NProgress.start();
    return Promise.reject(error);
  }
);

// Còn phần này sẽ thực hiện 1 hành động trước khi server gửi response về client
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    return response && response.data ? response.data : response;
  },
  function (error) {
    NProgress.done();
    // Token expired
    if (error.response.data && error.response.data.EC === -999) {
      window.location.href = '/login'
    }
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
