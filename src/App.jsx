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
  const username = useSelector((state) => state.Auth.userInfo.name)
  const isAuthenticated = useSelector((state)=> state.Auth.isAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function verifyUser(){
    try{
      const response = await axios.get("http://localhost:3000/user/verifyUser",{
        withCredentials: true,
      })
      if(response.status === 200){
        dispatch(setUserInfo(`${response.data.user.firstName} ${response.data.user.lastName}`))
        dispatch(setIsAuthenticated(true))
      }

    }catch(error){
      console.log(error)
      if(error.response && error.response.status === 401){
        console.log("inside error")
        navigate('/Auth/:mode')
      }
    }
  }

  useEffect(() =>{
    verifyUser()
  },[])

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
