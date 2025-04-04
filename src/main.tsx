/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-27 14:58:03
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css'
import App from './App.js'
import { BrowserRouter, Routes, Route } from "react-router";
import { Calendar } from './components/calendar/Calendar';
import { Container } from './components/container/Container';
import { Login, Register } from './components/user/Login';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Calendar />} />
              <Route path="/task" element={<Container />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>

    </StrictMode>,
  );
} else {
  console.error('Root element not found');
}
