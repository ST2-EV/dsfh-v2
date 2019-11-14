import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import Iframe from "react-iframe";

const styles = {
  marginTop: "80px"
};

class ClusterForm extends Component {
  state = {
    Folder_Name: "",
    fileType: "Images",
    link: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    const { Folder_Name } = this.state;
    const url = "http://35.232.144.179:5000/image-cluster/" + Folder_Name;
    this.setState({ link: url });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit} style={styles}>
          <h5>
            <strong>Type a folder to run clustering on:</strong>
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

          <br />
          <Button color="primary">Clusterify</Button>

          <br />
          {this.state.link && (
            <Iframe
              url={this.state.link}
              width="900px"
              height="700px"
              display="initial"
              position="relative"
              frameBorder="0"
            />
          )}
        </Form>
      </div>
    );
  }
}

export default ClusterForm;
