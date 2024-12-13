import './App.css'
import './assets/pages/landing.tsx'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Landing from './assets/pages/landing.tsx'
import { Signin } from './assets/pages/signin.tsx'
import { Signup } from './assets/pages/signup.tsx'
import  HomePage from './assets/pages/home.tsx'
import  SellPage from './assets/pages/sell.tsx'
import  MyListings from './assets/pages/mylistings.tsx'
import { ToastContainer } from "react-toastify";
function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/sell' element={<SellPage/>}></Route>
        <Route path='/mylistings' element={<MyListings/>}></Route>
        
      </Routes>
    <ToastContainer></ToastContainer>

    </BrowserRouter>
  )
}


export default App
