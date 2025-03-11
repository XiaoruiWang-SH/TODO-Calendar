import { useState } from 'react';
import './input.css';
import icon_plus from './assets/icon_plus.svg';
import ItemData from './ItemData';
import { useNormalTasks, useCompletedTasks} from './Context';

let taskid = 0;

function Input() {
    const [task, setTask] = useState('');
    const {normalTasks, normalDispatch} = useNormalTasks();

    function addTask(e) {
        if (task === '') {
            return;
        }
        console.log(`add task ${task}`);
        taskid++;
        const newItem = new ItemData(taskid, task, false, false, new Date(), null);
        if (newItem.important) {
            normalDispatch({
                type: 'addtotop',
                task: newItem
            });
        } else {
            normalDispatch({
                type: 'add',
                task: newItem
            });
        }
        setTask('');
    }

    function handleInputChange(e) {
        setTask(e.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
          addTask(event);
        }
      }

    return (
    <div className='input-area'>
        <ComponentInput task={task} handleInputChange={handleInputChange} handleKeyDown={handleKeyDown}/>
        <hr className='divider' />
        <button className='addbtn' onClick={addTask}>Add to</button>
    </div>
    );
}

function ComponentInput({task, handleInputChange, handleKeyDown}) {
    return (
        <div className='componentInput'>
        <img src={icon_plus} className='icon_plus' alt='icon_plus' />
        <input className='addtask' type="text" placeholder="Add a task" value={task} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
        </div>
    );
}

export default Input;