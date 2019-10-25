"use strict";

importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

const config = {
    apiKey: "AIzaSyDRL0tGplOcdGP4dCCrA3sXCOusGbkNmgM",
    authDomain: "do-dont.firebaseapp.com",
    databaseURL: "https://do-dont.firebaseio.com",
    projectId: "do-dont",
    storageBucket: "do-dont.appspot.com",
    messagingSenderId: "1088307007360",
    appId: "1:1088307007360:web:d4d9ebc195ba62e0"
  };

  firebase.initializeApp(config);

  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      // icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
      notificationOptions);
});
