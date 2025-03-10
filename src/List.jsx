import { useState } from 'react';
import './List.css';


function List({list, taskchange}) {
  
    function handleChange(id, checked) {
        // console.log(`item with id ${id} was ${checked ? 'checked' : 'unchecked'}`);
        
        const newlist = list.map((item) => {
            if (item.id === id) {
                item.checked = checked;
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
            <div className='list-item'>
                <CheckBox id={item.id} checked={item.checked} hander={handleChange} />
                 {item.name}
            </div>
            </li>
        )}
      </ul>
    </div>
  );

}

function CheckBox({id, checked, hander}) { // 参数本质上是一个对象，这里是结构赋值

    function handleChange(e) {
        hander(id, e.target.checked);
    }
    

    return (
        <label className='round-checkbox'>
            <input type='checkbox' checked={checked} onChange={handleChange}/>
            <span className='checkmark'>
            </span>
        </label>
    );
}

export default List;