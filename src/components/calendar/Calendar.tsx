/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-15 14:27:06
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-10 10:34:49
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { DayTasksProps, TaskItemProps, SwitcherProps, HeaderProps, DisplaySwitcherProps } from './Calendar.types';
import { ItemData } from '../../data/ItemData';
import star_unselected from '../../assets/star-unselected.svg';
import star_selected from '../../assets/star-selected.svg';
import goBack from '../../assets/goback.svg';
import goForward from '../../assets/goforward.svg';
import calendar from '../../assets/calendar.svg';
import menu from '../../assets/menu.svg';
import {
    getToday, getCurrentDate, getCurrentRangeDatesArray, getLastRangeDatesArray, getNextRangeDatesArray,
    complementMonthDiaplayDates, IsValidDate, computeDayInWeek, computeMonthInYear, computeDayInMonth
} from './util';
import { addItem, getItemsByDayRange } from '../../data/api_task';
import { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DisplayMode, selectCalendarState, setCurrentDate, setCurrentRangeDates, setTasksMap, setDisplayMode, setSelectDate } from '../../features/calendar/calendarSlice';
import { selectUser } from '../../features/user/userSlice';
import { Container } from '../container/Container';
// import { Drawer as DrawerCustom } from '../drawer/Drawer';
import { Menu } from '../menu/Menu';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';



export const Calendar = () => {
    const dispatch = useAppDispatch();
    const calendarState = useAppSelector(selectCalendarState);
    const user = useAppSelector(selectUser);
    const { selectDate, currentDate, currentRangeDates, tasksMap, displayMode } = calendarState;
    const [prevDisplayMode, setPrevDisplayMode] = useState(displayMode);
    const [prevRangeDates, setPrevRangeDates] = useState(currentRangeDates);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getTasks = async (currentRangeDays: Date[]) => {
        const currentRangeDays_ = complementMonthDiaplayDates(currentRangeDays, displayMode);
        // const tasks = await getItemsByDayRange(currentRangeDays_[0], currentRangeDays_[currentRangeDays_.length - 1]);
        // if (!tasks.success) return;
        const tasksMap_ = new Map();
        currentRangeDays_.forEach(day => {
            tasksMap_.set(day.toDateString(), []);
        });
        // tasks.data?.forEach(task => {
        //     const date = new Date(task.createTime).toDateString();
        //     if (tasksMap_.has(date)) {
        //         tasksMap_.get(date).push(task);
        //     }
        // });
        dispatch(setTasksMap(Object.fromEntries(tasksMap_)));
    };

    useEffect(() => {
        if (currentRangeDates.length === 0 || displayMode !== prevDisplayMode) {
            const currentRangeDays = getCurrentRangeDatesArray(displayMode);
            dispatch(setCurrentRangeDates(currentRangeDays.map(date => date.toISOString())));
            computeTargetDate(currentRangeDays);
            getTasks(currentRangeDays);
        } else if (JSON.stringify(currentRangeDates) !== JSON.stringify(prevRangeDates)) {
            getTasks(currentRangeDates.map(date => new Date(date)));
        }
        setPrevDisplayMode(displayMode);
        setPrevRangeDates(currentRangeDates);
    }, [dispatch, displayMode, currentRangeDates]);

    const computeTargetDate = (currentWeekDays: Date[]) => {
        const targetDate = currentWeekDays[3];
        const currentDate_ = {
            year: targetDate.getFullYear().toString(),
            month: targetDate.toLocaleString("en-US", { month: "short" }), // "Feb",
            day: targetDate.getDate().toString()
        };
        dispatch(setCurrentDate(currentDate_));
    };

    const handleSwitcher = (action: string) => {
        switch (action) {
            case "goBack": {
                const lastRangeDates = getLastRangeDatesArray(currentRangeDates.map(date => new Date(date)), displayMode);
                dispatch(setCurrentRangeDates(lastRangeDates.map(date => date.toISOString())));
                computeTargetDate(lastRangeDates);
                getTasks(lastRangeDates.map(date => new Date(date)));
            }
                break;
            case "goForward": {
                const nextRangeDates = getNextRangeDatesArray(currentRangeDates.map(date => new Date(date)), displayMode);
                dispatch(setCurrentRangeDates(nextRangeDates.map(date => date.toISOString())));
                computeTargetDate(nextRangeDates);
                getTasks(nextRangeDates.map(date => new Date(date)));
            }
                break;
            case "today": {
                const currentRangeDays = getCurrentRangeDatesArray(displayMode);
                dispatch(setCurrentRangeDates(currentRangeDays.map(date => date.toISOString())));
                computeTargetDate(currentRangeDays);
                getTasks(currentRangeDays.map(date => new Date(date)));
            }
                break;
        }
    };

    const daySwitcher = (action: string) => {
        switch (action) {
            case "goBack": {
                const newDate = new Date(selectDate);
                newDate.setDate(newDate.getDate() - 1);
                dispatch(setSelectDate(newDate.toISOString()));
            }
                break;
            case "goForward": {
                const newDate = new Date(selectDate);
                newDate.setDate(newDate.getDate() + 1);
                dispatch(setSelectDate(newDate.toISOString()));
            }
                break;
            case "today": {
                dispatch(setSelectDate(new Date().toISOString()));
            }
        }
    }
    const handleDisplayMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div>
            <div className={`${isMenuOpen ? "flex" : ""}`}>
                {/* {isMenuOpen && <div className="flex-1 h-[100vh] py-5 border-r border-gray-200 "><Menu tasks={new Map(Object.entries(tasksMap))}
                    displayMode={displayMode}
                    handleDisplayMenu={handleDisplayMenu}
                    handleSwitcher={handleSwitcher} /></div>} */}
                <Drawer open={isMenuOpen} onClose={handleDisplayMenu}>
                    {/* {DrawerList} */}
                    <Menu tasks={new Map(Object.entries(tasksMap))}
                        displayMode={displayMode}
                        handleDisplayMenu={handleDisplayMenu}
                        handleSwitcher={handleSwitcher} />
                </Drawer>
                <div className="flex-4 h-[100vh] bg-white p-2 md:p-4 overflow-y-scroll">
                    <Header daySwitcher={daySwitcher} handleDisplayMenu={handleDisplayMenu} isMenuOpen={isMenuOpen} />
                    <Container />
                </div>
            </div>
        </div>
    );
};


