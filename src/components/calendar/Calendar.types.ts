/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-15 14:27:32
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-19 11:11:17
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { ItemData } from '../../data/ItemData';

export interface DayTasksProps {
    tasks: Map<string, ItemData[]>;
};

export interface TaskItemProps {
    dataItem: ItemData;
};


export interface CurrentDateProps {
    year: string;
    month: string;
    day: string;
};

export interface DateRangeProps {
    startDate: string;
    endDate: string;
};