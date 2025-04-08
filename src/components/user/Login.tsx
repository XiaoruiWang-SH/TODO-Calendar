/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-27 10:05:53
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-08 11:52:42
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { FC, useEffect, useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router';
import password_hidden from '../../assets/password_hidden.svg';
import password_visible from '../../assets/password_visible.svg';
import { UserData } from '../../data/api_user';
import { register, RegisterData, LoginData, login } from '../../data/api_register';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import { HttpResponse } from '../../data/api';
import env from '../../config/env';
interface UserContextType {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    isRegister: boolean;
    setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType | null>(null);

// export const Login: FC = () => {
//     const [isLogin, setIsLogin] = useState(false);
//     const [isRegister, setIsRegister] = useState(false);

//     return (
//         <>
//             <UserContext.Provider value={{ isLogin, setIsLogin, isRegister, setIsRegister }}>
//                 <LoginSection />
//                 <RegisterSection />
//             </UserContext.Provider>
//         </>
//     );
// };


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



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // console.log(formData);
        // login(formData.email, formData.password).then((res) => {
        //     console.log("login res: ", res);
        //     dispatch(setUser(res));
        //     navigate("/");
        // }).catch((err) => {
        //     console.log("login err: ", err);
        // });


        const user: LoginData = {
            email: formData.email,
            password: formData.password
        }
        login(user).then((res: HttpResponse<UserData>) => {
            if (res.success) {
                toast.success(res.message);
                dispatch(setUser(res.data));
                navigate("/");
            } else {
                toast.error(res.message);
            }
        }).catch((err) => {
            console.log("login err: ", err);
        });

    }

    return <div className='h-[100vh] bg-white flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center self-start px-10 py-5  rounded-lg'>
            <div className="font-semibold text-2xl">Welcome, please login</div>
            <div className='flex flex-col self-start items-stretch mt-5'>
                <div className='mt-[10px]'>
                    <InputCell
                        title="Email"
                        id="email"
                        value={ formData.email}
                        isPassword={false}
                        tip={null}
                        handleChange={handleChange} />
                </div>
                <div className='mt-[20px]'>
                    <InputCell
                        title="Password"
                        id="password"
                        value={formData.password}
                        isPassword={true}
                        tip={"At least 8 characters, one uppercase, one lowercase, one number"}
                        handleChange={handleChange} />
                </div>
                <button className={`mt-[40px] p-2 w-full bg-gray-400  disabled:bg-gray-300  text-white rounded-md ${!isDisabled ? 'hover:border hover:border-gray-700 active:bg-gray-500' : ''}`}
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isDisabled}>Login</button>
                <button className='mt-[10px] p-1.5 text-center w-full text-blue-500' type="button" onClick={() => navigate(-1)}>Cancel</button>
                <button className='mt-[10px] p-1.5 text-center w-full text-gray-700' type="button"
                    onClick={() => navigate("/register")}
                >Have no account? go to <span className='text-blue-500'>Register</span></button>
            </div>
        </div>
    </div>;
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
                toast.success(res.message);
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
        <div className='h-[100vh] bg-white flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center self-start px-10 py-5  rounded-lg'>
                <div className='font-semibold text-2xl'>Welcome, please Register</div>
                <div className='flex flex-col self-start items-stretch mt-5'>
                    <div className='mt-[10px]'>
                        <InputCell
                            title="Email"
                            id="email"
                            value={formData.email}
                            isPassword={false}
                            tip={null}
                            handleChange={handleChange} />
                    </div>
                    <div className='mt-[10px]'>
                        <InputCell
                            title="Username"
                            id="username"
                            value={formData.username}
                            isPassword={false}
                            tip={null}
                            handleChange={handleChange} />
                    </div>
                    <div className='mt-[20px]'>
                        <InputCell
                            title="Password"
                            id="password"
                            value={formData.password}
                            isPassword={true}
                            tip={"At least 8 characters, one uppercase, one lowercase, one number"}
                            handleChange={handleChange} />
                    </div>
                    <div className='mt-[20px]'>
                        <InputCell
                            title='Confirm Password'
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            isPassword={true}
                            tip={"At least 8 characters, one uppercase, one lowercase, one number"}
                            handleChange={handleChange} />
                    </div>

                    <button className={`mt-[40px] p-2 w-full bg-gray-400  disabled:bg-gray-300  text-white rounded-md ${!isDisabled ? 'hover:border hover:border-gray-700 active:bg-gray-500' : ''}`}
                        disabled={isDisabled}
                        onClick={handleSubmit}
                    >Register</button>
                    <button className='mt-[10px] p-1.5 text-center w-full text-blue-500' type="button" onClick={() => navigate(-1)}>Cancel</button>
                    <button className='mt-[10px] p-1.5 text-center w-full text-gray-700' type="button">Have a account? go to <span className='text-blue-500'>Login</span></button>


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
            <div className='flex justify-between items-center'>
                <label htmlFor="password">{title}:</label>
                <div className='flex items-center justify-center ml-4 w-[20vw]  border border-gray-300 rounded-md'>
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

