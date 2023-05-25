import React from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
function SingleStaffMember(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.firstname} {props.lastname}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Position: {props.employeeposition} </h4>

        <p>
          {props.longdescription}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Stäng</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default SingleStaffMember;