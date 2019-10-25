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

    res.setHeader('Access-Control-Allow-Origin', '*');

    const {userName, userPass} = req.query;
    const refStr = `users/${userName}/password/`;

    const snapshot = await admin.database().ref(refStr).once("value");
    const passwordInDb = snapshot.val();

    const respObj = {
        userName,
        isPasswordValid : (passwordInDb == userPass)
    }

    res.send(respObj);

});

exports.sendNotification = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const {userName,} = req.query;

    // Bu kullanıcı bildirim alıcılarını veri tabanından al.
    // Sonra her bir alıcıya bildirim gönder.

    // const snapshot = await admin.database().ref('/ownerName').once("value");
    // const ownerName = snapshot.val();

    const key = 'AAAA_WQnD4A:APA91bHuvhz5QCzh1-MqmAZuwEhw1DC5HaJf6fQP4DfCFU_W8JmH5jm1qsZPAvTR4zrXDnCAh4b64jsBCzIrMcmK1sDVtLKVWWvVa4dmdXHd2dIUAT24Q7-Rrrl5ZAs9xLmgoGcygFfi';
    const to = 'eeaTXCMqppc:APA91bEIGQadyesYGsKWktFUdl_fB2-X5Ib6cb-nU0aZwnkYu0buhKedzjVuT8o-7PoqQC6aaeVPTUw86EgqgserNQL1qq19jISXByHwdJRkSmwEfosKY1P5QL2VSPncHvXLZtla9eI1';

    const notification = {
      'title': 'Portugal vs. Denmark',
      'body': '5 to 1',
      // 'icon': 'firebase-logo.png',
      'click_action': 'http://localhost:8080'
    };

    const url = "https://fcm.googleapis.com/fcm/send";
    const config = {
      headers : {
        'Authorization': 'key=' + key,
        'Content-Type': 'application/json'
      }
    };

    const data = {
      'notification' : notification,
      'to' : to
    }

    axios.post(url, JSON.stringify(data), config)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });

  });
