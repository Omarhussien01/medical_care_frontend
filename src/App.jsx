/* eslint-disable react/no-unescaped-entities */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import Registeration from "./pages/Registeration";

import Overview from "./pages/Overview";
import UserProfile from "./pages/UserProfile";


function App() {
  return (
    <>
      <ToastContainer theme="colored"></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registeration />} />
          
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/overview" element={<Overview />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
