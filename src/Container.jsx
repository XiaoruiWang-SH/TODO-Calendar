import { useState } from 'react';
import List from './List';
import Input from './Input';
import './container.css';
import ItemData from './ItemData';

let taskid = 0;

function Container() {

    const [list, setList] = useState([]);

    function taskchange(newlist) {
        setList(newlist);
    }

    function addTask(task) {
        console.log(`add task ${task}`);
        taskid++;
        const newlist = [...list, new ItemData(taskid, task, false, false, new Date(), null)];
        setList(newlist);
    }

    return (
        <div className='container'>
            <Input addtask={addTask} />
            <List list={list} taskchange={taskchange}/>
        </div>
    );
}



export default Container;