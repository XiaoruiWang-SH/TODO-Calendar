import { useState, useRef, JSX } from 'react';
import './input.css';
import  icon_plus from '../../assets/icon_plus.svg';
import ItemData from '../../data/ItemData';
import { useNormalTasks, useCompletedTasks } from '../context/Context'

function Input() {
    const [task, setTask] = useState('');
    const {tasks: normalTasks, dispatch: normalDispatch} = useNormalTasks();
    const taskid = useRef(0);

    function addTask(): void {
        if (task === '') {
            return;
        }
        console.log(`add task ${task}`);
        taskid.current = taskid.current + 1;
        const newItem = new ItemData(taskid.current, task, false, false, new Date(), null, new Date());
        if (newItem.important) {
            normalDispatch({
                type: 'addtotop',
                task: newItem,
                id: newItem.id
            });
        } else {
            normalDispatch({
                type: 'add',
                task: newItem,
                id: newItem.id
            });
        }
        setTask('');
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setTask(e.target.value);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Enter") {
          addTask();
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

interface ComponentInputProps {
    task: string;
    handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
    handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}
const ComponentInput: React.FC<ComponentInputProps> = ({task, handleInputChange, handleKeyDown}: ComponentInputProps): JSX.Element => {
    return (
        <div className='componentInput'>
        <img src={icon_plus} className='icon_plus' alt='icon_plus' />
        <input className='addtask' type="text" placeholder="Add a task" value={task} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
        </div>
    );
}

export default Input;