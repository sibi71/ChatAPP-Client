import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import { Avatar ,IconButton} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, logout } from '../../Slices/UserSlice'
import { Chat, DonutLarge, MoreVert, SearchOutlined} from "@mui/icons-material"
import Sidebarchat from '../Sidebarchat/Sidebarchat'
import axios from "../../axios"
import Pusher from 'pusher-js'
import {signOut} from "firebase/auth"
import { auth} from "../../firebase"
const Sidebar = () => {
    const user = useSelector(getUser)
    const [rooms ,setRooms]=useState([])
    
    const dispatch = useDispatch()

    useEffect(()=>{
        axios.get("/rooms/all/rooms").then((res)=>{
            setRooms(res.data)
        })
       
    },[])
    useEffect(()=>{
        const  pusher = new Pusher('788bf949774a072c8787', {
            cluster: 'ap2'
          });

          const channel = pusher.subscribe('rooms');
          channel.bind('inserted', function(room) {
            setRooms((prevRoom)=>[...prevRoom,room])
          });


    },[])

    const handleLogout = async()=>{
        dispatch(logout())
        await signOut(auth)
      }
  return (
    <div className='sidebar'>
        <div className='sidebar__header'>
            <Avatar src={user.photoURL} onClick={handleLogout} className='sidebar__profile' />
            <div className='sidebar__headerRight'>
                <IconButton >
                    <DonutLarge />
                </IconButton>
                <IconButton >
                    <Chat />
                </IconButton>
                <IconButton >
                    <MoreVert />
                </IconButton>
            </div>
        </div>
        <div className='sidebar__search'>
            <div className='sidebar__searchContainer'>
                <SearchOutlined />
                <input placeholder='Search of start new chat' />
            </div>
        </div>
        <div className='sidebar__chats'>
            <Sidebarchat addnewchat/>
            {
                rooms.map((room)=>{
                    return (
                    <Sidebarchat key={room._id} id={room._id} name={room.name}/>
                    )
                })
            }
            

        </div>
    </div>
  )
}

export default Sidebar