import * as admin from "firebase-admin";
const serviceAccount = require("./smart-invest-ae6be-firebase-adminsdk-shpeb-5467540640.json");

// Initialize Firebase Admin with credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export { admin };
