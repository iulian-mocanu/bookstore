# Bookstore Web App

This is a basic bookstore web app that retrieves book details such as titles, copyright status, media type, and book ID from Project Gutenberg using the [Gutendex API](https://gutendex.com/).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Routes](#available-routes)
- [Technologies Used](#technologies-used)
- [Testing & Load Testing](#testing--load-testing)
- [License](#license)
- [Contributing](#contributing)

## Prerequisites

- [Node.js](https://nodejs.org/) (v12.x or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [k6](https://k6.io/) (for load testing, optional)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/iulian-mocanu/bookstore.git
   cd bookstore
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

## Running the Application

Start the server using [nodemon](https://www.npmjs.com/package/nodemon) (recommended for development):

```sh
nodemon index.js
```

Or with Node.js:

```sh
node index.js
```

The app will be accessible at [http://localhost:3001](http://localhost:3001).

### Environment Variables

No environment variables are required by default. For custom configurations, create a `.env` file in the root directory.

## Project Structure

```
├── index.js                  # Entry point for the server
├── package.json              # Project metadata and dependencies
├── public/
│   └── styles/
│       └── main.css          # CSS styles
├── views/
│   ├── book.ejs              # Book details page
│   └── index.ejs             # Home/listing page
├── k6-tests/
│   ├── load.js               # k6 load test script
│   ├── spike.js              # k6 spike test script
│   ├── package.json          # k6 test dependencies
│   └── README.md             # k6 test documentation
└── README.md                 # Project documentation
```

- **`public/`**: Static files (CSS, images, etc.)
- **`views/`**: EJS templates for rendering HTML pages
- **`index.js`**: Main server file with routes and logic
- **`k6-tests/`**: Load and spike testing scripts for performance testing

## Available Routes

| Method | Endpoint     | Description                                      |
| ------ | ------------ | ------------------------------------------------ |
| GET    | `/`          | Displays the main page                           |
| GET    | `/books`     | Displays a list of books from the Gutendex API   |
| GET    | `/books/:id` | Fetches and displays details for a specific book |
| GET    | `/health`    | Health check endpoint                            |

## Technologies Used

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for Node.js
- **EJS**: Templating engine for rendering HTML
- **Axios**: HTTP client for making API requests
- **Gutendex API**: External API to retrieve book information
- **k6**: Load testing tool (see below)

## Testing & Load Testing

### Manual Testing

- Visit [http://localhost:3001](http://localhost:3001) in your browser.
- Use the UI to browse and view books.

### Automated Load Testing

Load and spike tests are provided in the [`k6-tests/`](k6-tests/README.md) directory.

#### To run a load test:

1. Start your server (`npm start` or `nodemon index.js`).
2. In a separate terminal, run:

   ```sh
   cd k6-tests
   k6 run load.js
   k6 run spike.js

   ```

See [`k6-tests/README.md`](k6-tests/README.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork and submit a pull request

---
