# K-Hub Notes Application

Welcome to the K-Hub Notes Application! This project is a full-stack web application designed to allow users to create, update, and delete notes. The frontend is built using React, and the backend is powered by Node.js and Express.

## Features

- User Registration and Authentication
- Create, Read, Update, and Delete Notes
- Responsive Design

## Technologies Used

- Frontend: React, React Router
- Backend: Node.js, Express
- Authentication: JWT (JSON Web Tokens)
- Styling: Bootstrap

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository

    ```sh
    git clone https://github.com/kovvurisuryavenkatareddy/NOTES_APPLICATION_K-HUB.git
    ```

2. Navigate to the project directory

    ```sh
    cd NOTES_APPLICATION_K-HUB
    ```

3. Install the dependencies for the backend

    ```sh
    cd backend
    npm install
    ```

4. Install the dependencies for the frontend

    ```sh
    cd ../frontend
    npm install
    ```

### Running the Application

1. Start the backend server

    ```sh
    cd backend
    npm start
    ```

2. Start the frontend development server

    ```sh
    cd ../frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

The project is divided into two main parts:

- `backend`: Contains the server-side code, including routes, controllers, and models.
- `frontend`: Contains the client-side code, including components, pages, and services.

## API Endpoints

### Authentication

- `POST /register`: Register a new user
- `POST /login`: Log in a user

### Notes

- `GET /notes`: Get all notes for the logged-in user
- `POST /notes`: Create a new note
- `PUT /notes/:id`: Update a note by ID
- `DELETE /notes/:id`: Delete a note by ID

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Kovvuri Surya Venkata Reddy - [GitHub Profile](https://github.com/kovvurisuryavenkatareddy)

---

Thank you for checking out the K-Hub Notes Application! We hope you find it useful and easy to use.
