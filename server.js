const express = require('express');
const routes = require("./routes")

// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'corporate_db'
  },
  console.log(`Connected to the corporate database.`)
);

app.use(routes);

// Create a movie


// Default response for any other request (Not Found)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
