import { useState } from 'react';
import './List.css';
import star_unselected from './assets/star-unselected.svg';
import star_selected from './assets/star-selected.svg';
import checkbox_unchecked from './assets/checkbox-unselected.svg';
import checkbox_checked from './assets/checkbox-selected.svg';
import ItemData from './ItemData';


function List({list, taskchange}) {
  
    function handleChange(id) {
        // console.log(`item with id ${id} was ${checked ? 'checked' : 'unchecked'}`);
        
        const newlist = list.map((item) => {
            if (item.id === id) {
                item.setChecked(!item.checked);
            }
            return item;
        });
        taskchange(newlist);
    }

    function handleLiftUp(id) { 
        console.log(`item with id ${id} was lifted up`);

        const newlist = list.map((item) => {
            if (item.id === id) {
                item.setImportant(!item.important);
            }
            return item;
        });
        taskchange(newlist);
        
    }

  return (
    <div className='container'>
      <ul>
        {list.map((item) => 
          <li className={item.checked ? 'list-checked' : 'list-unchecked'}
          key={item.id}>
            <ListItem item={item} handleChange_={handleChange} handleLiftUp_={handleLiftUp} />
            </li>
        )}
      </ul>
    </div>
  );

}


function ListItem({item, handleChange_, handleLiftUp_}) {

    function handleChange(e) {
        handleChange_(item.id);
        e.stopPropagation();
    }

    function handleLiftUp(e) {
        handleLiftUp_(item.id);
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


export default List;