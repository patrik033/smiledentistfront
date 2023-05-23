import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './Home/Home';
import Staff from './Staff/Staff';
import Treatment from "./Treatment/Treatment";
import Bookings from "./Bookings/Bookings";
import Login from "./Login/Login";
import Register from "./Register/Register";
import LoggedInUser from './Shared/UserPages/LoggedInUser';
import AdminUserBookings from './Shared/UserPages/Admin/Appointments/AdminUserBookings';
import BookAppointment from './Shared/UserPages/Admin/Appointments/BookAppointment';
import UserEmail from './Shared/UserPages/User/UserEmail';
import UserName from './Shared/UserPages/User/UserName';
import UserPassword from './Shared/UserPages/User/UserPassword';
import RegisterConfirmation from './Register/RegisterConfirmation';
import EmailSent from './Register/EmailSent';
import ResetPassword from './ResetPassword/ResetPassword';
import UpdatePassword from './ResetPassword/UpdatePassword';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem("token");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false)
    }
    setIsLoggedIn(true);
  }

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (

    <BrowserRouter style={{ overflow: "hidden" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/Treatment" element={<Treatment />} />
        <Route path="/Bookings" element={<Bookings />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/loggedinuser" element={<LoggedInUser/>}/>
        <Route path='/adminbookings' element={<AdminUserBookings/>}/>
        <Route path="/bookAppointment" element={<BookAppointment/>}/>
        <Route path="/useremail" element={<UserEmail/>}/>
        <Route path="/userpassword" element={<UserPassword/>}/>
        <Route path="/username" element={<UserName/>}/>
        <Route path="/RegisterConfirmation" element={<RegisterConfirmation/>}/>
        <Route path="/emailsent" element={<EmailSent/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        <Route path="/updatepassword" element={<UpdatePassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
