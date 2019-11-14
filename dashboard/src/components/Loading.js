import React from "react";
import { Spinner } from "reactstrap";

const Loading = props => {
  return (
    <div>
      <Spinner type="grow" color="success" />
      <Spinner type="grow" color="danger" />
      <Spinner type="grow" color="warning" />
    </div>
  );
};

export default Loading;
