import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { useSelector} from "react-redux"
import {getUser} from "../../Slices/UserSlice"
import { Avatar, IconButton } from "@mui/material"
import axios from "../../axios"
import { useParams } from 'react-router-dom'
import Pusher from "pusher-js"
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined,Send } from "@mui/icons-material"
const Chat = () => {
  const user = useSelector(getUser)
  const [seed,setSeed] = useState("")
  const [input,setInput]=useState("")
  const [roomName ,setRoomName] = useState("")
  const [updatedAt , setUpdatedAt] = useState("")
  const [msg,setMsg]=useState([])
  const {roomId} = useParams()
  
  useEffect(()=>{
    if(roomId){
      axios.get(`/rooms/${roomId}`).then((res)=>{
        setRoomName(res.data.name)
        setUpdatedAt(res.data.updatedAt)
      })
      axios.get(`/rooms/msg/${roomId}`).then((res)=>{
        setMsg(res.data)
       
      })
    }
  },[roomId])

  useEffect (()=>{
      setSeed(Math.floor(Math.random()*5000))
  },[])
  useEffect(()=>{
    const  pusher = new Pusher('788bf949774a072c8787', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(message) {
      setMsg((prevMsg)=>[...prevMsg,message])

    });
  },[])


  const sendMessage = async(e)=>{
    e.preventDefault();
    console.log(input);
    if(!input){
      return
    }
    await axios.post("/rooms/messages/new",{
      name:user.displayName,
      message:input,
      timestamp:new Date(),
      uid:user.uid,
      roomId:roomId,
    });
    setInput("")
  }


  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg `}/>
        <div className='chat__headerInfo'>
          <h3>{roomName?roomName:"welcome to Whatsapp"}</h3>
          <p>{updatedAt ?
          `Last updated at ${new Date(updatedAt).toString().slice(0,25)}`: "CLick on any group"}
          </p>
        </div>
        <div className='chat__headerRight'>
          <IconButton >
            <SearchOutlined />
          </IconButton>
          <IconButton >
            <AttachFile />
          </IconButton>
          <IconButton >
            <MoreVert />
          </IconButton>
        </div>
        </div>
        <div className='chat__body'>
          {
            msg.map((message,index)=>{
              return(
                <p className={`chat__msg ${message.uid === user.uid && "chat__receiver"}`} key={index}>
                <span className='chat__name'>
                 <h6>{message.name}</h6>
                </span>
                  {message.message}
                <span className='chat__timestamp'>
                  {new Date(message.timestamp).toString().slice(0,25)}
                </span>
                </p>
              )
            })
          }
          
        </div>
        { roomName && <div className='chat__footer'>
          <IconButton >
          <InsertEmoticon />
          </IconButton>
          <form>
            <input placeholder='Type a message' onChange={e=>setInput(e.target.value)}/>
            <button onClick={sendMessage}><Send/></button>
          </form>

        </div>
          } 
      

    </div>
  )
}

export default Chat