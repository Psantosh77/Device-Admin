import api from "./api";

const setAuthToken = (token) => {
  if (token) {
    const getToken = localStorage.getItem("accessToken");
    // Where you would set stuff like your 'Authorization' header, etc ...
    api.defaults.headers.common["Authorization"] = getToken;
    api.defaults.headers.common["Content-Type"] = "application/json";
  }
};

export default setAuthToken;
