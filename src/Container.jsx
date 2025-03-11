import { useState, useReducer, useContext, createContext } from 'react';
import List from './List';
import Input from './Input';
import './container.css';
import ItemData from './ItemData';


export default function Container() {

    const [normalTasks, normalDispatch] = useReducer(normalTasksReducer, normalInitialTasks);
    const [completedTasks, completedDispatch] = useReducer(completeTasksReducer, completedInitialTasks);

    function addTask(task) {
        console.log(`add task ${task}`);
        taskid++;
        const newItem = new ItemData(taskid, task, false, false, new Date(), null);
        if (newItem.important) {
            normalDispatch({
                type: 'addtotop',
                task: newItem
            });
        } else {
            normalDispatch({
                type: 'add',
                task: newItem
            });
        }
    }

    return (
        <NormalTasksContext.Provider value={{normalTasks, normalDispatch}}>
            <CompletedTasksContext.Provider value={{completedTasks, completedDispatch}}>
                <div className='container'>
                    <Input addtask={addTask} />
                    <List />
                </div>
            </CompletedTasksContext.Provider>
        </NormalTasksContext.Provider>
        
    );
}



export function normalTasksReducer(tasks, action){
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

export function completeTasksReducer(tasks, action){
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

let taskid = 0;
const normalInitialTasks = [];
const completedInitialTasks = [];

export const NormalTasksContext = createContext(null)
export const CompletedTasksContext = createContext(null)