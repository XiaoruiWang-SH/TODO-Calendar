/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-15 11:46:18
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { useState } from 'react';
import './App.css';
import { Header } from '../header/Header';
import Container from '../container/Container';
import {NormalTasksProvider, CompletedTasksProvider, useNormalTasks, useCompletedTasks} from '../context/Context';

function App() {

  return (
      <NormalTasksProvider>
        <CompletedTasksProvider>
          <div className='font-sans text-gray-900 font-medium'>
            <Header />
            <Container />
          </div>
        </CompletedTasksProvider>
      </NormalTasksProvider>
  )
}

export default App

