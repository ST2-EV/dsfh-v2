import React, { Component } from "react";
import { db } from "../fire";
import { Container, Table, Button } from "reactstrap";
import QRModal from "./QRModal";
import Loading from "./Loading";
const styles = {
  marginTop: "80px"
};

export default class ModelsList extends Component {
  constructor(props) {
    super(props);
    this.state = { model_data: [], loading: false }; // <- set up react state
  }
  fetchFromDB = () => {
    this.setState({ loading: true });
    db.collection("Models")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        //console.log(data);
        this.setState({ model_data: data }); // array of cities objects
      });
    this.setState({ loading: false });
  };
  componentDidMount() {
    this.fetchFromDB();
  }

  render() {
    return (
      <Container style={styles}>
        <h5>
          <strong>Models trained:</strong>
        </h5>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Model name</th>
              <th>Diseases involved</th>
              <th>Description</th>
              <th>QR-code</th>
            </tr>
          </thead>
          <tbody>
            {/* Render the list of messages */
            this.state.model_data.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{data.name}</td>
                <td>
                  <ul>
                    {data.labels.map((label, key) => (
                      <li key={key}>{label}</li>
                    ))}
                  </ul>
                </td>
                <td>{data.desciption}</td>
                <td>
                  <QRModal name={data.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {!this.state.loading && (
          <Button color="primary" onClick={this.fetchFromDB}>
            Reload
          </Button>
        )}
        {this.state.loading && <Loading />}
      </Container>
    );
  }
}
