/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 11:01:54
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-13 12:07:22
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { ReactNode } from 'react';
import ItemData from '../../data/ItemData';

export interface DataAction {
    type: string;
    id: number;
    task: ItemData;
} 

export interface DataContextType {
    tasks: ItemData[];
    dispatch: React.Dispatch<DataAction>;
}

export interface TasksProviderProps {
    children: ReactNode;
}