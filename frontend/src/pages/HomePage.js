import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import "react-toastify/dist/ReactToastify.css";

import "react-notifications/lib/notifications.css";

// pages

import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import CNF from "./users/cnf";
import axios from "axios";
import Package from "./package/package";
import Banner from "./banner/banner";
import Referrals from "./referrals/referrals";
import AllCnf from "./users/AllCnf";
import masterDistributor from "./users/masterDistributor";
import Distributor from "./users/distributor";
import retailsers from "./users/retailsers";
import SendLicence from "./licence/sendKey";
import UsedLicenceKey from "./licence/usedLicenceKey";
import TransferKeyHistory from "./licence/licenceHistory";

import Cookies from "js-cookie";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const token = Cookies.get("refreshToken");

  let logUser  = '';
  if (localStorage.refreshToken) {
    const jwt = localStorage.getItem("refreshToken");
    setAuthToken(jwt);
    logUser = jwt_decode(jwt);
  }
  else if(token){
    const jwt = localStorage.setItem("refreshToken",token);
    setAuthToken(jwt);
    logUser = jwt_decode(token);
  }

  const [userL, setUserL] = useState(logUser);
  console.log(logUser);


  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/token?refreshToken=" + localStorage.getItem("refreshToken")
        );
        localStorage.setItem("accessToken", response.data.accessToken);

        var token = response.data.accessToken;
        var decoded = jwt_decode(token);
        setUserL(decoded);
        const user = await axios.get(
          `http://localhost:5000/users/id/${decoded.userId}`
        );
        localStorage.setItem("user", JSON.stringify(user.data[0]));
      } catch (error) {
        // Navigate("/");
        if (error.response) {
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error);
      }
    })();
  },[]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <Route
      {...rest}
      render={(props) =>

        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />
          {/* <ToastContainer autoClose={2000} /> */}

          <main className="content">
            <Navbar />
            <Component {...props} />
            <Footer
              toggleSettings={toggleSettings}
              showSettings={showSettings}
            />
          </main>
        </>

      }
    />
  );
};

export default () => (
  <>
  <Switch>
    {/* Admin Routes Start*/}
    <RouteWithSidebar exact path={Routes.CNF.path} component={CNF} />
    <RouteWithSidebar exact path={Routes.AllCnf.path} component={AllCnf} />

    <RouteWithSidebar
      exact
      path={Routes.MasterDistributor.path}
      component={masterDistributor}
    />
    <RouteWithSidebar
      exact
      path={Routes.Distributor.path}
      component={Distributor}
    />
    <RouteWithSidebar
      exact
      path={Routes.Retailers.path}
      component={retailsers}
    />
    
    {/* Admin Routes end*/}

    <RouteWithSidebar exact path={Routes.Package.path} component={Package} />
    <RouteWithSidebar exact path={Routes.Banner.path} component={Banner} />
    <RouteWithSidebar
      exact
      path={Routes.Referrals.path}
      component={Referrals}
    />

    {/* Licence key Route start */}
    <RouteWithSidebar
      exact
      path={Routes.SendLicence.path}
      component={SendLicence}
    />
    <RouteWithSidebar
      exact
      path={Routes.UsedLicenceKey.path}
      component={UsedLicenceKey}
    />
    <RouteWithSidebar
      exact
      path={Routes.LicenceHistory.path}
      component={TransferKeyHistory}
    />
    {/* Licence key Route end */}

    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader
      exact
      path={Routes.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.ResetPassword.path}
      component={ResetPassword}
    />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />

    {/* pages */}
    <RouteWithSidebar
      exact
      path={Routes.DashboardOverview.path}
      component={DashboardOverview}
    />
    <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
    <RouteWithSidebar
      exact
      path={Routes.Transactions.path}
      component={Transactions}
    />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar
      exact
      path={Routes.BootstrapTables.path}
      component={BootstrapTables}
    />
   
    <Redirect to={Routes.Signin.path} />
  </Switch>
  </>
);