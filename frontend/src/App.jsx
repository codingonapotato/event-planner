import './App.css'
import './assets/backgrounds.css'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'
import Layout from './components/Layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterPage from './components/RegisterPage'
import EventBrowser from './components/EventBrowser'
import NotFound from './components/NotFound'
import ShiftBrowser from './components/ShiftBrowser'
import UserProfile from './components/UserProfile'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="/events" element={<EventBrowser />} />
          <Route path="/shifts" element={<ShiftBrowser />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route> 
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )

}

export default App
