import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginCard from './components/LoginCard'
import LoginPage from './components/LoginPage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <LoginPage />
    </>
    // <>
    //   <div className="min-h-full h-screen flex items-center justify-center">
    //     <div className="max-w-md w-full space-y-8">
    //         <h1>Test</h1>
    //         <Login/>
    //     </div>
    //   </div>
    //   <h1>Test</h1>
    //   <h2>Testing</h2>
    // </>
  )
  // return (
  //   <>
  //     <div>
  //       {/* <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a> */}
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
