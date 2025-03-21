<!--
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-10 13:21:38
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-21 11:43:36
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
-->
# TODO-Calendar

A modern and intuitive calendar application that helps you manage your tasks and schedule effectively. Built with React and TypeScript, this application combines the functionality of a traditional calendar with a powerful todo list manager.

![TODO-Calendar Screenshot](/public/sample.png)

## Features

- 📅 Interactive Calendar View
- ✅ Task Management
- ⭐ Important Task Marking
- 🔄 Real-time Updates
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS
- 🔍 Task Filtering and Search
- 📊 Task Progress Tracking

## Technologies

### Frontend
- React 19
- TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Vite for build tooling

### Backend
- Node.js with Express
- MySQL database
- RESTful API architecture
- CORS enabled for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- MySQL Server
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/TODO-Calendar.git
cd TODO-Calendar
```

2. Install dependencies
```bash
npm install
```

3. Configure the database
- Create a MySQL database named `calendardb`
- Update the database configuration in `src/node/db/config.js` if needed

4. Start the development server
```bash
# Start the backend server
npm run start_node

# In a new terminal, start the frontend development server
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
TODO-Calendar/
├── public/              # Static files
├── src/                 # Source code
│   ├── app/            # Redux store configuration
│   ├── assets/         # Images and icons
│   ├── components/     # React components
│   ├── features/       # Redux slices and features
│   ├── node/          # Backend server code
│   │   └── db/        # Database configuration and queries
│   └── types/         # TypeScript type definitions
├── package.json        # Project dependencies
└── README.md          # Project documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Xiaorui Wang (xiaorui.wang@usi.ch)

## Acknowledgments

Special thanks to all contributors who have helped to improve this project.