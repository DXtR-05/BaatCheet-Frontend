import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import io from "socket.io-client";
import { setOnlineUsers } from './redux/userSlice';
import { setSocket } from './redux/socketSlice';
import { baseurl } from './urls.js';

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },

])

function App() {

  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(authUser){
      const socket = io(`${baseurl}`, {
          query:{
            userId:authUser._id
          }
      });
      dispatch(setSocket(socket));

      socket?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socket.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }

  },[authUser]);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;