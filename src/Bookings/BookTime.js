/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function BookTime(props) {

  const baseUrl = "https://localhost:6001/api/Schedulerer/";
  const [dataPost, setData] = useState(false);
  const [sendData, setSendData] = useState(false);
  const [post, setPost] = useState(null);
  const [waiter, setWaiter] = useState(false);

  const [hour, setHour] = useState(null);
  const [day, setDay] = useState(null);
  const [hourlyCheck, setHourChecked] = useState(false);
  const [daylyCheck, setDayChecked] = useState(false);


  useEffect(() => {
    if (hourlyCheck) {
      const currentDateHourly = new Date(props.first.Time.start);
      const date = new Date(currentDateHourly.setHours(currentDateHourly.getHours() - 1));
      const dateToLocaleString = date.toLocaleString("SV-se");
      setHour(dateToLocaleString);
    }
    else {
      setHour(null);
    }

  }, [hourlyCheck]);

  useEffect(() => {
    if (daylyCheck) {
      const currentDate = new Date(props.first.Time.start);
      const dayBefore = new Date(currentDate.setDate(currentDate.getDate() - 1));
      const dateToLocaleString = dayBefore.toLocaleString("SV-se");
      setDay(dateToLocaleString);
    }
    else {
      setDay(null);
    }
  }, [daylyCheck]);


  const sendHour = () => {
    setHourChecked(true);
  }

  const sendDate = () => {
    setDayChecked(true);
  }
  const sendDataToApi = () => {


    const data = {
      ScheduledTime: new Date(props.first.Time.start),
      ScheduledTimeHourlyBefore: new Date(hour),
      ScheduledDateBefore: new Date(day),
      user: props.first.userId,
      UserId: props.userdata.id,
      Email: props.userdata.email,
      Name: props.userdata.fullName
    }

    axios.post(baseUrl, data
    )
      .then((response) => {
        setPost(response.data);
        setWaiter(true);
      });

    props.onHide();
    props.postEvent(props.first.Time);
  }


    return (
      <div>
        {props.waiting && props.show &&
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Boka Tid
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Är du säker att du vill boka besöket?:</h4>
              <h4>Datum:
              </h4>
              <h5>
                {props.first.Time.start.toLocaleString("sv-SE", { day: "numeric" })}/
                {props.first.Time.start.toLocaleString("sv-SE", { month: "long" })}
                {props.first.Time.start.toLocaleString("sv-SE", { year: "numeric" })}
              </h5>

              <InputGroup className="mb-3 mt-5" onChange={sendHour}>
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                <Form.Label className="ms-3 fw-bold">Skicka Påminnelse en timme innan</Form.Label>
              </InputGroup>
              <InputGroup className="mb-3" onChange={sendDate}>
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                <Form.Label className="ms-3 fw-bold">Skicka Påminnelse en dag innan</Form.Label>
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Stäng</Button>
              <Button variant="primary" onClick={sendDataToApi}>
                Spara Ändringar
              </Button>
            </Modal.Footer>
          </Modal>
        }
        {!props.waiting && !props.show &&
        <div>
          </div>
        }
      </div>
    )

}

export default BookTime;