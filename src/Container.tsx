import { useState, useReducer, useContext, createContext } from 'react';
import List from './List';
import Input from './Input';
import './container.css';


export default function Container() {
    return (
        <div className='container'>
            <Input />
            <List />
        </div>
    );
}
