import { useState } from 'react';
import List from './List';
import Input from './Input';
import './container.css';
import ItemData, { ItemDataList } from './ItemData';


let taskid = 0;
const itemDataList = new ItemDataList();

function Container() {

    const [list, setList] = useState([]);

    function taskchange(id) {
        if (!itemDataList.hasTask(id)) {
            return;
        }
        const newItem = itemDataList.findTask(id);
        newItem.setChecked(!newItem.checked);
        itemDataList.removeTask(id);
        itemDataList.addTask(newItem);
        
        setList(itemDataList.getList());
    }

    function handleLiftUp(id) { 
        console.log(`item with id ${id} was lifted up`);
        if (!itemDataList.hasTask(id)) {
            return;
        }

        const newItem = itemDataList.findTask(id);
        // newItem.setChecked(!newItem.checked);
        newItem.setImportant(!newItem.important);
        itemDataList.removeTask(id);
        itemDataList.addTask(newItem);
        
        setList(itemDataList.getList());
        
    }

    function addTask(task) {
        console.log(`add task ${task}`);
        taskid++;
        itemDataList.addTask(new ItemData(taskid, task, false, false, new Date(), null));
        const newlist = itemDataList.getList();
        setList(newlist);
    }

    return (
        <div className='container'>
            <Input addtask={addTask} />
            <List list={list} taskchange={taskchange} handleLiftUp={handleLiftUp} />
        </div>
    );
}



export default Container;