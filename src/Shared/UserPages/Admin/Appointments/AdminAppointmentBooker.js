/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react" // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid"
import dayGridPlugin from "@fullcalendar/daygrid" // a plugin!
import "react-datepicker/dist/react-datepicker.css";
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuid } from "uuid";
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // needs additional webpack config!
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookTimeAdmin from './BookTimeAdmin';
import { Button } from 'react-bootstrap';
import jwt_decode from "jwt-decode";


function AdminAppointmentBooker(props) {

   
    const today = Date.now();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1)
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const checkUserToken = () => {
        const userToken = localStorage.getItem("token");
        if (userToken === null || userToken === "undefined") {
            setIsLoggedIn(false)
        }
        else {
            setIsLoggedIn(true);
        }
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    })


    useEffect(() => {
        const userToken = localStorage.getItem("token");
        if (userToken) {
            setToken(jwt_decode(userToken));
        }
    }, [])


    //modalStates
    const [events, setEvents] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [modalAwait, setWaiter] = useState(false);
    const [loadData, setData] = useState(false);
    const navigate = useNavigate();
    const baseUrl = "https://localhost:6001/Month/";
    const [token, setToken] = useState(null);

    useEffect(() => {
        axios.get(baseUrl)
            .then((response) => {
                const test = response.data.map(e => {
                    return {
                        start: new Date(e.scheduledTime),
                        end: e.scheduledTime,
                        id: uuid(),
                    }
                });
                setEvents(test)

            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        setData(true);
    }, [events]);

    const betweenDates = "https://localhost:6001/GetBetween";
    const handleDates = (date) => {
        const startTime = new Date(date.start.toLocaleDateString("sv-SE"));
        const endTime = new Date(date.end.toLocaleDateString("sv-SE"));


        axios.get(betweenDates, {
            params: {
                start: startTime,
                end: endTime
            },

        })
            .then(function (response) {
                const test = response.data.map(e => {
                    return {
                        start: e.start,
                    }
                })
                setEvents(test);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSelect = (info) => {
        const { start, end } = info;

        const data =
        {
            Time: info,
            userId: 1
        }
        setModalData(data)
        setWaiter(true);
        setModalShow(true)
    };


    const handlePost = (info, userData) => {
        const { start, end } = info;
        setEvents([
            ...events,
            {
                start,
                id: token.id,
            },
        ]);
    }

    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }

    return (
        <div className="mt-2">
            <Button className='mb-2' variant="primary" onClick={() => setModalShow(true)} >
                Click
            </Button>
            {loadData &&
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
                    editable={false}
                    themeSystem="bootstrap5"

                    headerToolbar={{
                        left: "prev next today",
                        center: "title",
                        right: "timeGridWeek,timeGridDay"
                    }}

                    //styling
                    contentHeight={"auto"}
                    allDaySlot={false}
                    //only show specific days => hides saturday and sunday
                    weekends={false}
                    eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
                    slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}

                    //times of day
                    slotDuration={"01:00"}
                    slotMinTime={"07:00"}
                    slotMaxTime={"17:00"}
                    locale={"sv-SE"}
                    titleFormat={{ year: "numeric", month: "long", day: "2-digit" }}
                    events={{ events }}
                    select={(info) => { handleSelect(info) }}
                    initialView='timeGridWeek'
                    selectable={true}
                    dayMaxEvents={true}
                    eventContent={renderEventContent} // custom render function
                    validRange={{ start: today }}
                />
            }

            {modalShow &&
                <BookTimeAdmin
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    first={modalData}
                    userData={props.userData}
                    waiting={+modalAwait}
                    postEvent={(info, token) => { handlePost(info, token) }}
                />
            }
        </div>
    );
}


export default AdminAppointmentBooker;