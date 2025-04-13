/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-13 22:02:33
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */



import { Header } from './components/header/Header';
import { Outlet } from 'react-router';
import { MyAppNav } from './Nav';
import { selectUser, setUser } from './features/user/userSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FC, useEffect, useState } from 'react';
import { handleAuthRedirect, loginWithOAuth, OAuthProvider } from './data/api_register';
import { Divider } from '@mui/material';
import google from './assets/google.svg';
import github from './assets/github.svg';
import close from './assets/close.svg';
import { SignInItem } from './components/user/Login';
import { useNavigate } from 'react-router';
import { useAppSelector } from './app/hooks';


function App() {
  const [showSignInBar, setShowSignInBar] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    console.log("user: ", storedUser);
    dispatch(setUser(JSON.parse(storedUser)));
  } else {
    console.log("no user");
  }

  // Update your home page component to use this
  useEffect(() => {
    // Check if this is a redirect from OAuth
    const userData = handleAuthRedirect();
    if (userData) {
      // Update user state or context
      dispatch(setUser(userData));
    }
  }, []);


  return (
    <div className='text-start bg-gray-100 font-sans text-gray-900 font-medium relative'>
      <Header />
      {/* <MyAppNav /> */}
      <Outlet />
      <ToastContainer autoClose={2000} hideProgressBar position='bottom-center' />
      {!user && showSignInBar && (
        <div className='fixed top-3 right-3'>
          <SignInBar handleClose={() => setShowSignInBar(false)} handleSignIn={() => { navigate('/login') }} />
        </div>
      )}
    </div>
  )
}

interface SignInBarProps {
  handleClose: () => void;
  handleSignIn: () => void;
}

const SignInBar: FC<SignInBarProps> = ({ handleClose, handleSignIn }) => {
  return (
    <div className=' flex items-center justify-center bg-slate-50 relative'>
      <button className='absolute top-2 right-2 w-8 h-8 flex items-center justify-center' onClick={handleClose}>
        <img src={close} alt='close' className='w-5 h-5' />
      </button>
      <div className='w-[20vw] items-center justify-center self-start px-4 py-2 rounded-lg border border-gray-300 shadow-md'>
        <div className='text-[17px] font-medium text-center'>Sign In</div>
        <div className='flex flex-col gap-2 my-2'>
          <SignInItem logo={google} text="Sign in with Google" onClick={() => { loginWithOAuth(OAuthProvider.GOOGLE) }} />
          <SignInItem logo={github} text="Sign in with Github" onClick={() => { loginWithOAuth(OAuthProvider.GITHUB) }} />
        </div>
        <Divider>
          <div className='text-gray-500 text-sm'>Or</div>
        </Divider>

        <div className='flex flex-col gap-2 my-2'>
          <button className='p-2 w-full bg-gray-900 disabled:bg-gray-500 text-white rounded-md hover:bg-gray-700'
            onClick={handleSignIn}
          >Sign in with Email</button>
        </div>
      </div>
    </div>
  )
}


export default App

