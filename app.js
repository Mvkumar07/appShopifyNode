const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Use CORS to allow all origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
  /**/
});

// Another route to demonstrate CORS
app.get('/api/data', (req, res) => {
    const data = req.body;
  res.json({
    message: 'Data received successfully',
    receivedData: data,
  });
});

// Handle POST requests
app.post('/api/data', async(req, res) => {
  /*const data = req.body;
  console.log(data.code);
  if(data.code!=""){
    const targetUrl = 'https://fmindia.co/FMIHealth/shopify-api-app.php'; // Change this to your target URL
    res.redirect(302, targetUrl);
  }
  res.json({ message: 'Data received successfully', data }); */


  try {
    // Extract data from the request body
    const data = req.body;

    // Log received data for debugging
    console.log('Received data:', data);

    // Define the fake server URL (you can use a mock API endpoint)
    const fakeServerUrl = 'https://fmindia.co/FMIHealth/shopify-api-app.php';

    // Send POST request to the fake server using Fetch API
    const response = await fetch(fakeServerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        const errorText = await response.text(); // Get the error response text
        console.log('Response Status:', response.status); // Log status code
        console.log('Response Headers:', response.headers.raw()); // Log headers
        throw new Error(`Error from fake server: ${response.status} ${response.statusText}. Details: ${errorText}`);
      }
  
      // Parse JSON response from the fake server
      const responseData = await response.json();
  
      // Log response data for debugging
      console.log('Response from fake server:', responseData);
  
      // Send back the response from the fake server to the client
      res.status(200).json({
        message: 'Data sent to fake server successfully',
        fakeServerResponse: responseData,
      });
  } catch (error) {
    // Log error for debugging
    console.error('Error:', error);

    // Handle errors and send an appropriate response to the client
    res.status(500).json({
      message: 'Failed to send data to fake server',
      error: error.message,
    });
  }

});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
