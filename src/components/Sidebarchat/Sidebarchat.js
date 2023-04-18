import React, { useEffect, useState } from 'react'
import "./Sidebarchat.css"
import { Avatar } from '@mui/material'
import axios from "../../axios"
import { Link } from "react-router-dom"

const Sidebarchat = ({addnewchat,name,id}) => {
    const [seed,setSeed] = useState("")

    useEffect (()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[])

    const createChat = async(e)=>{
      e.preventDefault();
      const roomName = prompt("Please enater name for the group")
      if(roomName){
        try {
           await axios.post("/rooms/group/create",{
            groupName:roomName,
          })
        } catch (error) {
          console.log(error);
          
        }
      }
    }
  return !addnewchat ? (
    <Link to={`/rooms/${id}`} >
    <div className='sidebarchat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg `}/>
        <div className='sidebarchat__info'>
            <h2>{name}</h2>
        </div>

    </div>
    </Link>
  ):(
    <div className='sidebarchat sidebarchat__addgroup' onClick={createChat}>
         <h2>add new chat</h2>
    </div>
  )
}

export default Sidebarchat