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
import UserProfilePage from './components/UserProfilePage'
import EventManager from './components/EventManager'
import EventCreator from './components/EventCreator'
import EventEditor from './components/EventEditor'
import GeneralEventList from './components/EventViews/GeneralEventList'
import RevenueEventList from './components/EventViews/RevenueEventList'
import TicketEventList from './components/EventViews/TicketEventList'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/events" element={<EventBrowser />} />
          <Route path="/shifts" element={<ShiftBrowser />} />
          <Route path="/manageEvent" element={<EventManager />}>
            <Route index element={<GeneralEventList />}/>
            <Route path='revenue' element={<RevenueEventList />}/>
            <Route path='tickets' element={<TicketEventList />}/>
          </Route>
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/createEvent" element={<EventCreator/>} />
          <Route path="/editEvent/:event_id" element={<EventEditor />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )

}

export default App
