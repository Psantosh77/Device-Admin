
import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBoxOpen, faChartPie, faCog, faFileAlt, faHandHoldingUsd, faSignOutAlt, faTable, faTimes, faCalendarAlt, faMapPin, faInbox, faRocket } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";
import axios from "axios";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };


  const Logout = async () => {
    try {
      await axios.get("http://localhost:5000/logout");
      localStorage.clear();
      window.location.replace("/examples/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"))


  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user?-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user?-avatar lg-avatar me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>Hi, Jane</h6>
                  <Button as={Link} variant="secondary" size="xs" to={Routes.Signin.path} className="text-dark">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="Welcome " link={Routes.Presentation.path} image={ReactHero} />

              <NavItem title="Dashboard" link={Routes.DashboardOverview.path} icon={faChartPie} />


              <CollapsableNavItem eventKey="tables/" title="User" icon={faTable}>
                {
                  user?.role === "admin" ?
                    <>
                      <NavItem title="CNF" link={Routes.CNF.path} />
                      <NavItem title="Master Distributor" link={Routes.MasterDistributor.path} />
                      <NavItem title="Distributor" link={Routes.Distributor.path} />
                      <NavItem title="Retailers" link={Routes.Retailers.path} />
                    </>
                    :
                    null
                }

                {
                  user?.role === "cnf" ?
                    <>

                      <NavItem title="Master Distributor" link={Routes.MasterDistributor.path} />
                      <NavItem title="Distributor" link={Routes.Distributor.path} />
                      <NavItem title="Retailers" link={Routes.Retailers.path} />
                    </>
                    :
                    null
                }

                {
                  user?.role === "master_distributer" ?
                    <>

                      <NavItem title="Distributor" link={Routes.Distributor.path} />
                      <NavItem title="Retailers" link={Routes.Retailers.path} />
                    </>
                    :
                    null
                }


                {
                  user?.role === "distributer" ?
                    <>
                      <NavItem title="Retailers" link={Routes.Retailers.path} />
                    </>
                    :
                    null
                }

              </CollapsableNavItem>

              <CollapsableNavItem eventKey="tables" title="Licence Key" icon={faTable}>
                <NavItem title="Send Licence Key" link={Routes.SendLicence.path} />
                <NavItem title="Used Licence Key" link={Routes.UsedLicenceKey.path} />
                <NavItem title="Licence Key History" link={Routes.LicenceHistory.path} />
              </CollapsableNavItem>

              <NavItem title="Package" link={Routes.Package.path} icon={faChartPie} />
              <NavItem title="Banner" link={Routes.Banner.path} icon={faChartPie} />
              <NavItem title="Referrals" link={Routes.Referrals.path} icon={faChartPie} />

              <Dropdown.Divider className="my-3 border-indigo" />

              <Button onClick={Logout} variant="secondary" className="upgrade-to-pro"> Log out</Button>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
