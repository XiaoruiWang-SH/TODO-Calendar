/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-13 16:32:19
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { useState, useReducer, useContext, createContext, ReactNode, JSX, FC } from 'react';
import ItemData from '../../data/ItemData';
import { DataContextType, DataAction, TasksProviderProps} from './Context.types'


const NormalTasksContext = createContext<DataContextType | undefined>(undefined);
const CompletedTasksContext = createContext<DataContextType | undefined>(undefined);

export const NormalTasksProvider: FC<TasksProviderProps> = ({ children }) => {
    const tasksReducer = (tasks: ItemData[], action: DataAction) => {
        switch (action.type) {
            case 'add': {
                return [
                    ...tasks,
                    action.task
                ];
            }
            case 'addtotop': {
                return [
                    action.task,
                    ...tasks
                ];
            }
            case 'liftup': {
                const newlist = tasks.filter((t) => t.id !== action.task.id);
                return [action.task, ...newlist];
            }
            case 'liftdown': {
                const newlist = tasks.filter((t) => t.id !== action.task.id);
                return [...newlist, action.task];
            }
            case 'complete': {
                return tasks.filter((t) => t.id !== action.task.id);
            }
            default: {
                throw Error('unknown action: ' + action.type);
            }
        }
    }  

    const [tasks, dispatch] = useReducer(tasksReducer, []);

    return (
        <NormalTasksContext.Provider value={{ tasks, dispatch }}>
            {children}
        </NormalTasksContext.Provider>
    );
  };

  export const CompletedTasksProvider: FC<TasksProviderProps> = ({children}) => {
    const tasksReducer = (tasks: ItemData[], action: DataAction) => {
        switch (action.type) {
            case 'add': {
                return [
                    action.task,
                    ...tasks
                ];
            }
            case 'undo': {
                return tasks.filter((t) => t.id !== action.id);
            }
            default: {
                throw Error('unknown action: ' + action.type);
            }
        }
    }

    const [tasks, dispatch] = useReducer(tasksReducer, []);

    return (
        <CompletedTasksContext.Provider value={{ tasks, dispatch }}>
          {children}
        </CompletedTasksContext.Provider>
      );
  }  

  export const useNormalTasks = () => useContext(NormalTasksContext)!;
  export const useCompletedTasks = () => useContext(CompletedTasksContext)!;
