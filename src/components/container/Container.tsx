import { useState, useReducer, useContext, createContext } from 'react';
import List from '../list/List';
import Input from '../input/Input';
import './container.css';


export default function Container() {
    return (
        <div className='container'>
            <Input />
            <List />
        </div>
    );
}
