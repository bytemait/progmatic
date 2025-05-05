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
import AdminQuestion from "./pages/AdminQuestion";
// import ProtectedRoute from "./components/ProtectedRoute"; // Import

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
          <Route path= "/contest/:contestName/:id" element = {<Code/>} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="/dashboard" element={<Userdashboard />} /> 

          <Route path="/admin" element={<Admin />}/>
          <Route path="/adminques" element={<AdminQuestion />}/>

        </Routes>
        <Easter />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
