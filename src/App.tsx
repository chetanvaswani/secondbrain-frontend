import './App.css';
import Login from "./components/pages/Login";
import Signup from './components/pages/Signup';
import Home from "./components/pages/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
        <Main />
    </Router>
  )
}


function Main(){
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/seeBrain/:shareLink" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
