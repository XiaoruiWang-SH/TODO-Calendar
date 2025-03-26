/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-19 16:37:15
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-26 20:54:51
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */


import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import {ItemData} from '../../data/ItemData';
import { RootState } from '../../app/store';
import { CurrentDateProps } from '../../components/calendar/Calendar.types';

export enum DisplayMode {
    WEEK = "week",
    MONTH = "month",
}

export interface CalendarState {
    selectDate: string;
    currentDate: CurrentDateProps;
    currentRangeDates: string[];
    tasksMap: Record<string, ItemData[]>;
    displayMode: DisplayMode;
}

const initialCalendarState: CalendarState = {
    selectDate: new Date().toISOString(),
    currentDate: {year: "", month: "", day: ""},
    currentRangeDates: [],
    tasksMap: {},
    displayMode: DisplayMode.MONTH
};

export const selectCalendarState = (state: RootState) => state.calendar;

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: initialCalendarState,
    reducers: {
        setSelectDate: (state, action: PayloadAction<string>) => {
            state.selectDate = action.payload;
        },
        setCurrentDate: (state, action: PayloadAction<{year: string, month: string, day: string}>) => {
            state.currentDate = action.payload;
        },
        setCurrentRangeDates: (state, action: PayloadAction<string[]>) => {
            state.currentRangeDates = action.payload;
        },
        setTasksMap: (state, action: PayloadAction<Record<string, ItemData[]>>) => {
            state.tasksMap = action.payload;
        },
        setDisplayMode: (state, action: PayloadAction<DisplayMode>) => {
            state.displayMode = action.payload;
        }
    }
});

export const { setSelectDate, setCurrentDate, setCurrentRangeDates, setTasksMap, setDisplayMode } = calendarSlice.actions;
export const calendarReducer = calendarSlice.reducer;