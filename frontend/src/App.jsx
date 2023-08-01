import './App.css'
import './assets/backgrounds.css'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterPage from './components/RegisterPage'
import UserProfilePage from './components/UserProfilePage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
      </Routes>
    </Router>
  )

}

export default App
