import * as firebaseAdmin from 'firebase-admin';

const credentialAuth = require("./firebase-private-key.json");

try {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(credentialAuth),
        databaseURL: "https://final-project-b1692-default-rtdb.asia-southeast1.firebasedatabase.app"
    });
} catch (err: any) {
    console.error(err)
}

const fireStoreAdmin = firebaseAdmin.firestore();

export { fireStoreAdmin }
