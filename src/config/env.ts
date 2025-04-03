/// <reference types="vite/client" />

/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-04-03 13:01:30
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-03 13:01:40
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */


// src/config/env.ts
const env = {
    API_HOST: import.meta.env.VITE_API_HOST,
    DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true'
  };
  
  export default env;