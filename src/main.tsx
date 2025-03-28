/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-18 11:20:49
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { BrowserRouter, Routes, Route } from "react-router";
import { Calendar } from './components/calendar/Calendar';
import { Container } from './components/Container/Container';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Calendar />} />
            <Route path="/task" element={<Container />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  );
} else {
  console.error('Root element not found');
}
