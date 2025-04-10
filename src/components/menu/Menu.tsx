/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-20 14:34:54
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-10 11:35:12
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { DayTasksProps } from '../calendar/Calendar.types';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DisplayMode, selectCalendarState, setCurrentDate, setCurrentRangeDates, setTasksMap, setDisplayMode, setSelectDate } from '../../features/calendar/calendarSlice';
import { getToday, getCurrentDate, getCurrentRangeDatesArray, getLastRangeDatesArray, getNextRangeDatesArray, complementMonthDiaplayDates, IsValidDate } from '../calendar/util';
import { TaskItem } from '../calendar/Calendar';
import close from '../../assets/close.svg';
import arrow_last from '../../assets/arrow_last.svg';
import arrow_next from '../../assets/arrow_next.svg';
import { toast } from 'react-toastify';
import { selectUser } from '../../features/user/userSlice';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export const Menu = ({ tasks, displayMode, handleDisplayMenu, handleSwitcher }: DayTasksProps) => {
    return (
        <div className='mx-5'>
            <Header handleDisplayMenu={handleDisplayMenu} />
            <MenuItem>
                <DayBlocks tasks={tasks} displayMode={displayMode} handleDisplayMenu={handleDisplayMenu} handleSwitcher={handleSwitcher} />
            </MenuItem>
        </div>
    );
}

const MenuItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='border-t border-gray-200'>
            {children}
        </div>
    );
}

const DayBlocks = ({ tasks, displayMode, handleDisplayMenu, handleSwitcher }: DayTasksProps) => {

    const navigate = useNavigate();
    const calendarState = useAppSelector(selectCalendarState);
    const dispatch = useAppDispatch();
    const { currentRangeDates, selectDate } = calendarState;
    const user = useAppSelector(selectUser);

    const handleClick = (date: string) => {
        handleDisplayMenu();
        if (!user) {
            toast.info("Please login first");
            return;
        }
        const newDate = new Date(date);
        dispatch(setSelectDate(newDate.toISOString()));
    };

    return (
        <>
            <div>
                <DateSwitcher handleSwitcher={handleSwitcher} />
                <WeekTitle />
                <div className="grid grid-cols-7 grid-rows-6 mt-2 w-full">
                    {Array.from(tasks.entries()).map(([date, daytasks], index) => (
                        <div className={`flex flex-col items-center justify-center w-full aspect-square hover:bg-gray-300
                        ${date === new Date().toDateString() ? " border " : ""}   
                        ${date === new Date(selectDate).toDateString() ? " bg-red-200 " : ""}           
                                ${IsValidDate(new Date(date), currentRangeDates.map(date => new Date(date))) ? "text-gray-300" : "text-gray-700"}`} key={date}
                            onClick={() => handleClick(date)}>
                            <div className={`flex items-center justify-center w-full text-center font-light`}>{new Date(date).toLocaleDateString('en-US', { day: 'numeric' })}</div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

const WeekTitle = () => {
    const dayTitle: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const currentDay = new Date().getDay();
    return (
        <div className="flex justify-around items-center">
            {dayTitle.map((day, index) => {
                return (
                    <div key={index} className={`flex justify-center items-center w-full h-8 text-sm mx-1.5 rounded-sm font-normal text-gray-700`}>{day}</div>
                );
            })}
        </div>
    );
};

const Header = ({ handleDisplayMenu }: { handleDisplayMenu: () => void }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <>
            {isMobile ? (
                <div className='flex justify-between items-center text-xl font-bold text-start py-5 ' >
                    <div>ToDo Calendar</div>
                    <div className='w-10 h-10 flex justify-center items-center' onClick={handleDisplayMenu}>
                        <img src={close} alt="close" className='w-6 h-6' />
                    </div>
                </div>
            ) : (
                <div className='flex justify-end items-center text-xl font-bold text-start' >
                    <div className='w-10 h-10 flex justify-center items-center' onClick={handleDisplayMenu}>
                        <img src={close} alt="close" className='w-6 h-6' />
                    </div>
                </div>
            )}
        </>
    );

};

const DateSwitcher = ({ handleSwitcher }: { handleSwitcher: (action: string) => void }) => {
    const calendarState = useAppSelector(selectCalendarState);
    const { currentDate } = calendarState;

    return (
        <div className='flex justify-between items-center mx-1.5'>
            <div className='text-sm font-semibold text-gray-700'>{currentDate.month} {currentDate.year}</div>
            <div className='flex justify-end items-center'>
                <div className='w-8 h-10 flex justify-center items-center' onClick={() => handleSwitcher("goBack")}>
                    <img src={arrow_last} alt="arrow_last" className='w-5 h-5' />
                </div>
                <div className='w-8 h-10 flex justify-center items-center' onClick={() => handleSwitcher("goForward")}>
                    <img src={arrow_next} alt="arrow_next" className='w-5 h-5' />
                </div>
            </div>

        </div>
    );
};
