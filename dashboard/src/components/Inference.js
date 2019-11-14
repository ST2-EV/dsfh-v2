import React, { Component } from "react";
import axios from "axios";
import { Button, Input, Alert, Label } from "reactstrap";

import { db } from "../fire";
import Loading from "./Loading";

const stylestwo = {
  textAlign: "center",

  mariginTop: "10px",
  padding: "20px"
};

export default class Inference extends Component {
  state = {
    selectedFile: null,
    prediction: "",
    error: "",
    model_data: [],
    model: "--select--",
    loading: false
  };

  componentDidMount() {
    db.collection("Models")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ model_data: data });
      });
  }
  onChangeHandler = event => {
    this.setState({ model: event.target.value });
  };
  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  uploadHandler = () => {
    this.setState({ loading: true, error: "" });
    if (this.state.model === "--select--") {
      this.setState({
        error: "Please select a model",
        loading: false,
        prediction: ""
      });
    } else {
      const url =
        "https://api-2445582824322.staging.gw.apicast.io/deploy/" +
        this.state.model +
        "/a/?user_key=402d46c6d21b86e66339d12e79e05366";
      const formData = new FormData();
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      axios.post(url, formData).then(res => {
        if (res.data.prediction) {
          this.setState({ prediction: res.data.prediction, loading: false });
        } else {
          this.setState({
            error: "Inference did not work! Check again later",
            loading: false
          });
        }
      });
    }
  };

  render() {
    return (
      <div>
        <Label for="selectModels">
          <strong>Select Model:</strong>
        </Label>
        <Input
          type="select"
          name="select"
          id="selectModels"
          value={this.state.model}
          onChange={this.onChangeHandler}
        >
          <option>--select--</option>
          {this.state.model_data.map((data, index) => (
            <option key={index}>{data.name}</option>
          ))}
        </Input>
        <br />
        <Input type="file" onChange={this.fileChangedHandler} />
        <br />
        {!this.state.loading && (
          <Button color="primary" onClick={this.uploadHandler}>
            Run Test
          </Button>
        )}
        <br />
        {this.state.loading && <Loading />}

        {this.state.error && (
          <div style={stylestwo}>
            <Alert color="danger">{this.state.error}</Alert>
          </div>
        )}
        {this.state.prediction && (
          <div style={stylestwo}>
            <Alert color="success">
              The disease is {this.state.prediction}.
            </Alert>
          </div>
        )}
      </div>
    );
  }
}
