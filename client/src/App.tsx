import './App.css'
import './assets/pages/landing.tsx'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Landing from './assets/pages/landing.tsx'
import { Signin } from './assets/pages/signin.tsx'
import { Signup } from './assets/pages/signup.tsx'
import  HomePage from './assets/pages/home.tsx'
import  SellPage from './assets/pages/sell.tsx'
import { Toaster } from "react-hot-toast";
import { OneProduct } from './assets/pages/oneProduct.tsx'
import MyListings from './assets/pages/mylistings.tsx'
import UpdateProfile from './assets/pages/updateProfile.tsx'
import About from './assets/pages/about.tsx'
import Edit from './assets/pages/edit.js'

function App() {

  return (
    <BrowserRouter>
    <Toaster position='top-right'></Toaster>
    <Routes>
      
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/sell' element={<SellPage/>}></Route>
        <Route path='/mylistings' element={<MyListings/>}></Route>
        <Route path='/oneProduct' element={<OneProduct/>}></Route>
        <Route path='/updateProfile' element={<UpdateProfile></UpdateProfile>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/edit' element={<Edit/>}></Route>

        
      </Routes>
    

    </BrowserRouter>
  )
}


export default App
