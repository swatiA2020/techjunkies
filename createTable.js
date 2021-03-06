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


  // Import the Google Cloud client library and create a client

  const {BigQuery} = require('@google-cloud/bigquery');

  const bigquery = new BigQuery();



  async function createTable() {

    // Creates a new table named "my_table" in "my_dataset".

    // const datasetId = "my_dataset";

    // const tableId = "my_table";

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


  createTable();

}

main(...process.argv.slice(2));