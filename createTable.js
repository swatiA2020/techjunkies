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

  // [START bigquery_create_table]

  // Import the Google Cloud client library and create a client

  const {BigQuery} = require('@google-cloud/bigquery');

  const bigquery = new BigQuery();



  async function createTable() {

    // Creates a new table named "my_table" in "my_dataset".



    /**

     * TODO(developer): Uncomment the following lines before running the sample.

     */

    // const datasetId = "my_dataset";

    // const tableId = "my_table";

    // const schema = 'Name:string, Age:integer, Weight:float, IsMagic:boolean';



    // For all options, see https://cloud.google.com/bigquery/docs/reference/v2/tables#resource

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

  // [END bigquery_create_table]

  createTable();

}

main(...process.argv.slice(2));