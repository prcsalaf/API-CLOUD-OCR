/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const projectId = "nimble-card-316108";
const location = "us"; // Format is 'us' or 'eu'
const processorId = "57bc2c562bf190fc"; // Create processor in Cloud Console
const filePath = "cin.pdf";

const { DocumentProcessorServiceClient } =
  require("@google-cloud/documentai").v1;

// Instantiates a client
const client = new DocumentProcessorServiceClient();


const express = require('express');
const serviceAccount  = require('./apikey.json');
const app = express();


async function processDocument() {
  // The full resource name of the processor, e.g.:
  // projects/project-id/locations/location/processor/processor-id
  // You must create new processors in the Cloud Console first
 //  const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;
const name = "https://us-documentai.googleapis.com/v1/projects/279506790020/locations/us/processors/57bc2c562bf190fc:processprojects/279506790020/locations/us/processors/57bc2c562bf190fc";

  // Read the file into memory.
  const fs = require("fs").promises;
  const imageFile = await fs.readFile(filePath);

  // Convert the image data to a Buffer and base64 encode it.
  const encodedImage = Buffer.from(imageFile).toString("base64");

  const request = {
    name :name,
    rawDocument: {
      content: encodedImage,
      mimeType: "application/pdf",  
     
    },
     keyFilename: 'apikey.json'
  };
 
   // Recognizes text entities in the PDF document
  
    const [result] = await client.processDocument(request);
  const { document } = result;    
  


  // Get all of the document text as one big string
  const { text } = document;

  // Extract shards from the text field
  const getText = (textAnchor) => {
    if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
      return "";
    }

    // First shard in document doesn't have startIndex property
    const startIndex = textAnchor.textSegments[0].startIndex || 0;
    const endIndex = textAnchor.textSegments[0].endIndex;

    return text.substring(startIndex, endIndex);
  };

  // Read the text recognition output from the processor
  console.log("The document contains the following paragraphs:");
  const [page1] = document.pages;
  const { paragraphs } = page1;

  for (const paragraph of paragraphs) {
    const paragraphText = getText(paragraph.layout.textAnchor);
    console.log(`Paragraph text:\n${paragraphText}`);
  }

  // Form parsing provides additional output about
  // form-formatted PDFs. You  must create a form
  // processor in the Cloud Console to see full field details.
  console.log("\nThe following form key/value pairs were detected:");

  const { formFields } = page1;
  for (const field of formFields) {
    const fieldName = getText(field.fieldName.textAnchor);
    const fieldValue = getText(field.fieldValue.textAnchor);

    console.log("Extracted key value pair:");
    console.log(`\t(${fieldName}, ${fieldValue})`);
  }
}
 
      processDocument().catch((er) => console.log("erreur ----"+ er)) ;
 

app.listen(5000, "127.0.0.1", () => console.log("Server running"));

// "@google-cloud/documentai": "^2.10.0",
// "@google-cloud/vision": "^2.3.3",
// "nodemon": "^2.0.7"
