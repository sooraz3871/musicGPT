# MusicGPT

This project is a full-stack application that replicates the MusicGPT prompt box.

## Project Structure

The project is divided into two main folders:

-   `client`: Contains the Next.js frontend application.
-   `server`: Contains the Node.js backend application.

## Setup Instructions

To run the project locally, you need to have Docker and Docker Compose installed.

1.  Clone the repository.
2.  Create a `.env` file in the `server` directory with the following variables:

    ```
    PORT=8000
    POSTGRES_HOST=postgres
    POSTGRES_PORT=5432
    POSTGRES_USER=user
    POSTGRES_PASSWORD=password
    POSTGRES_DB=musicgpt
    REDIS_HOST=redis
    REDIS_PORT=6379
    ```

3.  Run the following command in the root directory:

    ```
    docker-compose up --build
    ```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:3001`.

## Design Decisions

### Frontend

-   **Framework:** Next.js was chosen for its server-side rendering capabilities, which is beneficial for performance and SEO.
-   **Styling:** Tailwind CSS was used for its utility-first approach, which allows for rapid UI development.

### Backend

-   **Framework:** Node.js with Express was chosen for its simplicity and flexibility.
-   **Database:** Postgres was chosen for its reliability and robustness.
-   **ORM:** TypeORM was used to interact with the database in a type-safe manner.
-   **Caching:** Redis was used to cache frequently accessed data, reducing the load on the database and improving performance.
-   **Architecture:** The backend follows a modular architecture with a clear separation of concerns. The repository pattern is used to abstract the data layer, and dependency injection is used to manage dependencies.
-   **Error Handling:** A global error handler is used to catch and handle all errors in a centralized location.
-   **Configuration:** All configuration is stored in environment variables, following the twelve-factor app methodology.
