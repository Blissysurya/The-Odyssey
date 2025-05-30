import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user.context.jsx'
import axios from '../config/axios.js'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/users/register', { email, password })
      .then(response => {
        console.log('Registration successful:', response.data);
        localStorage.setItem('token', response.data.token)
        setUser(response.data.user) // Update user context
        navigate('/')
      }).catch(error => {
        console.error('Registration failed:', error.response ? error.response.data : error.message);
      })
    // TODO: Add login logic here
    // Example: authenticateUser(email, password)
  }

  const handleSignupRedirect = () => {
    navigate('/login')
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-400">Already have an account ? </span>
          <button
            onClick={handleSignupRedirect}
            className="text-blue-400 hover:underline focus:outline-none"
            type="button"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
