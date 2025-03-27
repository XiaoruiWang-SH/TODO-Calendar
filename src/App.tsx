/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-27 15:21:52
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */



import { Header } from './components/header/Header';
import { Outlet } from 'react-router';
import { MyAppNav } from './Nav';
import { setUser } from './features/user/userSlice';
import { useDispatch } from 'react-redux';

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
    </div>
  )
}


export default App

