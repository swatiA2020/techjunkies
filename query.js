'use strict';



function main() {

  // [START bigquery_query]

  // [START bigquery_client_default_credentials]

  // Import the Google Cloud client library using default credentials

  const {BigQuery} = require('@google-cloud/bigquery');

  const bigquery = new BigQuery();

  // [END bigquery_client_default_credentials]

  async function query() {

    // Queries the U.S. given names dataset for the state of Texas.



    const query = `SELECT firstName

      FROM \`my_new_dataset_SA.table1_swati\`

      WHERE userId = '2'

      LIMIT 100`;



    // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query

    const options = {

      query: query,

      // Location must match that of the dataset(s) referenced in the query.

      location: 'US',

    };



    // Run the query as a job

    const [job] = await bigquery.createQueryJob(options);

    console.log(`Job ${job.id} started.`);



    // Wait for the query to finish

    const [rows] = await job.getQueryResults();



    // Print the results

    console.log('Rows:');

    rows.forEach(row => console.log(row));

  }

  // [END bigquery_query]

  query();

}

main(...process.argv.slice(2));