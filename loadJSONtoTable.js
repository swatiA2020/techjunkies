
'use strict';



function main(datasetId = 'my_dataset', tableId = 'my_table') {

  
  // Import the Google Cloud client libraries

  const {BigQuery} = require('@google-cloud/bigquery');

  const {Storage} = require('@google-cloud/storage');



  // Instantiate clients

  const bigquery = new BigQuery();

  const storage = new Storage();


  const bucketName = 'bucket1-swati';

  const filename = 'emp.json';



  async function loadJSONFromGCS() {

    // Imports a GCS file into a table with manually defined schema.


    const datasetId = "my_new_dataset_SA";
     const tableId = "table1_swati";


    const metadata = {

      sourceFormat: 'NEWLINE_DELIMITED_JSON',

      schema: {

        fields: [

            {name: 'userId', type: 'STRING'},

            {name: 'firstName', type: 'STRING'},
        
            {name: 'lastName', type: 'STRING'},
        
            {name: 'phoneNumber', type: 'STRING'},
        
            {name: 'emailAddress', type: 'STRING'},

        ],

      },

      location: 'US',

    };



    // Load data from a Google Cloud Storage file into the table

    const [job] = await bigquery

      .dataset(datasetId)

      .table(tableId)

      .load(storage.bucket(bucketName).file(filename), metadata);

    // load() waits for the job to finish

    console.log(`Job ${job.id} completed.`);



    // Check the job's status for errors

    const errors = job.status.errors;

    if (errors && errors.length > 0) {

      throw errors;

    }

  }

  
  loadJSONFromGCS();

}



main(...process.argv.slice(2));