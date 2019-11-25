"use strict";

import axios from 'axios';

import firebase, {fbRef, getData} from '../firebase/index.js';

const saveFCMToken = function(userName, token) {
    const refStr = `users/${userName}/fcmToken`;

    fbRef.child(refStr)
        .set(token)
        .then(()=> {
            console.log("FCM anahtarı kaydedildi.");
        });
}

const getFCMToken = function (userName) {
  return new Promise(function(resolve, reject) {
    const refStr = `users/${userName}/fcmToken`;
    getData(refStr)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      })
  }.bind(this));
}

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
            return getFCMToken(userName);
        })
        .then((currentToken) => {
            if (fcmToken != currentToken) {
                saveFCMToken(userName, fcmToken);
            } else {
                console.log("No need to save FCM token!");

            // this.sendNotification();

            messaging.onMessage((payload) => {
              console.log('Message received. ', payload);
              alert("Bildirim geldi \n\n" + JSON.stringify(payload));
            });

            messaging.onTokenRefresh(() => {
              messaging.getToken().then((refreshedToken) => {
                console.log('Token refreshed.');
                // Indicate that the new Instance ID token has not yet been sent to the
                // app server.
                saveFCMToken(userName, refreshedToken);
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

const sendNotification = function(to, title, body) {
    return new Promise(function(resolve, reject) {

      const url = 'https://fcm.googleapis.com/fcm/send';

      axios.get(url, { params : { to, title, body} } )
          .then((resp)=>{
              console.log(resp);
              resolve("Notification sent successfuly!");
          })
          .catch((hata)=>{
              console.log(hata);
              reject(hata);
          })
          .finally(() => {

          });

      });
}

module.exports = {
  askPermissionForMessaging
}
