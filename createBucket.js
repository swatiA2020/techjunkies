/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const bucketName = 'my-bucket_SA';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

async function createBucket() {
  // Creates a new bucket in the Asia region with the coldline default storage
  // class. Leave the second argument blank for default settings.
  //
  // For default values see: https://cloud.google.com/storage/docs/locations and
  // https://cloud.google.com/storage/docs/storage-classes

  const [bucket] = await storage.createBucket(bucketName, {
    location: 'ASIA',
    storageClass: 'COLDLINE',
  });

  console.log(`Bucket ${bucket.name} created.`);
}

createBucket();