import "bootstrap/dist/css/bootstrap.min.css";
// import { Row, Col } from "react-bootstrap";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import { useState } from "react";
import Registration from "./pages/Registration";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // const [wantToSignUp, setWantToSignUp] = useState(true);
  const getLoginStatus = (loginMessage) => {};
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
