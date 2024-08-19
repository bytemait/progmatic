import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Learn from "./pages/Learn";
import Discussions from "./pages/Discussions";
import Error404 from "./pages/Error404";
import Code from "./pages/Code";
import Footer from "./components/Footer";
import Easter from "./components/Easter";
import Contest from "./pages/Contest";
import Userdashboard from "./pages/Userdashboard";
import Admin from "./pages/Admin";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/code" element={<Code />} />
          <Route path="/contest" element={<Contest />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="/u/:username" element={<Userdashboard />} /> 
          <Route path="/admin" element={<Admin />} /> 

        </Routes>
        <Easter />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
