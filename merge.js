'use strict';


function main(

  datasetId = 'my_new_dataset_SA', // Existing dataset

  tableId = 'table1_swati', // Table to be created

  schema = [

    {name: 'userId', type: 'STRING'},

    {name: 'firstName', type: 'STRING'},

    {name: 'lastName', type: 'STRING'},

    {name: 'phoneNumber', type: 'STRING'},

    {name: 'emailAddress', type: 'STRING'},

  ]

) {


  const {BigQuery} = require('@google-cloud/bigquery');

  const bigquery = new BigQuery();

// Import the Google Cloud client libraries

  const {Storage} = require('@google-cloud/storage');

  const storage = new Storage();

  const bucketName = 'bucket1-swati';

  const filename = 'emp.json';
   
   
   
  
  async function createDataset() {   

    const options = {

      location: 'US',

    };

    // Create a new dataset

    const [dataset] = await bigquery.createDataset(datasetId, options);

    console.log(`Dataset ${dataset.id} created.`);

  }
  
  
  
  

  async function createTable() {

    // Creates a new table named "my_table" in "my_dataset".

     //var datasetId = "my_new_dataset_SA";

     //var tableId = "table1_swati";

    // const schema = 'Name:string, Age:integer, Weight:float, IsMagic:boolean';

    const options = {

      schema: schema,

      location: 'US',

    };

   // Create a new table in the dataset
    const [table] = await bigquery

      .dataset(datasetId)

      .createTable(tableId, options);

    console.log(`Table ${table.id} created.`);
  } 

  
  async function loadJSONFromGCS() {

    // Imports a GCS file into a table with manually defined schema.


    var datasetId = "my_new_dataset_SA";
     var tableId = "table1_swati";


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
  
  
  
  
  createDataset();
  createTable();
  loadJSONFromGCS();

}

main(...process.argv.slice(2));

