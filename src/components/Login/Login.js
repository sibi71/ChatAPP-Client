import React from 'react'
import "./Login.css"
import { Button } from "@mui/material"
import logo from "../../img/logo.png"
import { auth ,provider} from "../../firebase"
import { signInWithPopup} from "firebase/auth"
import {useDispatch} from "react-redux"
import {  setUser } from '../../Slices/UserSlice'

const Login = () => {

const dispatch = useDispatch()
  const signIn = ()=>{
        signInWithPopup(auth,provider).then((res)=>{
          dispatch(setUser(res.user))
          
        })
        .catch((err)=>{
          alert(err.message)
        })
  }
  return (
    <div className='login'>
        <div className='login__container'>
            <img  src={logo} alt='logo'/>
            <div className='login__text'>
                <h1>Sign in to whatsapp</h1>
            </div>
            <Button onClick={signIn}>Sign In with Google</Button>
        </div>
    </div>
  )
}

export default Login