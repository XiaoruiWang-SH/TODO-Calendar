/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-19 16:37:15
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-19 16:56:59
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */


import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import {ItemData} from '../../data/ItemData';
import { RootState } from '../../app/store';
import { CurrentDateProps } from '../../components/calendar/Calendar.types';

export interface CalendarState {
    selectDate: Date;
    currentDate: CurrentDateProps;
    currentWeekDates: Date[];
    tasksMap: Record<string, ItemData[]>;
}

const initialCalendarState: CalendarState = {
    selectDate: new Date(),
    currentDate: {year: "", month: "", day: ""},
    currentWeekDates: [],
    tasksMap: {}
};

export const selectCalendarState = (state: RootState) => state.calendar;

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: initialCalendarState,
    reducers: {
        setSelectDate: (state, action: PayloadAction<Date>) => {
            state.selectDate = action.payload;
        },
        setCurrentDate: (state, action: PayloadAction<{year: string, month: string, day: string}>) => {
            state.currentDate = action.payload;
        },
        setCurrentWeekDates: (state, action: PayloadAction<Date[]>) => {
            state.currentWeekDates = action.payload;
        },
        setTasksMap: (state, action: PayloadAction<Record<string, ItemData[]>>) => {
            state.tasksMap = action.payload;
        }
    }
});

export const { setSelectDate, setCurrentDate, setCurrentWeekDates, setTasksMap } = calendarSlice.actions;
export const calendarReducer = calendarSlice.reducer;