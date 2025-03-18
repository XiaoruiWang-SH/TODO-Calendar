/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 11:45:25
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-18 17:02:24
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { createSlice } from '@reduxjs/toolkit';
import { TaskState } from './task.types';
import { PayloadAction } from '@reduxjs/toolkit';
import {ItemData} from '../../data/ItemData';
import { RootState } from '../../app/store';

const initialNormalTasksState: TaskState = {
    tasks: []
};

const initialCompletedTasksState: TaskState = {
    tasks: []
};

export const selectNormalTasks = (state: RootState) => state.normalTasks.tasks;
export const selectCompletedTasks = (state: RootState) => state.completedTasks.tasks;

export const normalTasksSlice = createSlice({
    name: 'normalTasks',
    initialState: initialNormalTasksState,
    reducers: {
        add_normal: (state, action: PayloadAction<ItemData>) => {
            state.tasks.push(action.payload);
        },
        addtotop: (state, action: PayloadAction<ItemData>) => {
            state.tasks.unshift(action.payload);
        },
        liftup: (state, action: PayloadAction<ItemData>) => {
            state.tasks = state.tasks.filter((t: ItemData) => t.id !== action.payload.id);
            state.tasks.unshift(action.payload);
        },
        liftdown: (state, action: PayloadAction<ItemData>) => {
            state.tasks = state.tasks.filter((t: ItemData) => t.id !== action.payload.id);
            state.tasks.push(action.payload);
        },
        complete: (state, action: PayloadAction<ItemData>) => {
            state.tasks = state.tasks.filter((t: ItemData) => t.id !== action.payload.id);
        },
        add_normalTasks: (state, action: PayloadAction<ItemData[]>) => {
            action.payload.filter((item) => !item.checked).filter((item) => !state.tasks.some((t: ItemData) => t.id === item.id)).forEach((item) => {
                state.tasks.push(item);
            });
        }
    }
});

export const { add_normal, addtotop, liftup, liftdown, complete, add_normalTasks } = normalTasksSlice.actions;
export const normalTasksReducer = normalTasksSlice.reducer;

export const completedTasksSlice = createSlice({
    name: 'completedTasks',
    initialState: initialCompletedTasksState,
    reducers: {
        add_completed: (state, action: PayloadAction<ItemData>) => {
            state.tasks.push(action.payload);
        },
        undo: (state, action: PayloadAction<ItemData>) => {
            state.tasks = state.tasks.filter((t:ItemData) => t.id !== action.payload.id);
        },
        add_completedTasks: (state, action: PayloadAction<ItemData[]>) => {
            action.payload.filter((item) => item.checked).filter((item) => !state.tasks.some((t: ItemData) => t.id === item.id)).forEach((item) => {
                state.tasks.push(item);
            });
        }
    }
});

export const { add_completed, undo, add_completedTasks } = completedTasksSlice.actions;
export const completedTasksReducer = completedTasksSlice.reducer;