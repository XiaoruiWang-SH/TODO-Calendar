/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 13:53:32
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-17 13:55:40
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();