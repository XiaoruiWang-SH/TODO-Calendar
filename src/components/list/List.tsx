/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-18 16:07:24
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { JSX, useContext, useEffect, useState, FC } from 'react';
import './List.css';
import star_unselected from '../../assets/star-unselected.svg';
import star_selected from '../../assets/star-selected.svg';
import checkbox_unchecked from '../../assets/checkbox-unselected.svg';
import checkbox_checked from '../../assets/checkbox-selected.svg';
import arrow_up from '../../assets/arrow_up.svg';
import arrow_down from '../../assets/arrow_down.svg';
import {ItemData} from '../../data/ItemData';
import { ListItemProps, ItemChangeProps, ComponentCompleteHeaderProps, ListProps } from './List.type';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { add_normal, addtotop, liftup, liftdown, complete, add_completed, undo, selectNormalTasks, selectCompletedTasks } from '../../features/task/taskSlice';
import { getItemsByDay } from '../../data/api';


export const List: FC<ListProps> = ({day}) => {

    const normalTasks = useAppSelector(selectNormalTasks);
    const completedTasks = useAppSelector(selectCompletedTasks);
    const dispatch = useAppDispatch();

    const fetchItems = async () => {
        const items = await getItemsByDay(day);
        console.log(items);
        items.forEach((item) => {
            if (item.important) {
                dispatch(addtotop(item));
            } else {
                dispatch(add_normal(item));
            }
        });
    };

    useEffect(() => {
        fetchItems();
    }, [day]);

    const taskchange = (item: ItemData) => {
        if (item.checked) {
            dispatch(complete(item));
            dispatch(add_completed(item));
        } else {
            dispatch(undo(item));
            if (item.important) {
                dispatch(addtotop(item));
            } else {
                dispatch(add_normal(item));
            }
        }
    }

    const handleImportanceChange = (item: ItemData) => { 
        if (item.important) {
            dispatch(liftup(item));
        } else {
            dispatch(liftdown(item));
        }
    }

    return (
        <div className='container'>
        {normalTasks.length == 0 ? <></> : 
        <ul className='list-area'>
            {normalTasks.map((item) => 
            <li className={item.checked ? 'list-checked' : 'list-unchecked'} key={item.id}>
                <ListItem item={item} taskChange={taskchange} handleImportanceChange={handleImportanceChange} />
                </li>
            )}
        </ul>
        }
        {completedTasks.length == 0 ? 
        <></>
        :
        <ComponentComplete />}
        </div>
    );

}


const ListItem = ({item, taskChange, handleImportanceChange}: ListItemProps) => {

    const handleChange = (e: React.MouseEvent) => {
        const updatedItem = {
            ...item,
            checked: !item.checked
        };
        taskChange(updatedItem);
        e.stopPropagation();
    }

    const handleLiftUp = (e: React.MouseEvent) => {
        const updatedItem = {
            ...item,
            important: !item.important
        };
        handleImportanceChange(updatedItem);
        e.stopPropagation();
    }

    return (
        <div className='list-item'>
            <CheckBox change={item.checked} handleChange={handleChange} />
            <span>{item.name}</span>
            <LiftUPBtn change={item.important} handleChange={handleLiftUp} />

        </div>
    );
}

const CheckBox = ({change: checked, handleChange: handleChange}: ItemChangeProps) => { // 参数本质上是一个对象，这里是结构赋值

    return (
        <div className='round-checkbox' onClick={handleChange}>
            <img src={checked ? checkbox_checked : checkbox_unchecked} className='icon_checkbox' alt='icon_checkbox'/>
        </div>
    );
}

const LiftUPBtn = ({change: important,handleChange: handleLiftUp}: ItemChangeProps) => {
    return (
        <div className='liftup-btn' onClick={handleLiftUp}> 
            <img src={important ? star_selected : star_unselected} className='icon_liftup' alt='icon_liftup' />
        </div>
    );
}


const ComponentComplete = () => {
    const [hiden, setHiden] = useState<boolean>(true);
    const normalTasks = useAppSelector(selectNormalTasks);
    const completedTasks = useAppSelector(selectCompletedTasks);
    const dispatch = useAppDispatch();

    const listShowClick = () => {
        setHiden(!hiden);
    }

    const taskchange = (item: ItemData) => {
        if (item.checked) {
            dispatch(complete(item));
            dispatch(add_completed(item));
        } else {
            dispatch(undo(item));
            if (item.important) {
                dispatch(addtotop(item));
            } else {
                dispatch(add_normal(item));
            }
        }
    }

    return (
        <div className='container-complete'>
            <ComponentCompleteHeader num={completedTasks.length} hiden={hiden} listShowClick={listShowClick}/>
            {hiden ? <></> : 
            <ul className='list-area'>
                {completedTasks.map((item) => 
                <li className={item.checked ? 'list-checked' : 'list-unchecked'}
                key={item.id}>
                    <ListItem item={item} taskChange={taskchange} handleImportanceChange={()=>{}} />
                    </li>
                )}
            </ul>}
        </div>
    );
}

const ComponentCompleteHeader: FC<ComponentCompleteHeaderProps> = ({num, hiden, listShowClick}) => {
    return (
        <div className='container-complete-header' onClick={listShowClick}>
            <div className='arrow-icon'>
                <img src={hiden ? arrow_up : arrow_down} className='icon_checkbox' alt='icon_checkbox' />
            </div>
            <div>Completed</div>
             <div className='container-complete-header-num'>{num}</div>
        </div>
    );
}
