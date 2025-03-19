/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 15:15:11
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-19 15:35:22
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { CurrentDateProps } from './Calendar.types';
export const getToday = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};


export const getCurrentDate = (): CurrentDateProps => {
    const today = new Date();
    return {
        year: today.getFullYear().toString(),
        month: today.toLocaleString("en-US", { month: "short" }), // "Feb",
        day: today.getDate().toString()
    };
};

export const getCurrentWeekDatesArray = (): Date[] => {
    const today = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());
    
    const weekDates: Date[] = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(sunday);
        day.setDate(sunday.getDate() + i);
        weekDates.push(day);
    }
    return weekDates;
};

export const getLastWeekDatesArray = (currentWeekDates: Date[]): Date[] => {
    const lastWeekDates: Date[] = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(currentWeekDates[i]);
        day.setDate(currentWeekDates[i].getDate() - 7);
        lastWeekDates.push(day);
    }
    return lastWeekDates;
}

export const getNextWeekDatesArray = (currentWeekDates: Date[]): Date[] => {
    const nextWeekDates: Date[] = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(currentWeekDates[i]);
        day.setDate(currentWeekDates[i].getDate() + 7);
        nextWeekDates.push(day);
    }
    return nextWeekDates;
}