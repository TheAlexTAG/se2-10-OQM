import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetTicket from './components/GetTicket.tsx';
import CallCustomer from './components/CallCustomer.tsx';
import Login from "./components/Login.tsx";
import TicketPage from './components/TicketPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetTicket/>} />
        <Route path="/ticket/:serviceTag/:waitlistCode" element={<TicketPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/display" element={<CallCustomer/>} />
      </Routes>
    </Router>
  );
}

export default App;
