/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-15 14:27:32
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-17 15:28:17
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { ItemData } from '../../data/ItemData';

export interface DayItemProps {
    item: string[];
    date: string;
};

export interface DataItemProps {
    dataItem: ItemData;
};

export interface HeaderProps {
    titles: string[];
    tasks: ItemData[][];
};