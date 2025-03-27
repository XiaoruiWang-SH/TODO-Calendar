/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 11:37:59
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-27 14:29:50
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */
import { configureStore } from '@reduxjs/toolkit';
import { normalTasksReducer } from '../features/task/taskSlice';
import { completedTasksReducer } from '../features/task/taskSlice';
import { calendarReducer } from '../features/calendar/calendarSlice';
import { userReducer } from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        normalTasks: normalTasksReducer,
        completedTasks: completedTasksReducer,
        calendar: calendarReducer,
        user: userReducer,
    }
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

