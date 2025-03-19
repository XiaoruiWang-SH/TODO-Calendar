/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-15 14:27:32
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-19 17:27:04
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { ItemData } from '../../data/ItemData';
import { DisplayMode } from '../../features/calendar/calendarSlice';
export interface DayTasksProps {
    tasks: Map<string, ItemData[]>;
    displayMode: DisplayMode;
};

export interface TaskItemProps {
    dataItem: ItemData;
};


export interface CurrentDateProps {
    year: string;
    month: string;
    day: string;
};

export interface HeaderProps {
    year: string;
    month: string;
    day: string;
    handleSwitcher: (action: string) => void;
    handleDisplaySwitcher: (action: string) => void;
};

export interface DateRangeProps {
    startDate: string;
    endDate: string;
};

export interface SwitcherProps {
    onGoBack: () => void;
    onGoForward: () => void;
    onToday: () => void;
};

export interface DisplaySwitcherProps {
    onList: () => void;
    onGrid: () => void;
};