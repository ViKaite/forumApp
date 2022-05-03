import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import Header from './components/Header';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import AllUsers from './pages/AllUsers';
import ChangeAvatar from './pages/ChangeAvatar';
import CreateTopic from './pages/CreateTopic';
import SingleTopic from './components/SingleTopic';
import CreatePost from './components/CreatePost';
import Favorites from './pages/Favorites';
import MyAccount from './pages/MyAccount';
import NotificationsModal from './modals/NotificationsModal';
import './App.css';
import http from './plugins/http';

import io from "socket.io-client" ;
const socket = io.connect("http://localhost:4000")

function App() {
  const divStyle = {
    width: "100%",
    minHeight: "100vh",
    marginTop: "0px",
    padding: "20px",
    backgroundColor: "lightgray",
  };

  const [toolbar, setToolbar] = useState((true))
  const [message, setMessage] = useState("")
  const [thisUser, setThisUser] = useState({username:"", photo:""})
  const [allusers, setAllUsers] =useState([])
  const [notifications,setNotifications] = useState([])
  const [notificationModal, setNotificationModal] =useState(false)
  const [infoFromServer, setInfoFromServer] = useState("")

  if (!localStorage.getItem('favoritesTopic')) localStorage.setItem('favoritesTopic', JSON.stringify([]));

  useEffect(()=>{
    getAllUsers()

  },[])

  useEffect(()=>{
    getNewNotifications()

  },[thisUser])


  const getAllUsers = async() =>{
    const res = await http.get('allusers')
    setAllUsers(res.allUsers)
  }
  const getNewNotifications = async()=>{
    const res =await http.get('getnotifications')

    if(res.success){
      setNotifications(res.activeNotifications)
      setNotificationModal(true)
    }

  }

  useEffect(() => {
    socket.on('infoToAll', message => {

      setInfoFromServer(message+' (close)');
    });
    return () => socket.off('infoToAll');
  }, [socket, message]);

  return (
      <div className="App" style={divStyle}>

        <BrowserRouter>

          <Header toolbar={toolbar} setToolbar={setToolbar} setMessage={setMessage} thisUser={thisUser} setThisUser={setThisUser}/>

          <div onClick={()=>setInfoFromServer("")} className="pointer socketmsg">
            <i>{infoFromServer}</i>
          </div>

          <Routes>
            <Route path="/" element={<Main/>}></Route>
            <Route path="/login" element={<Login toolbar={toolbar} setToolbar={setToolbar}
                                                 message={message} setMessage={setMessage}
                                                 setThisUser={setThisUser}/>}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/allusers" element ={<AllUsers allusers={allusers} />} ></Route>
            <Route path="/changeavatar" element ={<ChangeAvatar />} ></Route>
            <Route path="/createtopic" element={<CreateTopic socket={socket}/>}/>
            <Route path="/createpost/:id" element={<CreatePost socket={socket} thisUser={thisUser}/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/myaccount" element={<MyAccount thisUser={thisUser}/>}/>
            <Route path="/singletopic/:id" element={<SingleTopic socket={socket} thisUser={thisUser} allusers={allusers}/>}/>
          </Routes>
        </BrowserRouter>
        {notificationModal && <NotificationsModal notifications={notifications} setNotificationModal={setNotificationModal}/>}
      </div>
  );
}

export default App;