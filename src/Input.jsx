import { useState } from 'react';
import './input.css';
import icon_plus from './assets/icon_plus.svg';

function Input({addtask}) {

    const [task, setTask] = useState('');

    function addTask_(e) {    
        if (task === '') {
            return;
        }
        addtask(task);
        setTask('');

    }

    function handleInputChange(e) {
        setTask(e.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
          addTask_(event);
        }
      }

    return (
    <div className='input-area'>
        <ComponentInput task={task} handleInputChange={handleInputChange} handleKeyDown={handleKeyDown}/>
        <hr className='divider' />
        <button className='addbtn' onClick={addTask_}>Add to</button>
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