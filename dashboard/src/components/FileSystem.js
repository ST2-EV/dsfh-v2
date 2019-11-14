import React, { Component } from "react";
import { db } from "../fire";
import { Table, Container, Row, Col, Button } from "reactstrap";
import BarGraph from "./BarGraph";

const styles = {
  marginTop: "80px"
};

class MyFileSystem extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] }; // <- set up react state
  }
  fetchFromDB = () => {
    db.collection("Images")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        // console.log(data);
        for (var i = 0; i < data.length; i++) {
          data[i].names = data[i].names.length;
          data[i].index = i;
        }

        this.setState({ data: data }); // array of cities objects
      });
  };
  componentDidMount() {
    this.fetchFromDB();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="4" style={styles}>
            <h5>
              <strong>Diseases collected so far:</strong>
            </h5>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Disease name</th>
                  <th>Number of images</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((folder, index) => (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{folder.label}</td>
                    <td>{folder.names}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button color="primary" onClick={this.fetchFromDB}>
              Reload
            </Button>
          </Col>
          <Col xs="8">
            <BarGraph data={this.state.data} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MyFileSystem;
