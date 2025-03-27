/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-27 16:35:41
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

// import './Header.css';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import userIcon from '../../assets/user.svg';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUser, logout } from '../../features/user/userSlice';

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
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = () => {
    if (!user) {
      navigate('/login');
    } else {
      setIsModalOpen(true);
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    setIsModalOpen(false);
  }

  const handleChangePassword = () => {
    console.log("change password");
    setIsModalOpen(false);
  }

  return (
    <div>
    <div className='flex items-center justify-center h-[50px] relative' onClick={handleLogin}>
      { user && <div className='text-sm font-light text-gray-700 italic mr-2'>Welcome, {user.name}</div> }
      <img className='w-[30px] h-[30px]' src={userIcon} alt="user" />
    </div>
    <Modal isOpen={isModalOpen} onClose={() => {
      setIsModalOpen(false);
    }}>
      <div className='text-[12px] font-normal p-2 border-b border-gray-400 hover:bg-gray-300' onClick={handleChangePassword}>Change password</div>
      <div className='text-[12px] font-normal p-2  hover:bg-gray-300' onClick={handleLogout}>Logout</div>
    </Modal>
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    // 蒙版层（点击关闭弹窗）
    <div className="fixed inset-0 z-100" onClick={onClose}>
      {/* 弹窗内容（阻止事件冒泡） */}
      <div className="absolute top-[70px] right-[10px] bg-gray-200 rounded-md  border-gray-400 p-2" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};