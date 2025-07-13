import { useEffect, useState } from "react";
import "../Styling/Authentication.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {setIsAuthenticated,setUserInfo} from '../../Features/AuthSlcie'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'


export default function AuthenticationSection() {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [fromData,setformData] = useState({
    firstName: "",
    lastName:"",
    email:"",
    password:""
  })
  const { mode } = useParams();
  const isSignUp = mode === "SignUp";

  async function  handleOnSubmit(e) {
    e.preventDefault()
    try{
      if(isSignUp){
        const response = await axios.post("http://localhost:3000/user/Auth/signUp",fromData)
        if(response.status == 200){
          navigate('/Auth/SignIn')
        }
      }else{
        const response = await axios.post("http://localhost:3000/user/Auth/signIn",fromData,{withCredentials:true})
        if(response.status == 200){
          navigate('/user/Home')
        }
      }
    }
    catch(e){
      console.error(e)
    }
  }

  function handleOnChange(e){
    const {name,value} = e.target
    setformData((prev) => ({
      ...prev,
      [name]:value
    }))
  }
  
  return (
    <div className="container">
      <div className="content">
        <div className="form-div">
          <div className="heading">
            <h1>
              Lets <br />
              Start Tracking
            </h1>
            <p>Please login or Sign up to continue</p>
          </div>
          <form onSubmit={handleOnSubmit}>
            { isSignUp && <input
              type="text"
              id="formInput"
              placeholder="First Name"
              name="firstName"
              onChange={handleOnChange}
              required
            />}
            {isSignUp && (
              <input type="text" id="formInput1" placeholder="Last Name" name="lastName" onChange={handleOnChange} />
            )}
            <input type="email" id="formInput2" placeholder="Email" name="email" onChange={handleOnChange} />
            <input type="password" id="formInput3" placeholder="Password" name="password" onChange={handleOnChange} />
            <input type="submit" />
          </form>
          <div className="toogle-page">
            {isSignUp ? (
              <p>
                Already have an account? <Link to="/Auth/SignIn">SignIn</Link>
              </p>
            ) : (
              <p>
                Don't have an account? <Link to="/Auth/SignUp">SignUp</Link>
              </p>
            )}
          </div>
        </div>
        <div className="auth-img">
          <img src="https://64.media.tumblr.com/95f98a1381686696a672f47b9909a65c/c348a86aefec32ba-da/s540x810/e173bacc72c3142d02ad128bca691c1aaa11a22a.jpg" alt=""  />
        </div>
      </div>
    </div>
  );
}
