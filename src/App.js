import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home.jsx";
import SignUp from "./page/Signup.jsx";
import Login from "./page/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Scanqr from "./page/Scanqr.jsx";
import Transfermoney from "./page/Transfermoney.jsx";
import History from "./page/History.jsx";
import Getqr from "./page/Getqr.jsx";
import Balance from "./page/Balance.jsx";
import Addmoney from "./page/Addmoney.jsx";
import Profile from "./page/Profile.jsx";
import Notification from "./page/Notification.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/scan-qr" element={<Scanqr />} />
        <Route path="/transfer-money" element={<Transfermoney />} />
        <Route path="/history" element={<History />} />
        <Route path="/get-qr" element={<Getqr />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/add-money" element={<Addmoney />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </Router>
  );
}

export default App;