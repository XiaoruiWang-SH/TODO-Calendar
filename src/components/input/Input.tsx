/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-27 17:30:59
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { useState, useRef, JSX, FC, useEffect } from 'react';
import './input.css';
import icon_plus from '../../assets/icon_plus.svg';
import { ItemData } from '../../data/ItemData';
import { ComponentInputProps } from './Input.types'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { add_normal, change_importance } from '../../features/task/taskSlice';
import { addItem } from '../../data/api_task';
import { selectCalendarState } from '../../features/calendar/calendarSlice';
import { selectUser } from '../../features/user/userSlice';

export const Input: FC = () => {
    const dispatch = useAppDispatch();
    const calendarState = useAppSelector(selectCalendarState);
    const user = useAppSelector(selectUser);
    const { selectDate} = calendarState;
    
    const [task, setTask] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isHiden, setIsHiden] = useState<boolean>(true);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = '';
            setTask('');
        }
        setIsHiden(true);
        setIsDisabled(true);    
    }, [selectDate]);

    const addTask = async () => {
        if (task === '' || !user) {
            return;
        }
        console.log(`add task ${task}`);
        const newItem: ItemData = {
            id: 0,
            name: task,
            checked: false,
            important: false,
            createTime: new Date().toISOString(),
            expireTime: null,
            updateTime: new Date().toISOString(),
            createDate: new Date().toISOString()
        };
        const result: number = await addItem(newItem, user.id);
        if (result != -1) {
            const insertedItem: ItemData = {...newItem, id: result};
            console.log(`insertedItem: ${JSON.stringify(insertedItem)}`);
            dispatch(add_normal(insertedItem));
        }
        
        setTask('');
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
        setIsDisabled(e.target.value === '');
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (isDisabled) {
            return;
        }
        if (event.key === "Enter") {
            addTask();
        }
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsHiden(false);
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        // setTimeout(() => {
        //     // setIsHiden(true);
        // }, 200);
    }

    return (
        <>
            <div className={`bg-white px-4 py-2 border border-gray-200 rounded-t-md ${isHiden ? 'rounded-b-md' : ''}`}>
                <ComponentInput 
                    inputRef={inputRef} 
                    task={task} 
                    handleInputChange={handleInputChange} 
                    handleKeyDown={handleKeyDown} 
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                />
            </div>
            {
                !isHiden && (
                    <div className='bg-gray-100 px-4 py-2 border-b border-x border-gray-200 rounded-b-md'>
                        <button className='px-2 py-1 text-xs outline-none border disabled:border-gray-400 disabled:text-gray-400  border-gray-700 text-gray-700 rounded-sm disabled:opacity-50' onClick={addTask} disabled={isDisabled}>Add to</button>
                    </div>
                )
            }
        </>
    );
}

const ComponentInput: React.FC<ComponentInputProps> = ({
    inputRef, 
    task, 
    handleInputChange, 
    handleKeyDown, 
    handleFocus,
    handleBlur
}: ComponentInputProps): JSX.Element => {
    return (
        <div className='componentInput'>
            <img src={icon_plus} className='icon_plus' alt='icon_plus' />
            <input 
                ref={inputRef} 
                className='addtask' 
                type="text" 
                placeholder="Add a task" 
                value={task} 
                onChange={handleInputChange} 
                onKeyDown={handleKeyDown} 
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    );
}
