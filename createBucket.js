const bucketName = 'bucket1-swati';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

async function createBucket() {
    const [bucket] = await storage.createBucket(bucketName, {
    location: 'ASIA',
    storageClass: 'COLDLINE',
  });

  console.log(`Bucket ${bucket.name} created.`);
}

createBucket();