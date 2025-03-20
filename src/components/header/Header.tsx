/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-20 16:10:04
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

// import './Header.css';
import { FC } from 'react';
import { useNavigate } from 'react-router';

export const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <div className='text-3xl font-bold text-start bg-gray-100 py-5 px-5 border-b border-gray-200'>
      <h1>ToDo Calendar</h1>
      {/* <button className='border border-gray-400 hover:bg-gray-400 active:bg-gray-600 text-gray-900 hover:text-white active:text-white text-sm px-2 py-1 rounded-md font-normal' 
      onClick={() => navigate('/task', { state: { date: new Date().toDateString() } })}> Jump to task</button> */}
    </div>
  );
}
