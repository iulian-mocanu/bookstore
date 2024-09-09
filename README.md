# Bookstore web app
This is a basic bookstore web app that retrieves book details such as titles, copyright status, media type and book ID from the Project Gutenberg using the Gutendex API (https://gutendex.com/)

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Routes](#available-routes)
- [Technologies Used](#technologies-used)

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v12.x or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/book-api-project.git
   ```

2. Navigate into the project directory:

   ```bash
   cd book-api-project
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

## Running the Application

Use `nodemon` to start the server:

```bash
nodemon index.js
```
This will start the server and the app will be accessible at `http://localhost:3001` by default.

### Environment Variables

This project does not require any environment variables by default, but if you want to add custom configurations, create a `.env` file in the root directory and add your variables there.

## Project Structure

```
├── public/               # Static files (CSS, images, etc.)
├── views/                # EJS templates
├── index.js              # Entry point for the server
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

- **`public/`**: Contains static files like CSS and JavaScript for the frontend.
- **`views/`**: Contains EJS templates for rendering HTML pages.
- **`index.js`**: Main server file where routes and logic are defined.

## Available Routes

| Method | Endpoint         | Description                                   |
|--------|------------------|-----------------------------------------------|
| GET    | `/`              | Displays the main page|
| GET    | `/books`         | Displays a list of books from the Gutendex API |
| GET    | `/books/:id`     | Fetches and displays details for a specific book |

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **EJS**: Templating engine for rendering HTML.
- **Axios**: HTTP client for making API requests.
- **Gutendex API**: External API to retrieve book information.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Contributing

If you'd like to contribute, feel free to fork the repository and submit a pull request. Contributions are welcome!

---

