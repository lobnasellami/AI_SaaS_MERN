import React, { useRef, useState,useEffect,useLayoutEffect } from 'react'
import { Box, Avatar, Typography, Button, IconButton} from '@mui/material'
import { red} from '@mui/material/colors'
import { useAuth } from '../contexts/AuthContext'
import ChatItem from '../components/chat/ChatItem'
import { IoMdSend } from 'react-icons/io'
import {toast} from "react-hot-toast"

import { sendChatRequest,getUserChats } from '../helpers/api-communicator'
type Message ={
  role:"user"| "assistant";
  content : string;
}

const Chat = () => {
  const inputRef=useRef <HTMLInputElement|null>(null)
  const auth =useAuth()
  const [chatMessages,setChatMessages]=useState<Message[]>([])

  const handleSubmit= async ()=>{
    const content = inputRef.current?.value as string ;
    if(inputRef && inputRef.current){
      inputRef.current.value=""
    }
    console.log(content)
    const newMessage:Message ={role:'user',content:content}
    setChatMessages((prev)=>[...prev, newMessage])
    const chatData= await sendChatRequest (content);
    setChatMessages([...chatData.chats])

  }
 
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  return (
    <Box sx={{display: "flex",flex: 1,width: "100%",height: "100%",mt: 3,gap: 3,}}>
      <Box sx={{display: { md: "flex", xs: "none", sm: "none" },flex: 0.2,flexDirection: "column",}}>
          <Box sx={{display: "flex",width: "100%",height: "60vh",bgcolor: "rgb(17,29,39)",borderRadius: 5,flexDirection: "column",mx: 3,}}> 
                <Avatar sx={{mx: "auto",my: 2,bgcolor: "white",color: "black",fontWeight: 700,}}>
                 
                  {auth?.user?.name[0]}
                  {auth?.user?.name.split(" ")[1]}
                </Avatar>
                <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
                  You are talking to a ChatBOT
                </Typography>
                <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
                  Feel free to inquire about a wide range of topics, including business,
                  education, and knowledge. However, please refrain from disclosing personal information.
                </Typography>
                <Button sx={{width:"200px",my:'auto',color:'white',fontWeight: 700,borderRadius:3,mx:"auto",bgcolor:red[300],":hover" :{bgcolor:red.A400 }}}>
                  CLEAR CONVERSATION
                </Button>  
          </Box>
      </Box>
      <Box  sx={{display: "flex",flex: { md: 0.8, xs: 1, sm: 1 },flexDirection: "column",px: 3,}}>
            <Typography sx={{fontSize: "40px",color: "white",mb: 2,mx: "auto",fontWeight: "600",}}>
            Model - GPT 3.5 Turbo
            </Typography>
            <Box sx={{width: "100%",height: "60vh",borderRadius: 3,mx: "auto",display: "flex",flexDirection: "column",
            overflow: "scroll",overflowX: "hidden",overflowY: "auto",scrollBehavior: "smooth",}}> 
          { 
          chatMessages.map((chat,index) => ( 
            //@ts-ignore
          <ChatItem content={chat.content} role={chat.role} key={index} />
          )
            )}</Box>
            <div style={{width:"100%",padding:"20px",borderRadius:8,backgroundColor:"rgb(17,27,39)",display:"flex",marginRight:"auto"}}>
            <input ref={inputRef} type="text" style={{width:"100%",backgroundColor:"transparent",padding:"10px",border:"none",outline:"none",color:"white",fontSize:"20px"}} />
              <IconButton onClick={handleSubmit} sx={{mx:1,color:"white"}} ><IoMdSend/></IconButton>
            </div>


      </Box>
    </Box>
  )}
export default Chat