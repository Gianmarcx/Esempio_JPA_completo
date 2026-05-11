import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Esempi from './components/Esempi'
import Login from "./components/Login";
import Register from "./components/Register";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="esempi" element={<Esempi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App