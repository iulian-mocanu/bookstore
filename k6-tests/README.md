# k6 Load Test for Bookstore API

This directory contains a load test script for the Bookstore web app using [k6](https://k6.io/).

## Overview

The script [`load.js`](k6-tests/load.js) simulates user traffic to the Bookstore API, testing the following endpoints:

- `/health` (health check)
- `/` (home page)
- `/books` (list of books)
- `/books/:id` (individual book details)
- `/nonexistent` (404 error route)
- `/styles.css` (static asset)

## Prerequisites

- [k6](https://k6.io/docs/getting-started/installation/) installed globally
- Bookstore API running locally on `http://localhost:3001`

## How to Run

1. Start your Bookstore server:

   ```sh
   npm start
   ```

   or

   ```sh
   nodemon index.js
   ```

2. In a separate terminal, navigate to the `k6-tests` directory and run:
   ```sh
   k6 run load.js
   ```

## Test Stages

The test ramps up and down the number of virtual users (VUs):

- 2 VUs for 30s
- 4 VUs for 30s
- 5 VUs for 30s
- 5 VUs for 30s
- 0 VUs for 30s

## Checks & Thresholds

- 95% of requests should complete in under 500ms
- Error rate should be below 10%
- Each endpoint is checked for expected status codes and content

## Custom Metrics

- `errors`: Tracks failed checks

## File Structure

```
k6-tests/
  ├── load.js         # k6 load test script
  └── package.json    # (optional) for k6 type definitions
```

## References

- [k6 Documentation](https://k6.io/docs/)
- [Bookstore API](../index.js)
