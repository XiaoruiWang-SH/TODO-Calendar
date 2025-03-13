import { useState } from 'react';
import './App.css';
import Header from './Header';
import Container from './Container';
import {NormalTasksProvider, CompletedTasksProvider, useNormalTasks, useCompletedTasks} from './Context';

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

