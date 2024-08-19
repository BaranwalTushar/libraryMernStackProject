import React from 'react'
import Home from './home/Home'
import Coursess from './courses/Coursess'
import { Navigate, Route, Routes } from "react-router-dom"
import Signup from './components/Signup'
import  { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider'


const App = () => {
  
  const [authUSer,setAuthUser] = useAuth()
  console.log(authUSer)
  return (
   <>
  {/* <Home/>
  <Course/> */}
    <div className='dark:bg-slate-900 dark:text-white'>
    <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path = '/course' element = {authUSer?<Coursess/>:<Navigate to="/signup"/>} />
      <Route path = '/signup' element = {<Signup/>} />
    </Routes>
    <Toaster/>
    </div>
   </>
  )
}

export default App
