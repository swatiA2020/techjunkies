
'use strict';



function main(datasetId = 'my_dataset', tableId = 'my_table') {

  // [START bigquery_load_table_gcs_json]

  // Import the Google Cloud client libraries

  const {BigQuery} = require('@google-cloud/bigquery');

  const {Storage} = require('@google-cloud/storage');



  // Instantiate clients

  const bigquery = new BigQuery();

  const storage = new Storage();



  /**

   * This sample loads the json file at

   * https://storage.googleapis.com/cloud-samples-data/bigquery/us-states/us-states.json

   *

   * TODO(developer): Replace the following lines with the path to your file.

   */

  const bucketName = 'bucket1-swati';

  const filename = 'emp.json';



  async function loadJSONFromGCS() {

    // Imports a GCS file into a table with manually defined schema.



    /**

     * TODO(developer): Uncomment the following lines before running the sample.

     */

    const datasetId = "my_new_dataset_SA";
     const tableId = "table1_swati";



    // Configure the load job. For full list of options, see:

    // https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#JobConfigurationLoad

    const metadata = {

      sourceFormat: 'NEWLINE_DELIMITED_JSON',

      schema: {

        fields: [

            {name: 'userId', type: 'STRING'},

            {name: 'firstName', type: 'STRING'},
        
            {name: 'lastName', type: 'STRING'},
        
            {name: 'phoneNumber', type: 'INTEGER'},
        
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

  // [END bigquery_load_table_gcs_json]

  loadJSONFromGCS();

}



main(...process.argv.slice(2));