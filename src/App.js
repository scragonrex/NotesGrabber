import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NotesState from './context/notes/NotesState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Alert from './components/Alert';

function App() {
  const [alert, setalert] = useState(null);
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };
  return (
    <>
    <NotesState>
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>
    <>
    <Routes>
      <Route path="/" element={<Home showAlert={showAlert}/>} />
      <Route path="/login" element={<Login showAlert={showAlert}/>} />
      <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
    </Routes>
    </>
  </BrowserRouter>
  </NotesState>
  </>
  );
}

export default App;
