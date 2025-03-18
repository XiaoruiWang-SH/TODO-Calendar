/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-18 16:09:05
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */



import { List } from '../list/List';
import { Input } from '../input/Input';
import { ListProps } from '../list/List.type';

export function Container() {
    return (
        <div>
            <Input />
            <List day={"18"} />
        </div>
    );
}
