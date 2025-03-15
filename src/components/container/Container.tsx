/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-15 15:21:27
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */


import { useState, useReducer, useContext, createContext } from 'react';
import { List } from '../list/List';
import { Input } from '../input/Input';
import { Calendar } from '../calendar/Calendar';
import './container.css';


export default function Container() {
    return (
        <div className='container'>
            <Calendar />
            {/* <Input />
            <List /> */}
        </div>
    );
}
