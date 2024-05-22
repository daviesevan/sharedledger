
---

# Shared Expense Tracker

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The Shared Expense Tracker is a web application that allows users to manage personal and shared expenses efficiently. Built using Flask for the backend and React for the frontend, it supports user authentication, group expense management, and detailed reporting.

## Features
- User authentication (sign up, login, password reset)
- Dashboard with expense overview
- Create and manage groups for shared expenses
- Add, edit, and delete expenses
- Categorize and attach receipts to expenses
- Define and manage shared expenses within groups
- Notifications and reminders for due payments
- Generate and download expense reports
- Support for multiple currencies
- Mobile-responsive design

## Tech Stack
- **Frontend**: React, Redux, Material-UI
- **Backend**: Flask, SQLAlchemy
- **Database**: PostgreSQL
- **Authentication**: Flask-Login, OAuth (optional)
- **Testing**: Jest (React), Pytest (Flask)
- **Deployment**: Docker, Heroku/AWS

## Installation

### Prerequisites
- Python 3.12+
- Node.js 21.7.x
- PostgreSQL

### Backend Setup
1. Clone the repository:
    ```sh
    git clone https://github.com/daviesevan/shareledger.git
    cd shareledger/backend
    ```

2. Create a virtual environment and install dependencies:
    ```sh
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

3. Set up environment variables (create a `.env` file):
    ```
    FLASK_APP=run.py
    FLASK_ENV=development
    DATABASE_URL=postgresql://username:password@localhost/expensetracker
    SECRET_KEY=your_secret_key
    ```

4. Initialize the database:
    ```sh
    flask db init
    flask db migrate
    flask db upgrade
    ```

5. Run the backend server:
    ```sh
    flask run
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

## Usage
1. Open your browser and navigate to `http://localhost:3000` to access the application.
2. Sign up for a new account or log in with existing credentials.
3. Create a group and invite members.
4. Add expenses and define how they should be shared among group members.
5. View and manage your expenses through the dashboard.

## API Endpoints

### User Management
- **POST /api/auth/signup**: Create a new user
- **POST /api/auth/login**: Authenticate a user
- **GET /user/{id}**: Retrieve user details

### Group Management
- **POST /groups**: Create a new group
- **GET /groups/{id}**: Retrieve group details
- **POST /groups/{id}/members**: Add a user to a group
- **GET /groups/{id}/members**: List all members of a group

### Expense Management
- **POST /expenses**: Create a new expense
- **GET /expenses/{id}**: Retrieve expense details
- **POST /groups/{id}/expenses**: Add an expense to a group
- **GET /groups/{id}/expenses**: List all expenses of a group

### Shared Expenses
- **POST /expenses/{id}/share**: Define how an expense is shared among group members
- **GET /expenses/{id}/share**: Retrieve details of how an expense is shared

## Database Schema
- **Users**: Stores user information
- **Groups**: Stores group information
- **GroupMemberships**: Stores relationships between users and groups
- **Expenses**: Stores expense information
- **SharedExpenses**: Stores how expenses are shared among users

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.


