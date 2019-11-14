import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import QRCode from "./QRcode";
const ModalExample = props => {
  const { name, className } = props;

  const [modal, setModal] = useState(false);

  const styles = {
    marginLeft: "167px"
  };
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle}>
        Deploy
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Scan this with the App!</ModalHeader>
        <ModalBody>
          <div style={styles}>
            <QRCode name={name} />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalExample;
