import { useState } from 'react'
import './App.css'
import './assets/pages/landing.jsx'
import {Routes,Router, Route, BrowserRouter} from "react-router-dom"
import Landing from './assets/pages/landing.jsx'
import { Signin } from './assets/pages/signin.jsx'
import { Signup } from './assets/pages/signup.jsx'
import  HomePage from './assets/pages/home.jsx'
import  SellPage from './assets/pages/sell.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <App2></App2>
    </BrowserRouter>
  )
}
function App2(){
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/sell' element={<SellPage/>}></Route>
        
      </Routes>
    </div>
  )
}

export default App
