/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 15:51:00
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-19 13:35:28
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import poolPromise from "./config.js";

// Fetch all items
const getItems = async () => {
  try {
    const pool = await poolPromise;
    const [rows] = await pool.query("SELECT * FROM calendar ORDER BY important DESC, updateTime DESC");
    return rows;
  } catch (err) {
    console.error("Error fetching items:", err);
    throw err;
  }
};

const getItemById = async (id) => {
    try {
      const pool = await poolPromise;
      const [rows] = await pool.query("SELECT * FROM calendar WHERE id = ?", [id]);
      return rows[0]; // Return the first matching row (or undefined if not found)
    } catch (err) {
      console.error("Error fetching item by id:", err);
      throw err;
    }
  };

  const getItemsByDate = async (date) => {
    try {
      const pool = await poolPromise;
      const [rows] = await pool.query("SELECT * FROM calendar WHERE createDate = ? ORDER BY important DESC, updateTime DESC", [date]);
      return rows;
    } catch (err) {
      console.error("Error fetching items by date:", err);
      throw err;
    }
  };

  const getItemsByDayRange = async (startDate, endDate) => {
    try {
      const pool = await poolPromise;
      const [rows] = await pool.query("SELECT * FROM calendar WHERE createTime BETWEEN ? AND ? ORDER BY important DESC, updateTime DESC", [startDate, endDate]);
      return rows;
    } catch (err) { 
      console.error("Error fetching items by day range:", err);
      throw err;
    }
  };

  const updateItemById = async (id, updateTime, expireTime, checked, important) => {
    try {
      const pool = await poolPromise;
      const [result] = await pool.query(
        "UPDATE calendar SET updateTime = ?, expireTime = ?, checked = ?, important = ? WHERE id = ?",
        [updateTime, expireTime, checked, important, id]
      );
      return result.affectedRows;
    } catch (err) {
      console.error("Error updating item:", err);
      throw err;
    }
  };
  

// Insert a new item
  const addItem = async (name, checked, important, createTime, expireTime, updateTime, createDate) => {
  try {
    const pool = await poolPromise;
    const [result] = await pool.query(
      "INSERT INTO calendar (name, checked, important, createTime, expireTime, updateTime, createDate) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, checked, important, createTime, expireTime, updateTime, createDate]
    );
    return result.insertId;
  } catch (err) {
    console.error("Error adding item:", err);
    throw err;
  }
};

export { getItems, getItemById, getItemsByDate, getItemsByDayRange, updateItemById, addItem };

