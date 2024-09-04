# Urls x Quiz Application Backend

### This Urls x Quiz Application Backend is a Node.js server application built with Express.js and MongoDB. It provides RESTful API endpoints to manage quizzes, allowing users to create quizzes, retrieve active quizzes, get quiz results, and fetch all quizzes.

## Table of Contents

-  [Getting Started](#getting-started)
   -  [Prerequisites](#prerequisites)
   -  [Installation](#installation)
   -  [Configuration](#configuration)
-  [Usage](#usage)
-  [Endpoints](#endpoints)
-  [Contributing](#contributing)
-  [License](#license)

## Getting Started

Welcome to the Urls x Quiz Application Backend! This section will guide you through the process of setting up and using the project.

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

-  [Node.js](https://nodejs.org/en)
-  [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

Follow these steps to install and run the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/AshiqurRahaman02/urls-server.git
   ```

2. Navigate to the project directory:

   ```bash
   cd urls-server
   ```

3. Set up your environment variables by creating a `.env` file in the root directory. Example content:

   ```bash
    DATABASE_URL=

    BASE_URL=

    PORT=
    jwt_secret_key=

   ```

4. Install the packages:

   ```bash
   npm i
   ```

5. Start your server:

   ```bash
   npm run server
   ```

### Configuration

Before running the application, make sure to configure the necessary environment variables in the `.env` file.

## Usage

To use the project, follow these steps:

1. Create a Short URL:

   ```bash
    curl -X POST -H "Content-Type: application/json"
    -d '{"url": "https://www.example.com"}'
    http://localhost:5151/
   ```

1. Redirect to Original URL:

   ```bash
    curl -X GET http://localhost:5151/{shortUrlId}
   ```

1. Delete a URL:

   ```bash
    curl -X DELETE -H "Content-Type: application/json" -d '{"url": "https://www.example.com"}'
    http://localhost:5151/
   ```

1. Create a Quiz:

   ```bash
    curl -X POST -H "Content-Type: application/json"
    -d '{
            "question": "What is the capital of France?",
            "options": ["Paris", "London", "Berlin", "Rome"],
            "rightAnswer": 0,
            "startDate": "2024-09-04T10:00:00Z",
            "endDate": "2024-09-04T11:00:00Z"
        }'
    http://localhost:5000/quizzes
   ```

1. Get the Active Quiz:

   ```bash
   curl -X GET http://localhost:5000/quizzes/active
   ```

1. Get Quiz Results (after the quiz has ended):

   ```bash
   curl -X GET http://localhost:5000/quizzes/{quizId}/result
   ```

1. Get All Quizzes:

   ```bash
   curl -X GET http://localhost:5000/quizzes/all
   ```

For more details on each endpoint and additional options, refer to the [Endpoints](#endpoints) section.

## Endpoints

Document the available API endpoints and their functionality.

-  **1. Create Short URL**
   -  **Endpoint:** `POST /`
   -  **Description:** Create a short URL for a given original URL.
   -  **Request:**
      -  **Example:**
         ```json
            "url": "https://www.example.com"
         ```
      -  **Parameters:**
         -  `url` (required): The original URL to be shortened.
   -  **Response:**
      -  **Example:**
         ```json
            "shortUrl": "http://localhost:5151/abcd1234",
            "clicks": 0
         ```
      -  **Response Properties:**
         -  `shortUrl` The generated short URL.
         -  `clicks`: The number of times the short URL has been used.
   -  **Error Responses:**
      -  `400 Bad Request`: If the URL is invalid.
      -  `500 Internal Server Error`: If there is an issue with the server.
   -  **Usage:**
      ```bash
        curl -X POST -H "Content-Type: application/json"
        -d '{"url": "https://www.example.com"}'
        http://localhost:5151/
      ```
   -  **Notes:**
      -  Ensure that the URL is valid and accessible.

---

-  **2. Redirect to Original URL**
   -  **Endpoint:** `GET /:shortUrlId`
   -  **Description:** Redirect to the original URL using the short URL.
   -  **Request:**
      -  **Example:**
         ```json
            // No request body required
         ```
      -  **Parameters:**
         -  `shortUrlId ` (required): The unique identifier for the short URL.
   -  **Response:**
      -  `Redirects` : Redirects to the original URL.
   -  **Error Responses:**
      -  `400 Bad Request`: If the short URL does not exist.
      -  `500 Internal Server Error`: If there is an issue with the server.
   -  **Usage:**
      ```bash
        curl -X GET http://localhost:5151/{shortUrlId}
      ```
   -  **Notes:**
      -  The original URL will open in your browser or application.

---

-  **3. Delete URL**
   -  **Endpoint:** `DELETE /`
   -  **Description:** Delete a URL from the database.
   -  **Request:**
      -  **Example:**
         ```json
            "url": "https://www.example.com"
         ```
      -  **Parameters:**
         -  `url` (required): The original URL to be deleted.
   -  **Response:**
      -  **Example:**
         ```json
            "message": "Url https://www.example.com deleted"
         ```
   -  **Error Responses:**
      -  `400 Bad Request`: If the URL does not exist.
      -  `500 Internal Server Error`: If there is an issue with the server.
   -  **Usage:**
      ```bash
        curl -X DELETE -H "Content-Type: application/json"
        -d '{"url": "https://www.example.com"}'
        http://localhost:5151/
      ```
   -  **Notes:**
      -  Ensure the URL is correct before sending the delete request.

---

-  **4. Create a Quiz**
   -  **Endpoint:** `POST /quizzes`
   -  **Description:** Create a new quiz by providing the question, answer options, and other relevant details.
   -  **Request:**
      -  **Example:**
         ```json
            "question": "What is the capital of France?",
            "options": ["Paris", "London", "Berlin", "Rome"],
            "rightAnswer": 0,
            "startDate": "2024-09-04T10:00:00Z",
            "endDate": "2024-09-04T11:00:00Z"
         ```
      -  **Parameters:**
         -  `question` (required, String): The text of the quiz question.
         -  `options` (required, Array of Strings): An array of answer options.
         -  `rightAnswer` (required, Number): The index of the correct answer in the options array (starting from 0).
         -  `startDate` (required, String): The date and time when the quiz should start (in ISO format).
         -  `endDate` (required, String): The date and time when the quiz should end (in ISO format).
   -  **Response:**
      -  **Example:**
         ```json
            "isError": false,
            "message": "Quiz created successfully",
            "quiz": {
                "id": "64f5f7e5c2b8e93f3b8",
                "question": "What is the capital of France?",
                "options": ["Paris", "London", "Berlin", "Rome"],
                "rightAnswer": 0,
                "startDate": "2024-09-04T10:00:00Z",
                "endDate": "2024-09-04T11:00:00Z"
            }
         ```
      -  **Response Properties:**
         -  `201 Created` Indicates the quiz was successfully created.
         -  `isError`: A boolean indicating whether there was an error during the operation.
         -  `message`: A message describing the outcome of the operation.
         -  `quiz`: The quiz object that was created.
   -  **Error Responses:**
      -  `400 Bad Request`: If any required fields are missing or invalid.
      -  `500 Internal Server Error`: If there is an internal error during quiz creation.
   -  **Usage:**
      ```bash
        curl -X POST -H "Content-Type: application/json"
        -d '{
                "question": "What is the capital of France?",
                "options": ["Paris", "London", "Berlin", "Rome"],
                "rightAnswer": 0,
                "startDate": "2024-09-04T10:00:00Z",
                "endDate": "2024-09-04T11:00:00Z"
            }'
        http://localhost:5000/quizzes
      ```
   -  **Notes:**
      -  Ensure that the quiz details are correctly formatted according to the requirements.

---

-  **5. Get Active Quiz**
   -  **Endpoint:** `GET /quizzes/active`
   -  **Description:** Retrieve the currently active quiz based on the start and end time.
   -  **Request:**
      -  **Example:**
         ```json
         // No request body required
         ```
   -  **Response:**
      -  **Example:**
         ```json
            "isError": false,
            "message": "Active quiz retrieved successfully",
            "quiz": {
                "id": "64f5f7e5c2b8e93f3b8f2f9e",
                "question": "What is the capital of France?",
                "options": ["Paris", "London", "Berlin", "Rome"],
                "rightAnswer": 0,
                "startDate": "2024-09-04T10:00:00Z",
                "endDate": "2024-09-04T11:00:00Z",
                "status": "active"
            }
         ```
      -  **Response Properties:**
         -  `201 OK` Indicates the active quiz was retrieved successfully.
         -  `isError`: A boolean indicating whether there was an error during the operation.
         -  `message`: A message describing the outcome of the operation.
         -  `quiz`: The active quiz object, including its status.
   -  **Error Responses:**
      -  `404 Not Found`: If there is no currently active quiz.
      -  `500 Internal Server Error`: If there is an internal error during the operation.
   -  **Usage:**
      ```bash
      curl -X GET http://localhost:5000/api/quizzes/active
      ```
   -  **Notes:**
      -  The quiz status will be active if the current time falls between the start and end time.

---

-  **6. Get Quiz Result**
   -  **Endpoint:** `GET /quizzes/{quizId}/result`
   -  **Description:** Retrieve the result of a quiz after 5 minutes of the quiz's end time.
   -  **Request:**
      -  **Example:**
         ```json
            // No request body required
         ```
      -  **Parameters:**
         -  `quizId` (required, String): The unique identifier of the quiz.
   -  **Response:**
      -  **Example:**
         ```json
            "isError": false,
            "message": "Quiz result retrieved successfully",
            "result": {
                "correctAnswerIndex": 0,
                "correctAnswer": "Paris",
                "quizEnded": true
            }
         ```
      -  **Response Properties:**
         -  `201 OK` : Indicates the quiz result was retrieved successfully.
         -  `isError`: A boolean indicating the error of the operation.
         -  `newUser`: The newly created user.
         -  `result`: An object containing the correct answer index, the correct answer text, and the quiz status.
   -  **Error Responses:**
      -  `400 Bad Request`: If the quiz result is requested before 5 minutes after the quiz end time.
      -  `404 Not Found`: If the quiz with the specified ID is not found.
      -  `500 Internal Server Error`: If there is an internal error during the operation.
   -  **Usage:**
      ```bash
      curl -X GET http://localhost:5000/quizzes/{quizId}/result
      ```
   -  **Notes:**
      -  Replace `{quizId}` with the actual quiz ID in the request URL.

---

-  **7. Get All Quizzes**

   -  **Endpoint:** `GET /quizzes/all`
   -  **Description:** Retrieve all quizzes, including inactive and finished ones.
   -  **Request:**
      -  **Example:**
         ```json
         // No request body required
         ```
   -  **Response:**

      -  **Example:**

         ```json

            "isError": false,
            "message": "All quizzes retrieved successfully",
            "quizzes": [
                {
                "id": "64f5f7e5c2b8e93f3b8f2f9e",
                "question": "What is the capital of France?",
                "options": ["Paris", "London", "Berlin", "Rome"],
                "rightAnswer": 0,
                "startDate": "2024-09-04T10:00:00Z",
                "endDate": "2024-09-04T11:00:00Z",
                "status": "finished"
                },
                ...
            ]


         ```

      -  **Response Properties:**
         -  `200 OK` : Indicates all quizzes were retrieved successfully.
         -  `isError`: A boolean indicating whether there was an error during the operation.
         -  `message`: A message describing the outcome of the operation.
         -  `quizzes`: An array of quiz objects, each including its status (e.g., `active`, `inactive`, or `finished`).

   -  **Error Responses:**
      -  `500 Internal Server Error`: If there is an internal error during the operation.
   -  **Usage:**
      ```bash
      curl -X GET http://localhost:5000/quizzes/all
      ```
   -  **Notes:**
      -  This endpoint returns all quizzes regardless of their status, providing a comprehensive view of all created quizzes.

---

## Application

To use the cointab application you need to read the configuration at [urls](https://github.com/AshiqurRahaman02/urls.git)

## Contributing

Thank you for considering contributing to our project! Whether you're reporting a bug, proposing a feature, or submitting code changes, your contributions are highly appreciated.

## Issues

If you find a bug, have a question, or want to propose a new feature, check our issue tracker for existing topics. If not found, feel free to open a new issue and provide details such as a clear title, steps to reproduce, and your environment.

## Feature Requests

Have a feature in mind? We welcome new ideas and enhancements. Open an issue on our GitHub repository to discuss and share your thoughts with the community.

## Pull Requests

Contributions through pull requests are welcome. To contribute:

1. Fork the repository.

2. Create a new branch for your changes: git checkout -b feature/your-feature.

3. Make changes following our coding standards.

4. Push changes to your fork: git push origin feature/your-feature.

5. Open a pull request on GitHub with a clear description of your changes.

## Coding Standards

-  **Indentation and Formatting:**

   1. Use tabs for indentation.
   2. Follow the standard React formatting guidelines. You can use the Prettier extension to automatically format your code.
   3. Variable Naming:

-  **Variable Naming**

   1. Use meaningful and descriptive names for variables.
   2. Follow the camelCase naming convention for variables.

-  **Function Naming:**

   1. Use camelCase for function names.
   2. Choose function names that indicate their purpose.

-  **Comments:**

   1. Include comments to explain complex sections of code or to provide context.
   2. Write clear and concise comments.

-  **Error Handling:**

   1. Properly handle errors using the if err != nil pattern.
   2. Avoid generic error messages; provide specific details when handling errors.

-  **Testing:**

   1. Write comprehensive unit tests for your code.
   2. Ensure that tests cover different scenarios and edge cases.

-  **Documentation:**

   1. Provide documentation for public functions and packages.
   2. Use GoDoc-style comments for documenting functions and packages.

-  **Imports:**

   1. Group imports into standard library packages, third-party packages, and local packages.
   2. Avoid unused imports.

-  **Concurrency and Goroutines:**

   1. Use goroutines and channels responsibly.
   2. Ensure proper synchronization to avoid race conditions.

-  **Code Modularity:**

   1. Encapsulate functionality into modular functions and packages.
   2. Aim for a clear separation of concerns.

-  **Security:**

   1. Follow security best practices, especially when dealing with user input.
   2. Be mindful of potential vulnerabilities and address them promptly.

-  **Version Control:**

   1. Make small, meaningful commits with clear commit messages.
   2. Avoid committing large binary files or sensitive information.

## Getting Help

For questions or assistance, open an issue or join community discussions.

##

```
Thank you for contributing! Feel free to customize it based on your project's specifics.
```
