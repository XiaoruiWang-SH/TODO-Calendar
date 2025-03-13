import { useState } from 'react';
import './App.css';
import Header from '../header/Header';
import Container from '../container/Container';
import {NormalTasksProvider, CompletedTasksProvider, useNormalTasks, useCompletedTasks} from '../context/Context';

function App() {

  return (
      <NormalTasksProvider>
        <CompletedTasksProvider>
          <Header />
          <Container />
        </CompletedTasksProvider>
      </NormalTasksProvider>
  )
}

export default App

