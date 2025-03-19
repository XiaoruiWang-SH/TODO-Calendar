/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 15:49:09
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-19 13:40:45
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import express from "express";
import cors from "cors";
import multer from "multer";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";

import { getItems, getItemById, addItem, getItemsByDate, getItemsByDayRange, updateItemById } from "./db/queries.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import goodsItems from "./homepage.json";
// import itemdesc from "./itemdesc.json";
// import { get } from "http";


const PORT = 3030;

app.use(cors());

// Serve uploaded images statically
// app.use("/uploads", static(join(dirname(__dirname), "uploads")));

// // Set up multer for file uploads
// const storage = diskStorage({
//     destination: (req, file, cb) => {
//         const uploadPath = join(dirname(__dirname), "uploads");
//         console.log("Upload Path: " + uploadPath);
//       cb(null, uploadPath); // Directory where files will be saved
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + extname(file.originalname)); // Unique file name
//     },
//   });

// const upload = multer({ storage });


// app.use(json());
// app.use(urlencoded({ extended: true }));


// // Get the current datetime
// const currentDate = new Date();
// const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

// // Endpoint to handle image uploads
// app.post("/uploads", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }
//   const fileUrl = `/uploads/${req.file.filename}`;
//   res.send({ message: "Image uploaded successfully", filePath: req.file.path, fileUrl: fileUrl });
// });


// Define routes
app.get("/allitems", async (req, res) => {

  let tasks = [];
  try {
    tasks = await getItems();
    res.json({
      success: true,
      message: "Items fetched successfully",
      data: tasks
    });
  } catch (error) {
    console.error("Error:", error);
    res.json({
      success: false,
      message: "Failed to fetch items",
      data: null
    });
  }
});

app.get("/item", async (req, res) => {
  const { id } = req.query;
  console.log("Request Details - itemid:" + id);
  let task = {};
  try {
    task = await getItemById(id);
    res.json({
      success: true,
      message: "Item fetched successfully",
      data: task
    });
  } catch (error) {
    console.error("Error:", error);
    res.json({
      success: false,
      message: "Failed to fetch item",
      data: null
    });
  }
});

app.get("/getitemsbydate", async (req, res) => {
  const { date } = req.query;
  console.log("Request Details - date:" + date);
  let tasks = [];
  try {
    tasks = await getItemsByDate(date);
    res.json({
      success: true,
      message: "Items fetched successfully",
      data: tasks
    });
  } catch (error) {
    console.error("Error:", error);
    res.json({
      success: false,
      message: "Failed to fetch items",
      data: null
    });
  }
});

app.get("/getitemsbydayrange", async (req, res) => {
  const { startDate, endDate } = req.query;
  console.log("Request Details - startDate:" + startDate + " endDate:" + endDate);
  let tasks = [];
  try {
    tasks = await getItemsByDayRange(startDate, endDate);
    res.json({
      success: true,
      message: "Items fetched successfully",
      data: tasks
    });
  } catch (error) {
    console.error("Error:", error);
    res.json({
      success: false,
      message: "Failed to fetch items",
      data: null
    });
  }
});



app.post("/updateitem", async (req, res) => {

  const { id, updateTime, expireTime, checked, important } = req.body;
  let task = {};
  try {
    task = await updateItemById(id, updateTime, expireTime, checked, important);
    console.log("Item Description:", task);
    res.json({
      success: true,
      message: "Item updated successfully",
      data: task
    });
  } catch (error) {
    console.error("Error:", error);
    res.json({
      success: false,
      message: "Failed to update item",
      data: null
    });
  }
});


app.post("/additem", async (req, res) => {
  const {
    name,
    checked,
    important,
    createTime,
    expireTime,
    updateTime,
    createDate
  } = req.body;

  // Validate createTime
  if (!createTime) {
    return res.status(400).json({
      success: false,
      message: "Invalid request: createTime is required",
      data: null
    });
  }

  try {
    // Add an item
    const id = await addItem(
      name,
      checked,
      important,
      createTime,
      expireTime,
      updateTime,
      createDate
    );
    console.log("New Item ID:", id);
    // Respond to the client with success structure
    return res.json({
      success: true,
      message: "Item created successfully",
      data: { id, name, checked, important, createTime, expireTime, updateTime, createDate }
    });
  } catch (err) {
    console.error("Error adding item:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create item",
      data: null
    });
  }
});

// 404 Error Handling
app.use((req, res) => {
  // console.log("Request Details:");
  // console.log("URL:", req.url); // Log the request URL
  // console.log("Method:", req.method); // Log the request method (e.g., GET, POST)
  // console.log("Headers:", req.headers); // Log the request headers
  // console.log("Query Parameters:", req.query); 
  // console.log("404 Request for req:   " + req);``
  res.status(404).send("404 Not Found");
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
