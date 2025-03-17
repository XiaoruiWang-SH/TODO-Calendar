/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-15 16:26:46
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */


import Container from './components/container/Container';
import { NormalTasksProvider, CompletedTasksProvider, useNormalTasks, useCompletedTasks } from './context/Context';

function App() {

  return (
    <NormalTasksProvider>
      <CompletedTasksProvider>
        <Container />
      </CompletedTasksProvider>
    </NormalTasksProvider>
  )
}

export default App

