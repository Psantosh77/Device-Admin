// import Axios from "axios";
// import { useEffect } from "react";
import AppConstants from "./appConstant";

// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
const api = axios.create({
// .. where we make our configurations
    baseURL: AppConstants.apibaseURL,
});

// const getToken = localStorage.getItem('accessToken');
// // Where you would set stuff like your 'Authorization' header, etc ...
// api.defaults.headers.common['Authorization'] = getToken;
// api.defaults.headers.common['Content-Type'] ='application/json';

export default api;