const DayBlocks = ({ tasks, displayMode }: DayTasksProps) => {

    const navigate = useNavigate();
    const calendarState = useAppSelector(selectCalendarState);
    const { currentRangeDates } = calendarState;

    const handleClick = (date: string) => {
        navigate('/task', { state: { date: date } });
    };

    return (
        <>
            {
                displayMode === DisplayMode.WEEK ?
                    <div className="flex justify-around items-start gap-1 h-[75vh] mt-2">
                        {Array.from(tasks.entries()).map(([date, daytasks]) => (
                            <div className={`flex flex-col justify-start items-start bg-gray-100 w-full h-full rounded-sm ${date === new Date().toDateString() ? "border border-gray-400" : ""}`} key={date}
                                onClick={() => handleClick(date)}>
                                <div className="w-full text-center">{date === new Date().toDateString() ? "Today" : new Date(date).toLocaleDateString('en-US', { day: 'numeric' })}</div>
                                <div className='my-2 ml-2 mr-1 overflow-y-auto'>
                                    {
                                        daytasks.map((task, index) => (
                                            <TaskItem key={index} dataItem={task} />
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className="grid grid-cols-7 grid-rows-6 h-[75vh] mt-2">
                        {Array.from(tasks.entries()).map(([date, daytasks], index) => (
                            <div className={`flex flex-col justify-start items-start w-full h-full text-black border-t border-r border-gray-300
                                ${new Date(date).getDay() === 1 ? "border-l" : ""}
                                ${index >= 35 ? "border-b" : ""}
                                ${IsValidDate(new Date(date), currentRangeDates.map(date => new Date(date))) ? "text-gray-300" : ""}`} key={date}
                                onClick={() => handleClick(date)}>
                                <div className={`w-full text-center font-medium ${date === new Date().toDateString() ? "bg-gray-200" : ""}`}>{new Date(date).toLocaleDateString('en-US', { day: 'numeric' })}</div>
                                <div className='my-2 ml-2 mr-1 overflow-y-auto'>
                                    {
                                        daytasks.map((task, index) => (
                                            <TaskItem key={index} dataItem={task} />
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
            }
        </>
    );
};

export const TaskItem = ({ dataItem }: TaskItemProps) => {
    return (
        <div className='flex justify-start items-center mt-2 mr-1 max-h-10'>
            <img src={dataItem.important ? star_selected : star_unselected} className='w-4' alt='important'></img>
            <div className={`ml-1.5 line-clamp-2 ${dataItem.checked ? 'line-through text-gray-500' : ''}`}>{dataItem.title}</div>
        </div>
    );
};

const Header = ({ daySwitcher, handleDisplayMenu, isMenuOpen }: HeaderProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const calendarState = useAppSelector(selectCalendarState);
    const { selectDate } = calendarState;
    return (
        <>
            {isMobile ? (
                <div>
                    <div className='flex justify-between items-center my-2 mb-4'>
                        <div onClick={handleDisplayMenu} className='flex justify-bwtween items-center'>
                            <img src={menu} className='w-6 md:w-7 mr-1' alt='menu' hidden={isMenuOpen}></img>
                            <div className="text-md md:text-lg font-light"> {computeDayInWeek(new Date(selectDate))}, {computeMonthInYear(new Date(selectDate))} {computeDayInMonth(new Date(selectDate))}</div>
                        </div>
                        <div>
                            <DirectionSwitcher onGoBack={() => daySwitcher("goBack")} onGoForward={() => daySwitcher("goForward")} onToday={() => daySwitcher("today")} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex justify-between items-center mb-4'>
                    <div onClick={handleDisplayMenu} className='flex justify-bwtween items-center'>
                        <img src={menu} className='w-5 md:w-7' alt='menu' hidden={isMenuOpen}></img>
                        <div className='text-sm md:text-2xl mx-1 md:mx-2.5'>My day</div>
                    </div>
                    <div className="text-sm md:text-lg font-light"> {computeDayInWeek(new Date(selectDate))}, {computeMonthInYear(new Date(selectDate))} {computeDayInMonth(new Date(selectDate))}</div>
                    <div>
                        <DirectionSwitcher onGoBack={() => daySwitcher("goBack")} onGoForward={() => daySwitcher("goForward")} onToday={() => daySwitcher("today")} />
                    </div>
                </div>
            )}
        </>

    );
};

const DirectionSwitcher = ({ onGoBack, onGoForward, onToday }: SwitcherProps) => {
    return (
        <div className='flex justify-center items-center'>
            <div onClick={onGoBack} className='w-6 md:w-10 h-6 md:h-8 border border-gray-400 hover:border-gray-950 rounded-md flex justify-center items-center mx-1 md:mx-2'>
                <img src={goBack} className='w-4' alt='go back'></img>
            </div>
            <div onClick={onToday} className='w-auto h-6 md:h-8 border border-gray-400 hover:border-gray-950 rounded-md flex justify-center items-center mx-1 px-2'>
                <span>Today</span>
            </div>
            <div onClick={onGoForward} className='w-6 md:w-10 h-6 md:h-8 border border-gray-400 hover:border-gray-950 rounded-md flex justify-center items-center ml-1 md:ml-2'>
                <img src={goForward} className='w-4' alt='go forward'></img>
            </div>
        </div>
    );
};

const DisplaySwitcher = ({ onList, onGrid }: DisplaySwitcherProps) => {
    const calendarState = useAppSelector(selectCalendarState);
    const { displayMode } = calendarState;
    return (
        <div className='flex justify-center items-center ml-5'>
            <div onClick={onGrid} className={`w-auto h-8 border border-gray-400 hover:border-gray-950 hover:border-1 flex justify-center items-center px-2 rounded-l-md ${displayMode === DisplayMode.MONTH ? "bg-gray-600 text-white" : ""}`}>
                <span>Month</span>
            </div>
            <div onClick={onList} className={`w-auto h-8 border border-l-0 border-gray-400 hover:border-gray-950 hover:border-1 flex justify-center items-center px-2 rounded-r-md ${displayMode === DisplayMode.WEEK ? "bg-gray-600 text-white" : ""}`}>
                <span>Week</span>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <div className='bg-gray-100 h-[30px] border-t border-gray-200'>
        </div>
    )
}