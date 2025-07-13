import { useDeferredValue, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import './App.css'
import { useNavigate } from 'react-router-dom'
import AuthenticationSection from './Components/Authentication'
import HomeSection from './Components/Home'
import BoardsSection from './Components/Boards'
import {setIsAuthenticated,setUserInfo} from '../Features/AuthSlcie'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
function App() {
  const[loading,setloading] = useState(true)
  const isAuthenticated = useSelector((state)=> state.Auth.isAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  return (
    <>
    <Routes>
      <Route path='/' element={isAuthenticated ? <Navigate to='/user/Home'/>:<Navigate to='/Auth/:mode'/> }></Route>
      <Route path="/Auth/:mode" element={isAuthenticated ? <Navigate to='/user/Home'/> : <AuthenticationSection/>} ></Route>
      <Route path='/user/Home' element={<HomeSection/>}></Route>
      <Route path='/user/Boards' element={<BoardsSection/>}></Route>
    </Routes>
    </>
  )
}

export default App
