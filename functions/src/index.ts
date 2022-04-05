import * as functions from 'firebase-functions';
import * as http from 'axios';
import * as admin from 'firebase-admin';
admin.initializeApp();
import DbService from './services/db'
// import fetch from 'node-fetch';

// import * as  Airtable from 'airtable';
// todo: move api to env var
// const base = new Airtable({apiKey: 'keyyfLNYd8lXJt8bn'}).base('appbUvvVdVHBT2L6i');


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   // base('Dashboard data')
//   response.send("Hello from Firebase!");
// });

// export const updateUsers = functions.pubsub.schedule(`every 2 minutes`).onRun((context)  => {});

export const updateProjectPrice = functions.pubsub.schedule(`every 24 hours`).onRun(async (context)  => {
  try {
    const _db = new DbService()
    const res = await http.default.get('https://api.currencyapi.com/v3/latest?apikey=GXFU3p5Woi91jH2ZeethFCiBW5jwQR2E728tF0Me&base_currency=SLL')
    const exchangeRate = res.data.data['GBP'].value;
    const unitCost = 910162;
    const write = await _db.updateDoc('projects', 'solar_panel_kits_ignite_power_sl', {costToUser: Math.ceil(exchangeRate * unitCost)})
    console.log(write)
  } catch (error) {
    console.error(error)
  }
});