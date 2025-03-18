/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 15:51:00
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-17 18:11:20
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import mysql from "mysql2/promise";

// Database configuration
const config = {
  host: "localhost",    // MySQL server hostname
  user: "root",         // MySQL username
  password: "",         // MySQL password
  database: "calendardb" // MySQL database name
};

// SQL query to create the database if it doesn't exist
const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${config.database};`;

/**
 * export interface ItemData {
    id: number;
    name: string;
    checked: boolean;
    important: boolean;
    createTime: string;
    expireTime: string | null;
    updateTime: string;
}
 */
// SQL query to create the table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS calendar (
      id INT AUTO_INCREMENT PRIMARY KEY,     
      Name VARCHAR(255) NOT NULL,             
      Checked BOOLEAN DEFAULT FALSE,                                
      Important BOOLEAN DEFAULT FALSE,
      CreateTime VARCHAR(255) NOT NULL,              
      ExpireTime VARCHAR(255),                
      UpdateTime VARCHAR(255) NOT NULL, 
      Day VARCHAR(255) NOT NULL,
      Month VARCHAR(255) NOT NULL,
      Year VARCHAR(255) NOT NULL
  );
`;

// Function to ensure the table exists
const initializeDatabase = async () => {
  try {
    // Create a connection to MySQL server without specifying the database
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password
    });
    // Create the database if it doesn't exist
    await connection.query(createDatabaseQuery);
    console.log(`Database \`${config.database}\` created or already exists.`);
    connection.end(); // Close this connection

    // Create a connection pool for the specific database
    const pool = mysql.createPool({
      ...config,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      dateStrings: true
    });

    const connectionFromPool = await pool.getConnection();
    await connectionFromPool.query(createTableQuery);
    connectionFromPool.release(); // Release the connection back to the pool

    return pool;
  } catch (err) {
    console.error("Error creating table:", err);
    throw err;
  }
};

// Initialize the database when the module is imported
const poolPromise = initializeDatabase();

export default poolPromise;

