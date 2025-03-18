/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 15:51:00
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-18 16:18:14
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import poolPromise from "./config.js";

// Fetch all items
const getItems = async () => {
  try {
    const pool = await poolPromise;
    const [rows] = await pool.query("SELECT * FROM calendar"); // Corrected table name
    return rows;
  } catch (err) {
    console.error("Error fetching items:", err);
    throw err;
  }
};

const getItemById = async (id) => {
    try {
      const pool = await poolPromise;
      // Parameterized query to fetch the item by id
      const [rows] = await pool.query("SELECT * FROM calendar WHERE id = ?", [id]);
      return rows[0]; // Return the first matching row (or undefined if not found)
    } catch (err) {
      console.error("Error fetching item by id:", err);
      throw err;
    }
  };

  const getItemsByDay = async (day) => {
    try {
      const pool = await poolPromise;
      // Parameterized query to fetch the item by id
      const [rows] = await pool.query("SELECT * FROM calendar WHERE day = ?", [day]);
      return rows; // Return the first matching row (or undefined if not found)
    } catch (err) {
      console.error("Error fetching item by id:", err);
      throw err;
    }
  };

  const getItemsByMonth = async (month) => {
    try {
      const pool = await poolPromise;
      // Parameterized query to fetch the item by id
      const [rows] = await pool.query("SELECT * FROM calendar WHERE month = ?", [month]);
      return rows; // Return the first matching row (or undefined if not found)
    } catch (err) {
      console.error("Error fetching item by id:", err);
      throw err;
    }
  };

  const getItemsByYear = async (year) => {
    try {
      const pool = await poolPromise;
      const [rows] = await pool.query("SELECT * FROM calendar WHERE year = ?", [year]);
      return rows; // Return the first matching row (or undefined if not found)
    } catch (err) {
      console.error("Error fetching item by id:", err);
      throw err;
    }
  };
  

  const updateItemByBid = async (id, updateTime, expireTime, checked, important) => {
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
const addItem = async (name, checked, important, createTime, expireTime, updateTime, day, month, year) => {
  try {
    const pool = await poolPromise;
    const [result] = await pool.query(
      "INSERT INTO calendar (name, checked, important, createTime, expireTime, updateTime, day, month, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, checked, important, createTime, expireTime, updateTime, day, month, year]
    );
    return result.insertId;
  } catch (err) {
    console.error("Error adding item:", err);
    throw err;
  }
};

export { getItems, getItemById, getItemsByDay, getItemsByMonth, getItemsByYear, updateItemByBid, addItem };

