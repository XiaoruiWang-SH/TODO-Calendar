import { useState } from 'react';
import { useReducer } from 'react';
import List from './List';
import Input from './Input';
import './container.css';
import ItemData from './ItemData';


export default function Container() {

    const [normalTasks, normalDispatch] = useReducer(normalTasksReducer, normalInitialTasks);
    const [completedTasks, completedDispatch] = useReducer(completeTasksReducer, completedInitialTasks);

    function taskchange(item) {
        if (item.checked) {
            normalDispatch({
                type: 'complete',
                task: item
            });

            completedDispatch({
                type: 'add',
                task: item
            });
        } else {
            normalDispatch({
                type: 'add',
                task: item
            });
            completedDispatch({
                type: 'undo',
                id: item.id
            });
        }
    }

    function handleImportanceChange(item) { 
        if (item.important) {
            normalDispatch({
                type: 'liftup',
                task: item
            });
        } else {
            normalDispatch({
                type: 'liftdown',
                task: item
            });
        }
    }

    function addTask(task) {
        console.log(`add task ${task}`);
        taskid++;

        normalDispatch({
            type: 'add',
            task: new ItemData(taskid, task, false, false, new Date(), null)
        });
    }

    return (
        <div className='container'>
            <Input addtask={addTask} />
            <List list={normalTasks} completeList={completedTasks} taskchange={taskchange} handleImportanceChange={handleImportanceChange} />
        </div>
    );
}



export function normalTasksReducer(tasks, action){
    switch (action.type) {
        case 'add': {
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