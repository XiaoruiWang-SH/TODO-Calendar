/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-14 21:41:09
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { JSX, useContext, useEffect, useState, FC } from 'react';
// import './list.css';
import star_unselected from '../../assets/star-unselected.svg';
import star_selected from '../../assets/star-selected.svg';
import checkbox_unchecked from '../../assets/checkbox-unselected.svg';
import checkbox_checked from '../../assets/checkbox-selected.svg';
import arrow_up from '../../assets/arrow_up.svg';
import arrow_down from '../../assets/arrow_down.svg';
import icon_more from '../../assets/icon_more.svg';
import { ItemData } from '../../data/ItemData';
import { ListItemProps, ItemChangeProps, ComponentCompleteHeaderProps, ListProps } from './List.type';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { add_normal, change_importance, complete, add_completed, undo, add_completedTasks, add_normalTasks, selectNormalTasks, selectCompletedTasks, delete_normalTask, delete_completedTask } from '../../features/task/taskSlice';
import { getItemsByDate, updateItem, deleteItem } from '../../data/api_task';
import { setSelectDate, selectCalendarState } from '../../features/calendar/calendarSlice';
import { selectUser } from '../../features/user/userSlice';
import { toast } from 'react-toastify';

export const List = () => {

    const calendarState = useAppSelector(selectCalendarState);
    const user = useAppSelector(selectUser);
    const { selectDate } = calendarState;

    const normalTasks = useAppSelector(selectNormalTasks);
    const completedTasks = useAppSelector(selectCompletedTasks);
    const dispatch = useAppDispatch();

    const fetchItems = async (date: Date) => {
        const items = await getItemsByDate(date);
        if (items.success && items.data) {
            dispatch(add_normalTasks(items.data));
            dispatch(add_completedTasks(items.data));
        } else {
            console.error(items.message);
            toast.error(items.message);
        }
    };

    useEffect(() => {
        fetchItems(new Date(selectDate));
    }, [selectDate]);

    // const { id, updateTime, expireTime, checked, important } = req.body
    const taskchange = async (item: ItemData) => {
        const updatedItem = await updateItem(item);
        if (!updatedItem.success) {
            console.error(updatedItem.message);
            toast.error(updatedItem.message);
        }

        if (item.checked) {
            dispatch(complete(item));
            dispatch(add_completed(item));
        } else {
            dispatch(undo(item));
            dispatch(add_normal(item));
        }
    }

    const handleImportanceChange = async (item: ItemData) => {
        const updatedItem = await updateItem(item);
        if (!updatedItem.success) {
            console.error(updatedItem.message);
            toast.error(updatedItem.message);
        }
        dispatch(change_importance(item));
    }

    const handleDelete = async (item: ItemData) => {
        const updatedItem = await deleteItem(item);
        if (!updatedItem.success) {
            console.error(updatedItem.message);
            toast.error(updatedItem.message);
        }
        if (item.checked) {
            dispatch(delete_completedTask(item));
        } else {
            dispatch(delete_normalTask(item));
        }
    }

    return (
        <div>
            {normalTasks.length == 0 ? <></> :
                <ul className='my-2 md:my-4'>
                    {normalTasks.map((item) =>
                        <li className={item.checked ? 'text-gray-500 line-through' : 'line-none'} key={item.id}>
                            <ListItem item={item} taskChange={taskchange} handleImportanceChange={handleImportanceChange} handleDelete={handleDelete} />
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


const ListItem = ({ item, taskChange, handleImportanceChange, handleDelete }: ListItemProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleChange = (e: React.MouseEvent) => {
        const updatedItem = {
            ...item,
            checked: !item.checked,
            updateTime: new Date().toISOString()
        };
        taskChange(updatedItem);
        e.stopPropagation();
    }

    const handleLiftUp = (e: React.MouseEvent) => {
        const updatedItem = {
            ...item,
            important: !item.important,
            updateTime: new Date().toISOString()
        };
        handleImportanceChange(updatedItem);
        e.stopPropagation();
    }

    const handleDeleteClick = () => {
        handleDelete(item);
        setIsModalOpen(false);
        console.log('delete');
    }

    return (
        <div>
            <div className='flex justify-between items-center my-2 bg-gray-100 rounded-md py-1 md:py-2 border border-gray-200 shadow-sm'>
                <CheckBox change={item.checked} handleChange={handleChange} />
                <div className='flex-1 mr-2.5'>{item.title}</div>
                {isModalOpen ?
                    (<div className="flex items-center justify-center gap-2 mr-2.5">
                        <div className='text-[12px] font-normal text-red-500 bg-white border border-gray-300 rounded-sm hover:border-gray-500 text-center py-1 px-2' onClick={handleDeleteClick}>Delete</div>
                        <div className='text-[13px] font-normal text-blue-600' onClick={() => setIsModalOpen(false)}>Cancel</div>
                    </div>
                    ) : (
                        <div className='flex items-center justify-center gap-2'>
                            <LiftUPBtn change={item.important} handleChange={handleLiftUp} />
                            <button className='w-6 md:w-8 h-full flex items-center justify-center'
                                onClick={() => {setIsModalOpen(true);}}
                            >
                                <img src={icon_more} className='w-5 md:w-6' alt='icon_more' />
                            </button>
                        </div>)
                }
            </div>
        </div>

    );
}

const CheckBox = ({ change: checked, handleChange: handleChange }: ItemChangeProps) => { // 参数本质上是一个对象，这里是结构赋值

    return (
        <div className='flex items-center justify-center w-7 h-full ml-1 md:mx-2.5' onClick={handleChange}>
            <img src={checked ? checkbox_checked : checkbox_unchecked} className='w-4 md:w-5' alt='icon_checkbox' />
        </div>
    );
}

const LiftUPBtn = ({ change: important, handleChange: handleLiftUp }: ItemChangeProps) => {
    return (
        <div className='flex items-center justify-center w-6 md:w-8 h-full' onClick={handleLiftUp}>
            <img src={important ? star_selected : star_unselected} className='w-5 md:w-6' alt='icon_liftup' />
        </div>
    );
}


const ComponentComplete = () => {
    const [hiden, setHiden] = useState<boolean>(true);
    const normalTasks = useAppSelector(selectNormalTasks);
    const completedTasks = useAppSelector(selectCompletedTasks);
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const listShowClick = () => {
        setHiden(!hiden);
    }

    const taskchange = async (item: ItemData) => {
        const updatedItem = await updateItem(item);
        if (!updatedItem.success) {
            console.error(updatedItem.message);
            toast.error(updatedItem.message);
        }

        if (item.checked) {
            dispatch(complete(item));
            dispatch(add_completed(item));
        } else {
            dispatch(undo(item));
            dispatch(add_normal(item));
        }
    }

    return (
        <div>
            <ComponentCompleteHeader num={completedTasks.length} hiden={hiden} listShowClick={listShowClick} />
            {hiden ? <></> :
                <ul>
                    {completedTasks.map((item) =>
                        <li className={item.checked ? 'list-checked' : 'list-unchecked'}
                            key={item.id}>
                            <ListItem item={item} taskChange={taskchange} handleImportanceChange={() => { }} handleDelete={() => { }} />
                        </li>
                    )}
                </ul>}
        </div>
    );
}

const ComponentCompleteHeader: FC<ComponentCompleteHeaderProps> = ({ num, hiden, listShowClick }) => {
    return (
        <div className='flex items-center justify-start mt-2' onClick={listShowClick}>
            <div className='arrow-icon'>
                <img src={hiden ? arrow_up : arrow_down} className='w-6 md:w-7' alt='icon_checkbox' />
            </div>
            <div className='text-gray-500'>Completed</div>
            <div className='mx-2 text-gray-600'>({num})</div>
        </div>
    );
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100" onClick={onClose}>
            <div className="absolute md:top-[70px] top-[50px] right-[10px] bg-gray-200 rounded-md  border-gray-400 p-2  shadow-lg shadow-gray-400" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};