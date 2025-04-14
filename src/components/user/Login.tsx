/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-27 10:05:53
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-13 21:25:32
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { FC, useEffect, useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router';
import password_hidden from '../../assets/password_hidden.svg';
import password_visible from '../../assets/password_visible.svg';
import { UserData } from '../../data/api_user';
import { register, RegisterData, LoginData, login, loginWithOAuth, OAuthProvider } from '../../data/api_register';
import { useDispatch } from 'react-redux';
import { selectShowSignInBar, setShowSignInBar, setUser } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import { HttpResponse } from '../../data/api';
import env from '../../config/env';
import google from '../../assets/google.svg';
import github from '../../assets/github.svg';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../app/hooks';



interface UserContextType {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    isRegister: boolean;
    setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const Login: FC = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: env.DEBUG_MODE ? env.USER_NAME : '',
        password: env.DEBUG_MODE ? env.PASSWORD : ''
    });

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        setIsDisabled(!emailRegex.test(formData.email) || !passwordRegex.test(formData.password));
    }, [formData]);

    const showSignInBar = useAppSelector(selectShowSignInBar);
    useEffect(() => {
        dispatch(setShowSignInBar(false));
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const user: LoginData = {
            email: formData.email,
            password: formData.password
        }
        login(user).then((res: HttpResponse<UserData>) => {
            if (res.success) {
                // toast.success(res.message);
                dispatch(setUser(res.data));
                navigate("/");
            } else {
                toast.error(res.message);
            }
        }).catch((err) => {
            console.log("login err: ", err);
        });

    }

    return (
        <div className='h-[100vh] flex items-center justify-center bg-slate-50'>
            <div className='items-center justify-center self-start px-10 py-5 rounded-lg w-[100vw] md:w-[35vw] md:border md:border-gray-300 md:shadow-md md:mt-10'>
                <div className='text-xl font-semibold text-center'>Sign In</div>
                <div className="text-sm text-gray-500 font-light my-2 text-center">Welcome user, please sign in to contine</div>
                <div className='flex flex-col gap-2 my-5'>
                    <SignInItem logo={google} text="Sign in with Google" onClick={() => { loginWithOAuth(OAuthProvider.GOOGLE) }} />
                    <SignInItem logo={github} text="Sign in with Github" onClick={() => { loginWithOAuth(OAuthProvider.GITHUB) }} />
                </div>
                <Divider>
                    <div className='text-gray-500'>Or</div>
                </Divider>

                <div className='flex flex-col gap-2 my-2'>
                    <InputCell
                        title="Email"
                        id="email"
                        value={formData.email}
                        isPassword={false}
                        tip={null}
                        handleChange={handleChange} />
                    <InputCell
                        title="Password"
                        id="password"
                        value={formData.password}
                        isPassword={true}
                        tip={"At least 8 characters, one uppercase, one lowercase, one number"}
                        handleChange={handleChange} />
                </div>
                <div className='flex flex-col gap-2 my-10'>
                    <button className={`p-2 w-full bg-gray-900 disabled:bg-gray-500 text-white rounded-md ${!isDisabled ? 'hover:bg-gray-700' : ''}`}
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isDisabled}>Login</button>
                    <button className='p-1 text-center w-full text-blue-500' type="button" onClick={() => navigate(-1)}>Cancel</button>
                    <button className='p-1 text-center w-full text-gray-700' type="button"
                        onClick={() => navigate("/register")}
                    >Have no account? go to <span className='text-blue-500'>Register</span></button>
                </div>
            </div>
        </div>
    );
}

export interface SignInItemProps {
    logo: string;
    text: string;
    onClick: () => void;
}

export const SignInItem = ({ logo, text, onClick }: SignInItemProps) => {
    return (
        <div>
            <div className='flex justify-center items-center gap-2 font-normal border border-gray-300 rounded-md p-2 hover:bg-gray-100'
                onClick={onClick}>
                <div>
                    <img src={logo} alt="logo" className='w-5 h-5' />
                </div>
                <div>
                    {text}
                </div>
            </div>
        </div>
    )
}

