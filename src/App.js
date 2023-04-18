import React, { useEffect } from 'react'
import "./App.css"
import Login from './components/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, logout, setUser } from './Slices/UserSlice'
import {BrowserRouter as Router ,Routes,Route } from "react-router-dom"
import Chat from './components/Chat/Chat'
import Sidebar from './components/Sidebar/Sidebar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

const App = () => {

  const user = useSelector(getUser)
  const dispatch = useDispatch()
  useEffect(()=>{
    onAuthStateChanged(auth,(users)=>{
      if(users){
        dispatch(setUser(users))
      }
      else{
        dispatch(logout())
      }
    })
  },[dispatch])
  return (
    <div className='app'>
      {
        !user ? <Login /> : 
        <div className='app__body'>
          <Router>
            <Sidebar />
            <Routes>
              <Route path='/' element={<Chat />} />
              <Route path='/rooms/:roomId' element={<Chat />} />
            </Routes>
          </Router>
          
        </div>
      }
      
    </div>
  )
}

export default App