/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-19 13:42:23
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */


import { List } from '../list/List';
import { Input } from '../input/Input';
import { ListProps } from '../list/List.type';
import { useLocation } from 'react-router';

export function Container() {
    const location = useLocation();
    const date = location.state?.date || new Date().toDateString();
    console.log('Navigation state:', { date });
    
    return (
        <div>
            <Input />
            <List date={date} />
        </div>
    );
}
