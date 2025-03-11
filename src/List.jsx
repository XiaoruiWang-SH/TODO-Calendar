import { useContext, useState } from 'react';
import './List.css';
import star_unselected from './assets/star-unselected.svg';
import star_selected from './assets/star-selected.svg';
import checkbox_unchecked from './assets/checkbox-unselected.svg';
import checkbox_checked from './assets/checkbox-selected.svg';
import arrow_up from './assets/arrow_up.svg';
import arrow_down from './assets/arrow_down.svg';
import { useNormalTasks, useCompletedTasks} from './Context';


function List() {

    const {normalTasks, normalDispatch} = useNormalTasks();
    const {completedTasks, completedDispatch} = useCompletedTasks();

    function taskchange(item) {
        if (item.checked) {
            normalDispatch({
                type: 'complete',
                task: item
            });

            completedDispatch({
                type: 'add',
                task: item
            });
        } else {
            completedDispatch({
                type: 'undo',
                id: item.id
            });
            if (item.important) {
                normalDispatch({
                    type: 'addtotop',
                    task: item
                });
            } else {
                normalDispatch({
                    type: 'add',
                    task: item
                });
            }
        }
    }

    function handleImportanceChange(item) { 
        if (item.important) {
            normalDispatch({
                type: 'liftup',
                task: item
            });
        } else {
            normalDispatch({
                type: 'liftdown',
                task: item
            });
        }
    }

    return (
        <div className='container'>
        {normalTasks.length == 0 ? <></> : 
        <ul className='list-area'>
            {normalTasks.map((item) => 
            <li className={item.checked ? 'list-checked' : 'list-unchecked'} key={item.id}>
                <ListItem item={item} handleChange_={taskchange} handleImportanceChange_={handleImportanceChange} />
                </li>
            )}
        </ul>
        }
        {completedTasks.length == 0 ? 
        <></>
        :
        <ComponentComplete />}
        </div>
    );

}


function ListItem({item, handleChange_, handleImportanceChange_}) {

    function handleChange(e) {
        item.setChecked(!item.checked);
        handleChange_(item);
        e.stopPropagation();
    }

    function handleLiftUp(e) {
        item.setImportant(!item.important);
        handleImportanceChange_(item);
        e.stopPropagation();
    }

    return (
        <div className='list-item'>
            <CheckBox id={item.id} checked={item.checked} handleChange={handleChange} />
            <span>{item.name}</span>
            <LiftUPBtn important={item.important} handleLiftUp={handleLiftUp} />

        </div>
    );
}

function CheckBox({checked, handleChange}) { // 参数本质上是一个对象，这里是结构赋值

    return (
        <div className='round-checkbox' onClick={handleChange}>
            <img src={checked ? checkbox_checked : checkbox_unchecked} className='icon_checkbox' alt='icon_checkbox'/>
        </div>
    );
}

function LiftUPBtn({important, handleLiftUp}) {
    return (
        <div className='liftup-btn' onClick={handleLiftUp}> 
            <img src={important ? star_selected : star_unselected} className='icon_liftup' alt='icon_liftup' />
        </div>
    );
}


function ComponentComplete() {
    const [hiden, setHiden] = useState(true);
    const {normalTasks, normalDispatch} = useNormalTasks();
    const {completedTasks, completedDispatch} = useCompletedTasks();

    function listShowClick(){
        setHiden(!hiden);
    }

    function taskchange(item) {
        if (item.checked) {
            normalDispatch({
                type: 'complete',
                task: item
            });

            completedDispatch({
                type: 'add',
                task: item
            });
        } else {
            completedDispatch({
                type: 'undo',
                id: item.id
            });
            if (item.important) {
                normalDispatch({
                    type: 'addtotop',
                    task: item
                });
            } else {
                normalDispatch({
                    type: 'add',
                    task: item
                });
            }
        }
    }

    return (
        <div className='container-complete'>
            <ComponentCompleteHeader num={completedTasks.length} hiden={hiden} listShowClick={listShowClick}/>
            {hiden ? <></> : 
            <ul className='list-area'>
                {completedTasks.map((item) => 
                <li className={item.checked ? 'list-checked' : 'list-unchecked'}
                key={item.id}>
                    <ListItem item={item} handleChange_={taskchange} handleLiftUp_={null} />
                    </li>
                )}
            </ul>}
        </div>
    );
}

function ComponentCompleteHeader({num, hiden, listShowClick}) {
    return (
        <div className='container-complete-header' onClick={listShowClick}>
            <div className='arrow-icon'>
                <img src={hiden ? arrow_up : arrow_down} className='icon_checkbox' alt='icon_checkbox' />
            </div>
            <div>Completed</div>
             <div className='container-complete-header-num'>{num}</div>
        </div>
    );
}


export default List;