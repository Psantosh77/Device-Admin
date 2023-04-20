import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import { NotificationContainer } from 'react-notifications';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <HashRouter>
    <ScrollToTop />
    <ToastContainer  autoClose={2000}/>
    <HomePage />
  </HashRouter>,
  document.getElementById("root")
);
