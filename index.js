// Import the Express module
const express = require('express');
// Import the File System and Path modules (used later)
const fs = require('fs');
const path = require('path');

// Create an instance of the Express application
const app = express();
// Define the port on which the server will listen
const PORT = 8080;

// Define a route for the root URL '/'
app.get('/', (req, res) => {
  // Call the servePage function with the specified HTML file and the response object
  servePage('index.html', res);
});

// Define a route for the '/about' URL
app.get('/about', (req, res) => {
  // Call the servePage function with the specified HTML file and the response object
  servePage('about.html', res);
});

// Define a route for the '/contact-me' URL
app.get('/contact-me', (req, res) => {
  // Call the servePage function with the specified HTML file and the response object
  servePage('contact-me.html', res);
});

// Define a catch-all route for any URL not matched above
app.use((req, res) => {
  // Call the servePage function with the 404 HTML file, response object, and 404 status code
  servePage('404.html', res, 404);
});

// Define a function to serve a specific HTML file
function servePage(page, res, status = 200) {
  // Create the file path by joining the current directory with the specified HTML file
  const filePath = path.join(__dirname, page);

  // Read the content of the file asynchronously
  fs.readFile(filePath, 'utf8', (err, content) => {
    // Check for errors during file read
    if (err) {
      // Send a 500 Internal Server Error response
      res.status(500).send('Internal Server Error');
    } else {
      // Send the content of the HTML file as the response
      // Also, set the HTTP status code and content type header
      res.status(status).type('text/html').send(content);
    }
  });
}

// Start the server on the specified port and log a message when the server is running
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
