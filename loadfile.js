
function main(bucketName = 'bucket1-swati', filename = 'E:\emp.json') {


   var bucketName = 'bucket1-swati';

   var filename = 'E:\emp.json';


  // Imports the Google Cloud client library

  const {Storage} = require('@google-cloud/storage');


  // Creates a client

  const storage = new Storage();



  async function uploadFile() {

    // Uploads a local file to the bucket

    await storage.bucket(bucketName).upload(filename, {

      
      gzip: true,

      metadata: {

        cacheControl: 'public, max-age=31536000',

      },

    });


    console.log(`${filename} uploaded to ${bucketName}.`);

  }



  uploadFile().catch(console.error);

}



main(...process.argv.slice(2));