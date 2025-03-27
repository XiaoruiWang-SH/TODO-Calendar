/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-27 15:31:02
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

// import './Header.css';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import userIcon from '../../assets/user.svg';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/user/userSlice';

export const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center text-3xl font-bold text-start bg-gray-100 py-5 px-5 border-b border-gray-200'>
      <h1>ToDo Calendar</h1>
      <UserInfo />
      {/* <button className='border border-gray-400 hover:bg-gray-400 active:bg-gray-600 text-gray-900 hover:text-white active:text-white text-sm px-2 py-1 rounded-md font-normal' 
      onClick={() => navigate('/task', { state: { date: new Date().toDateString() } })}> Jump to task</button> */}
    </div>
  );
}

const UserInfo: FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser)!;
  return (
    <div className='flex items-center justify-center h-[50px]' onClick={() => navigate('/login')}>
      <div className='text-sm font-light text-gray-700 italic mr-2'>Welcome, {user.name}</div>
      <img className='w-[30px] h-[30px]' src={userIcon} alt="user" />
    </div>
  );
}
