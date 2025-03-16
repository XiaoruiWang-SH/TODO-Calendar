/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-15 16:39:59
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

// import './Header.css';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <div className='text-3xl font-bold text-start my-5'>
      <h1>ToDo List</h1>
    </div>
  );
}
