/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-18 11:49:22
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */


import { Provider } from 'react-redux';
import { store } from './app/store';
import { Header } from './components/header/Header';
import { Outlet } from 'react-router';
import { MyAppNav } from './Nav';
function App() {

  return (
    <Provider store={store}>
      <div className='text-start mx-5 bg-white font-sans text-gray-900 font-medium'>
        <Header />
        {/* <MyAppNav /> */}
        <Outlet />
      </div>
    </Provider>
  )
}

export default App

