import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Container
} from "reactstrap";
import classnames from "classnames";
import FileSystem from "./FileSystem";
import ModelsList from "./ModelsList";
import DeployForm from "./DeployForm";
import Iframe from "react-iframe";
import ConfigForm from "./ConfigForm";
import ClusterForm from "./ClusterForm";
import Inference from "./Inference";
import HelpLink from "./HelpLink";

const styles = {
  padding: "30px"
};

const Example = props => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Deploy
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Test
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
          >
            Files
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "5" })}
            onClick={() => {
              toggle("5");
            }}
          >
            Clustering
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <HelpLink />
          <Container>
            <FileSystem />
          </Container>
        </TabPane>
        <TabPane tabId="2">
          <HelpLink />
          <Container>
            <Row>
              <Col xs="6">
                <ModelsList />
              </Col>
              <Col xs="6">
                <DeployForm />
              </Col>
            </Row>
          </Container>
        </TabPane>
        <TabPane tabId="3">
          <HelpLink />
          <Container style={styles}>
            <Inference />
          </Container>
        </TabPane>
        <TabPane tabId="4">
          <HelpLink />
          <Container style={styles}>
            <Row>
              <Col xs="6">
                <Iframe
                  url="http://35.223.18.41:8000/"
                  width="500px"
                  height="500px"
                  id="myId"
                  className="myClassname"
                  display="initial"
                  position="relative"
                  frameBorder="0"
                />
              </Col>
              <Col xs="6">
                <ConfigForm />
              </Col>
            </Row>
          </Container>
        </TabPane>

        <TabPane tabId="5">
          <HelpLink />
          <Container style={styles}>
            <Row>
              <Col xs="6">
                <Iframe
                  url="http://35.232.144.179:8000/"
                  width="500px"
                  height="500px"
                  id="my"
                  className="myClass"
                  display="initial"
                  position="relative"
                  frameBorder="0"
                />
              </Col>
              <Col xs="6">
                <ClusterForm />
              </Col>
            </Row>
          </Container>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Example;
