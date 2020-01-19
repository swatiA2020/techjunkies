'use strict';



function main(datasetId = 'my_new_dataset_SA') {

  // [START bigquery_create_dataset]

  // Import the Google Cloud client library and create a client

  const {BigQuery} = require('@google-cloud/bigquery');

  const bigquery = new BigQuery();



  async function createDataset() {

    

    const options = {

      location: 'US',

    };



    // Create a new dataset

    const [dataset] = await bigquery.createDataset(datasetId, options);

    console.log(`Dataset ${dataset.id} created.`);

  }

  createDataset();

  // [END bigquery_create_dataset]

}



main(...process.argv.slice(2));