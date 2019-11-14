import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Alert, Button } from "reactstrap";
import axios from "axios";

const styles = {
  marginTop: "80px"
};
const stylestwo = {
  textAlign: "center",

  mariginTop: "10px",
  padding: "20px"
};
class ConfigForm extends Component {
  state = {
    Folder_Name: "",
    fileType: "Image",
    error_data: "",
    success_data: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    const { Folder_Name, fileType } = this.state;
    const data_for_config = {
      Folder_Name: Folder_Name,
      fileType: fileType
    };
    const url = "http://35.223.18.41:5000/config";
    axios.post(url, { data_for_config }).then(res => {
      console.log(res.data);
      if (res.data.typ === "error") {
        this.setState({ error_data: res.data.message });
      }
      if (res.data.typ === "success") {
        this.setState({ success_data: res.data.message });
      }
    });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit} style={styles}>
          <h5>
            <strong>Configure Newly uploaded folder:</strong>
          </h5>
          <FormGroup>
            <Label for="Folder_Name">Folder-Name:</Label>
            <Input
              type="text"
              name="Folder_Name"
              id="Folder_Name"
              value={this.state.Folder_Name}
              onChange={this.onChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="fileType">File-type:</Label>
            <Input
              type="select"
              name="fileType"
              id="fileType"
              onChange={this.onChange}
              value={this.state.fileType}
            >
              <option>Image</option>
              <option>Dicom</option>
            </Input>
          </FormGroup>

          <br />
          <Button color="primary">configure</Button>

          <br />
          {this.state.error_data && (
            <div style={stylestwo}>
              <p>
                <Alert color="danger">{this.state.error_data}</Alert>
              </p>
            </div>
          )}
          {this.state.success_data && (
            <div style={stylestwo}>
              <p>
                <Alert color="success">{this.state.success_data}</Alert>
              </p>
            </div>
          )}
        </Form>
      </div>
    );
  }
}

export default ConfigForm;
