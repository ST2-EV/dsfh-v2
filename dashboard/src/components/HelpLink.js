import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "reactstrap";
const buttonStyle = {
  float: "right",
  margin: "10px"
};
export default class HelpLink extends Component {
  render() {
    return (
      <div style={buttonStyle}>
        <NavLink href="https://st2-ev.github.io" target="_blank">
          <FontAwesomeIcon icon={faQuestionCircle} size="3x" spin />
        </NavLink>
      </div>
    );
  }
}
