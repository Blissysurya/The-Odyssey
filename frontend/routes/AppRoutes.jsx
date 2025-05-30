import React from 'react'
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import Login from '../src/screens/Login'
import Register from '../src/screens/Register'
import Home from '../src/screens/Home'
import Project from '../src/screens/Project'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/project" element={<Project/>} />
            {/* Add more routes as needed */}

        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes