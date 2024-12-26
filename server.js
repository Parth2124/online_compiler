const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Online Compiler!');
});

// POST route to execute JavaScript code
app.post('/execute', (req, res) => {
  const { code } = req.body;
  let output = '';

  // Overriding console.log to capture the output
  const originalLog = console.log;
  console.log = (...args) => {
    output += args.join(' ') + '\n'; // Join all the arguments as a single string
  };

  try {
    // Execute the JavaScript code
    eval(code);
    
    // If no output is captured, provide a default message
    if (output.trim() === '') {
      output = 'No output or result returned from the code.';
    }

    // Restore console.log
    console.log = originalLog;

    // Return the output or error
    res.json({ output });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
