# Course Aggregator App

This application aggregates course information from Udemy, Coursera, and YouTube, allowing users to find the best available courses. It consists of a backend (Node.js/Express) and a frontend (React).

## Prerequisites

* Node.js and npm installed.
* Docker and Docker Compose installed.

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/subediaakash/find-the-right-course.git
    cd find-the-right-course
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Create a `.env` file:**

    ```bash
    cp .env.example .env
    ```

4.  **Start the backend (Docker Compose):**

    ```bash
    docker-compose up -d
    npm run dev
    ```

    * This will start the PostgreSQL database container and the backend server.
    * The `npm run dev` command typically uses `nodemon` to watch for file changes and restart the server automatically.

5.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

6.  **Start the frontend:**

    ```bash
    npm run dev
    ```

    * This will start the React development server.
    * The frontend will typically be accessible at `http://localhost:5173`.

## Running the Application

1.  Ensure both the backend and frontend are running.
2.  Open your web browser and navigate to `http://localhost:3000` (or the appropriate port for your frontend).
3.  You can now use the application to search and browse courses from Udemy, Coursera, and YouTube.

## Backend Details

* The backend uses Node.js and Express.js to create a REST API.
* Docker and Docker Compose are used to containerize the application and manage dependencies, including a PostgreSQL database.
* Web scraping is implemented to fetch course data from the respective platforms.
* The .env file contains environment variables that the backend needs to connect to the database, and other configuration options.

## Frontend Details

* The frontend is built using React.js.
* It communicates with the backend API to fetch and display course data.
* Uses a modern UI design for user friendly experience.






