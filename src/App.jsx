import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/authentication/Login";
import Nav from "./components/navbar/Nav"; 
import Register from "./components/authentication/Register";
import Lecture from "./components/pages/lecture/Lecture";
import Lab from "./components/pages/lab/Lab";
import Exam from "./components/pages/exam/Exam";
import Profile from "./components/pages/Profile";
import Notice from "./components/pages/Notice";
import Notification from "./components/pages/Notification";



function App() {
  const location = useLocation();
  
  const showNav = location.pathname !== "/" && location.pathname !== "/register";
  
  return (
    <>
      {showNav && <Nav />}  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/lecture" element={<Lecture />} />
        <Route path="/lab" element={<Lab/>} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
