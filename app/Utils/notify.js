"use strict";

import api from '../api/doDontApi';

const askPermissionForMessaging = function(userName){

    // FCM hizmetinin çalışabilmesi için kök dizinde firebase-messaging-sw.js adlı dosyanın bulunması gerekiyor.
    // Bu dosya kök dizinde bulunmaz ise token üretilmeye çalışıldığında hata alınıyor.

    let fcmToken = null;

    const messaging = firebase.messaging();
    messaging.requestPermission()
        .then(()=> {
            // Kullanıcı bir kere izin verdiğinde, kod her seferinde buraya düşecek...
            console.log("Push notification iznimiz mevcut...");
            return messaging.getToken();
        })
        .then((token) => {
            // Bu anahtar oluşturulduktan sonra arkada bir veri tabanına kaydedilmesinde fayda var.
            // Çünkü bildirimler bu anahtar kullanılarak yönlendirilecek.
            console.log("Token aquired.", token);
            fcmToken = token;
            return api.getFCMToken(userName);
        })
        .then((currentToken) => {
            if (fcmToken != currentToken) {
                api.saveFCMToken(userName, fcmToken);
            } else {
                console.log("No need to save FCM token!");

            messaging.onMessage((payload) => {
              console.log('Message received. ', payload);
              alert("Bildirim geldi \n\n" + JSON.stringify(payload));
            });

            messaging.onTokenRefresh(() => {
              messaging.getToken().then((refreshedToken) => {
                console.log('Token refreshed.');
                // Indicate that the new Instance ID token has not yet been sent to the
                // app server.
                api.saveFCMToken(userName, refreshedToken);
                // ...
              }).catch((err) => {
                console.log('Unable to retrieve refreshed token ', err);
                alert("Unable to retrieve refreshed token" + " " + err);
              });
            });

          }
        })
        .catch((err) => { // Push notificationa izin verilmez ise buradaki kod çalışacak.
            alert(err);
        })
        .finally(() =>{
        });
}

module.exports = {
  askPermissionForMessaging
}
