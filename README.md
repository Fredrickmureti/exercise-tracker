Exercise Tracker App

Exercise Tracker App is a web application that allows users to log their activities, track their exercise routines, and receive notifications when scheduled activities are due.

## Table of Contents

1. [About](#about)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
5. [Usage](#usage)
6. [API Reference](#api-reference)
7. [Contributing](#contributing)
8. [License](#license)
9. [Acknowledgments](#acknowledgments)

## About

Exercise Tracker App is a solo project developed by Fredrick Mureti. The application is designed to help users manage their exercise routines by providing features for logging activities, tracking progress, and setting reminders for upcoming exercises.

## Technologies Used

- **Frontend**:

  - React
  - JavaScript
  - Axios

- **Backend**:

  - Node.js
  - Express
  - MongoDB

- **Styling**:

  - Tailwind CSS

- **Others**:
  - JWT (JSON Web Tokens) for authentication
  - Moment.js for date and time manipulation

## Features

- User authentication and registration
- Logging exercises with descriptions, durations, and dates
- Viewing exercise logs and activity history
- Setting reminders and notifications for upcoming exercises
- Responsive design for seamless use on mobile and desktop devices

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Fredrickmureti/exercise-tracker.git
   cd exercise-tracker
   ```

2. Install dependencies:

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   # From the 'server' directory
   npm start
   ```

2. Start the client:

   ```bash
   # From the 'client' directory
   npm start
   ```

3. Open http://localhost:3000 in your browser to use the app.

## API Reference

The Exercise Tracker API provides the following endpoints:

- `POST /api/users`: Register a new user.
- `POST /api/auth/login`: Authenticate user login.
- `POST /api/exercises`: Add a new exercise.
- `GET /api/exercises/:userId`: Get exercises for a specific user.
- `PUT /api/exercises/:exerciseId`: Update an exercise.
- `DELETE /api/exercises/:exerciseId`: Delete an exercise.

For more detailed API documentation, refer to the source code.

## Contributing

Contributions to Exercise Tracker App are welcome! To contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.
