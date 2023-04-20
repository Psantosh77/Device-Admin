
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import api from "../../utils/api"
import { useEffect } from "react";

export default () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [count, setCount] = useState({})
  const [refresh, setrefresh] = useState(false)

    setTimeout(() => {
      setrefresh(true)
    },1000);

  useEffect(() => {
    api.get(`/getTotalCountByRole?role=${user?.role}&id=${user?.id}`).then((count) => {
      setCount(count?.data)
    })
  }, [refresh])

  return (
    <>
      {
        user?.role === "admin" ?
          <Row className="justify-content-md-start mt-5" >
            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="CNF"
                title={count.cnf}
                // percentage={18.2}
                icon={faChartLine}
                iconColor="shape-secondary"
              />
            </Col>

            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Master Distributor"
                title={count.master_distributer}
                period="Feb 1 - Apr 1"
                percentage={28.4}
                icon={faCashRegister}
                iconColor="shape-tertiary"
              />
            </Col>

            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Distributor"
                title={count.distributer}
                period="Feb 1 - Apr 1"
                percentage={28.4}
                icon={faCashRegister}
                iconColor="shape-tertiary"
              />
            </Col>

            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Retailers"
                title={count.retailer}
                period="Feb 1 - Apr 1"
                percentage={28.4}
                icon={faCashRegister}
                iconColor="shape-tertiary"
              />
            </Col>

            {/* <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title="Traffic Share"
            data={trafficShares} />
        </Col> */}
          </Row>
          : null
      }

      {
        user?.role === "cnf" ?
          <Row className="justify-content-md-start mt-5" >
            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Master Distributor"
                title={count.master_distributer}
                period="Feb 1 - Apr 1"
                percentage={28.4}
                icon={faCashRegister}
                iconColor="shape-tertiary"
              />
            </Col>

            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Distributor"
                title={count.distributer}
                period="Feb 1 - Apr 1"
                percentage={28.4}
                icon={faCashRegister}
                iconColor="shape-tertiary"
              />
            </Col>

            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Retailers"
                title={count.retailer}
                period="Feb 1 - Apr 1"
                percentage={28.4}
                icon={faCashRegister}
                iconColor="shape-tertiary"
              />
            </Col>

            {/* <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title="Traffic Share"
            data={trafficShares} />
        </Col> */}
          </Row>
          : null
      }

      {
        user?.role === "master_distributer" ?
          <Row className="justify-content-md-start mt-5" >
            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Distributor"
                title={count.distributer}
                period="Feb 1 - Apr 1"
                percentage={28.4}
                icon={faCashRegister}
                iconColor="shape-tertiary"
              />
            </Col>

            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Retailers"
                title={count.retailer}
                period="Feb 1 - Apr 1"
                percentage={28.4}
                icon={faCashRegister}
                iconColor="shape-tertiary"
              />
            </Col>

            {/* <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title="Traffic Share"
            data={trafficShares} />
        </Col> */}
          </Row>
          : null
      }

      {
        user?.role === "distributer" ?
          <Row className="justify-content-md-start mt-5" >

            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Retailers"
                title={count.retailer}
                period="Feb 1 - Apr 1"
                percentage={28.4}
                icon={faCashRegister}
                iconColor="shape-tertiary"
              />
            </Col>
          </Row>
          : null
      }
    </>
  );
};
