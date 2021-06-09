
const express = require('express');
const app = express();

// Imports the Google Cloud client library.
const {Storage} = require('@google-cloud/storage');

// Instantiates a client. Explicitly use service account credentials by
// specifying the private key file. All clients in google-cloud-node have this
// helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
  const projectId = '6f4d026395ae075d33adfdb30381579a6403db07'
 const keyFilename = 'apikey.json'
const storage = new Storage({projectId, keyFilename});

// Makes an authenticated API request.
async function listBuckets() {
  try {
    const [buckets] = await storage.getBuckets();

    console.log('Buckets:');
    buckets.forEach(bucket => {
      console.log(bucket.name);
    });
  } catch (err) {
    console.error('ERROR:', err);
  }
}
listBuckets();

app.listen(5000, '127.0.0.1', () => console.log('Server running'));