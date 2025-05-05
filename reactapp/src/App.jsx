import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from './pages/Register';

function About() {
  return <h2>About Page</h2>;
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App
