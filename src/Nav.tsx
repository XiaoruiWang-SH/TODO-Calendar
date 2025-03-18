/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-18 11:45:58
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-18 11:47:10
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */
import { NavLink } from "react-router";

export function MyAppNav() {
  return (
    <nav>
      <NavLink to="/" end>
        calendar
      </NavLink>
      <NavLink to="/task" end>
        task
      </NavLink>
    
    </nav>
  );
}
