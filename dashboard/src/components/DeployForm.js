import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  ButtonToolbar,
  Alert
} from "reactstrap";
import { db } from "../fire";
import Loading from "./Loading";
import axios from "axios";

const styles = {
  marginTop: "80px"
};
const stylestwo = {
  textAlign: "center",

  mariginTop: "10px",
  padding: "20px"
};

class DeployForm extends Component {
  state = {
    model_name: "",
    description: "",
    diseases: [],
    labels: [],
    toAddress: "",
    loading: false,
    error_data: "",
    after_train: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  fetchFromDB = () => {
    this.setState({ loading: true });
    db.collection("Images")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        //console.log(data);
        var temp = [];
        for (var i = 0; i < data.length; i++) {
          temp.push(data[i].label);
        }
        //console.log(temp);
        this.setState({ labels: temp }); // array of cities objects
      });
    this.setState({ loading: false });
  };
  componentDidMount() {
    this.fetchFromDB();
  }
  onCheckboxBtnClick = selected => {
    var array = [...this.state.diseases]; // make a separate copy of the array
    var index = array.indexOf(selected);
    if (index < 0) {
      array.push(selected);
    } else {
      array.splice(index, 1);
    }

    this.setState({ diseases: array });
  };

  onSubmit = event => {
    this.setState({ loading: true });
    event.preventDefault();
    const { description, model_name, diseases, toAddress } = this.state;

    const data_for_training = {
      labels: diseases,
      description: description,
      toEmail: toAddress
    };

    const url =
      "https://api-2445582824322.production.gw.apicast.io:443/train/" +
      model_name +
      "?user_key=402d46c6d21b86e66339d12e79e05366";
    //console.log(data_for_training);
    axios.post(url, { data_for_training }).then(res => {
      if (res.data === "Success") {
        this.setState({ loading: false, after_train: true });
      } else {
        this.setState({
          loading: false,
          error_data: "The training failed, try again!!"
        });
      }
      //console.log(res.data);
    });

    this.setState({
      model_name: "",
      description: "",
      diseases: []
    });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit} style={styles}>
          <h5>
            <strong>Make a new model:</strong>
          </h5>
          <FormGroup>
            <Label for="Model-Name">Model Name:</Label>
            <Input
              type="text"
              name="model_name"
              id="model_name"
              value={this.state.model_name}
              onChange={this.onChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description:</Label>
            <Input
              type="text"
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.onChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="toAddress">Email:</Label>
            <Input
              type="email"
              name="toAddress"
              id="toAddress"
              value={this.state.toAddress}
              onChange={this.onChange}
              required
            />
          </FormGroup>
          <p>Select Diseases:</p>
          <ButtonToolbar>
            <ButtonGroup>
              {this.state.labels.map((label, index) => (
                <Button
                  color="success"
                  onClick={() => this.onCheckboxBtnClick(label)}
                  active={this.state.diseases.includes(label)}
                  key={index}
                >
                  {label}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup>
              <Button onClick={this.fetchFromDB}>
                <i className="fa fa-refresh"></i>
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
          <br />
          {!this.state.loading && <Button color="primary">Train</Button>}
          {this.state.loading && <Loading />}
          <br />
          {this.state.error_data && (
            <div style={stylestwo}>
              <p>
                <Alert color="danger">{this.state.error_data}</Alert>
              </p>
            </div>
          )}
          {this.state.after_train && (
            <div style={stylestwo}>
              <Alert color="success">
                An email will be sent to you after the training has completed.
              </Alert>
            </div>
          )}
        </Form>
      </div>
    );
  }
}

export default DeployForm;
