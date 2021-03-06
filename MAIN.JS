const express = require('express');
const app = express();
  const vision = require('@google-cloud/vision');
  // Creates a client
  
  const client = new vision.ImageAnnotatorClient({
    keyFilename: 'apikey.json'
  });

  // Performs label detection on the image file
  client
    .labelDetection('./cin.pdf')
    .then(results => {
      const labels = results[0].labelAnnotations;

      console.log( results);

     labels.forEach(label => {console.log(label); });
     //  console.log(results);
    })
    .catch(err => {
      console.error('ERROR ---- :', err );
    });

app.listen(5000, '127.0.0.1', () => console.log('Server running'));
