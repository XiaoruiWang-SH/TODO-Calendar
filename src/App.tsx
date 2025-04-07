/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-06 14:18:38
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */



import { Header } from './components/header/Header';
import { Outlet } from 'react-router';
import { MyAppNav } from './Nav';
import { setUser } from './features/user/userSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const user = localStorage.getItem('user');
  if (user) {
    console.log("user: ", user);
    dispatch(setUser(JSON.parse(user)));
  } else {
    console.log("no user");
  }
  return (
    <div className='text-start bg-gray-100 font-sans text-gray-900 font-medium'>
      <Header />
      {/* <MyAppNav /> */}
      <Outlet />
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  )
}


export default App

