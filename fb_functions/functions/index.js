const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.getOwnerName = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;

    const snapshot = await admin.database().ref('/ownerName').once("value");
    const ownerName = snapshot.val();
    res.send(ownerName);
  });

exports.checkUser = functions.https.onRequest(async (req, res) => {
    const {userName, password} = req.query;
    const refStr = `users/${userName}/password/`;

    const snapshot = await admin.database().ref(refStr).once("value");
    const passwordInDb = snapshot.val();

    res.send(passwordInDb == password);
  });