export const Register: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { isRegister, setIsRegister } = useContext(UserContext)!;

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [isDisabled, setIsDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        setIsDisabled(!emailRegex.test(formData.email) || !passwordRegex.test(formData.password) || formData.password !== formData.confirmPassword);
    }, [formData]);



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const user: RegisterData = {
            name: formData.username,
            email: formData.email,
            password: formData.password
        }
        register(user).then((res: HttpResponse<UserData>) => {
            if (res.success) {
                // toast.success(res.message);
                dispatch(setUser(res.data));
                navigate("/");
            } else {
                toast.error(res.message);
            }
        }).catch((err) => {
            console.log("register err: ", err);
        });

    }
    return (
        <div className='h-[100vh] bg-white flex items-center justify-center bg-slate-50'>
            <div className='items-center justify-center self-start px-10 py-5 rounded-lg w-[100vw] md:w-[35vw] md:border md:border-gray-300 md:shadow-md md:mt-10'>
                <div className='text-xl font-semibold text-center'>Register</div>
                <div className="text-sm text-gray-500 font-light my-2 text-center">Welcome user, please register to contine</div>
                <div className='flex flex-col gap-2'>
                    <InputCell
                        title="Email"
                        id="email"
                        value={formData.email}
                        isPassword={false}
                        tip={null}
                        handleChange={handleChange} />
                    <InputCell
                        title="Username"
                        id="username"
                        value={formData.username}
                        isPassword={false}
                        tip={null}
                        handleChange={handleChange} />
                    <InputCell
                        title="Password"
                        id="password"
                        value={formData.password}
                        isPassword={true}
                        tip={"At least 8 characters, one uppercase, one lowercase, one number"}
                        handleChange={handleChange} />
                    <InputCell
                        title='Confirm Password'
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        isPassword={true}
                        tip={"At least 8 characters, one uppercase, one lowercase, one number"}
                        handleChange={handleChange} />
                </div>

                <div className='flex flex-col gap-2 my-10'>
                    <button className={`p-2 w-full bg-gray-900 disabled:bg-gray-500 text-white rounded-md ${!isDisabled ? 'hover:border hover:bg-gray-700' : ''}`}
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isDisabled}>Register</button>
                    <button className='p-1 text-center w-full text-blue-500' type="button" onClick={() => navigate(-1)}>Cancel</button>
                    <button className='p-1 text-center w-full text-gray-700' type="button"
                        onClick={() => navigate("/login")}
                    >Have no account? go to <span className='text-blue-500'>Login</span></button>



                </div>
            </div>

        </div>
    );
}

interface InputCellProps {
    title: string;
    id: string;
    value: string;
    isPassword: boolean;
    tip: string | null;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCell = ({ title, id, value, isPassword, tip, handleChange }: InputCellProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showTip, setShowTip] = useState(false);
    return (
        <div className='flex flex-col'>
            <div>
                <label htmlFor="password" className='text-sm text-gray-500'>{title}:</label>
                <div className='flex items-center justify-center w-full border border-gray-300 rounded-md hover:border-gray-400'>
                    <input className='p-1.5 w-full focus:outline-none'
                        type={isPassword ? (showPassword ? "text" : "password") : "text"}
                        id={id}
                        name={id}
                        value={value}
                        onFocus={() => setShowTip(true)}
                        onBlur={() => setShowTip(false)}
                        onChange={handleChange}
                        required />
                    {isPassword && <button className='flex items-center justify-center h-full w-10 text-blue-500 px-1'
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}>
                        <img src={showPassword ? password_visible : password_hidden} alt="password" className='w-5 h-5' />
                    </button>}
                </div>
            </div>
            {tip && showTip && <div className='text-orange-500 text-[12px] self-end'>{tip}</div>}
        </div>

    );
}

