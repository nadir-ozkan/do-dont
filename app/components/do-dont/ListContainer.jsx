import React from 'react';
import firebase, {fbRef, githubProvider} from '../../firebase/index.js';
import utils from '../../Utils/utils.js';

import List from "./List.jsx";
import axios from 'axios';

class ListContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items : [],
            dateStr : props.dateStr ? props.dateStr : utils.getDateObj().dateStrP,
            isNewEntry : false
        }

        this.currentIndex = 0;
        this.entries = undefined;
        this.user = props.user;
    }

    componentWillMount() {
        //this.insertNewListItems();
    }

    componentDidMount(){

        const refStr = `users/${this.user.userName}/list1`;

        this.getData(refStr)
            .then((result) => {
                if (result) {

                    console.log(result);

                    this.doItems = result.items.doItems;

                    if (result.items.entries) {

                        let entriesArray = utils.objToArray(result.items.entries);
                        entriesArray.sort(function(a,b) {
                            return b.saveDate - a.saveDate;
                        });

                        this.entries = entriesArray;
                        console.log(this.entries);
                    }

                }

                const dateObj = utils.getDateObj();

                if (this.entries) {
                    if (this.entries[0].saveDateStr !== dateObj.dateStrP) {
                        if (this.doItems) {
                            const doItemsArr = Object.keys(this.doItems).map((key) => {
                                return {
                                    fbKey : key,
                                    text : this.doItems[key],
                                    checked : false
                                }
                            });
                            this.setState({items : doItemsArr, isNewEntry : true});
                        }
                    } else {
                        this.setState({items : this.entries[0].does});
                    }
                }
                else // henüz hiç entry girilmemişse
                {
                    if (this.doItems) {
                        const doItemsArr = Object.keys(this.doItems).map((key) => {
                            return {
                                fbKey : key,
                                text : this.doItems[key],
                                checked : false
                            }
                        });
                        this.setState({items : doItemsArr, isNewEntry : true});
                    }
                }

            });

            this.askPermissionForMessaging();

    }

    saveFCMToken(token) {
        const refStr = `users/${this.user.userName}/fcmToken`;

        fbRef.child(refStr)
            .set(token)
            .then(()=> {
                console.log("FCM anahtarı kaydedildi.");
            });
    }

    getFCMToken(){
      return new Promise(function(resolve, reject) {
        const refStr = `users/${this.user.userName}/fcmToken`;
        this.getData(refStr)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
      }.bind(this));
    }

    askPermissionForMessaging(){

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
                return this.getFCMToken();
            })
            .then((currentToken) => {
              if (fcmToken != currentToken) {
                this.saveFCMToken(fcmToken);
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
                    this.saveFCMToken(refreshedToken);
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

    sendNotification(to, title, body) {
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

    getData(refStr) {
        return new Promise(function(resolve, reject) {
            fbRef.child(refStr).once("value")
                .then((ss) => {
                    ss.exists() ? resolve(ss.val()) : resolve(null);
                })
                .catch((hata) => {
                    console.log("Hata " + hata.toString());
                    reject(hata);
                    throw hata;
                });
          });
    }

    insertNewListItems(){
        const newItems = [
            "Kahvaltı",
            "Immune Şurup",
            "Diş Fırçalama",
            "Ara Öğün",
            "Açık Hava",
            "El Beceri Oyunu",
            "Öğlen Yemeği",
            "Çinko",
            "Öğlen Uykusu",
            "Açık Hava",
            "Beş Kitap Okuma",
            "Meyve Ara Öğün",
            "Bireysel Görevler"
        ];
        newItems.forEach((item) => {
            const doItemsRef = "users/Yasemin/list1/items/doItems";
            fbRef.child(doItemsRef)
                .push(item);
        });
    }

    setItemsAndDate() {
        const newItems = this.entries[this.currentIndex];

        if (newItems && newItems.does){
            this.setState({
                items : newItems.does,
                dateStr: newItems.saveDateStr
            });
        }
    }

    handleNextClick(e) {
        if (!this.entries) return;
        if (this.currentIndex==0) return;
        this.currentIndex--;
        this.setItemsAndDate();
    }

    handlePrevClick(e) {
        if (!this.entries) return;
        if (this.currentIndex == this.entries.length-1) return;
        this.currentIndex++;
        this.setItemsAndDate();
    }

    onSaveList(entry, isNewEntry) {
        if (isNewEntry) {
          this.entries.unshift(entry);
          this.setState({isNewEntry : false});
        } else {
          this.entries[0] = entry;
        }

        console.log(this.entries);
    }

    render(){
        const {DateStyle, ButtonsDivStyle} = Styles;

        return (
            <div>
                <div style={DateStyle}>{this.state.dateStr}</div>
                <List
                    items={this.state.items}
                    isNewEntry={this.state.isNewEntry}
                    onSaveList = {this.onSaveList.bind(this)}
                    dateStr = {this.state.dateStr}
                    user = {this.props.user}
                ></List>
                <div style={ButtonsDivStyle}>
                    <button id="prevButton" onClick={this.handlePrevClick.bind(this)}>Prev</button>
                    {/* <button id="todayButton">Today</button> */}
                    <button id="nextButton" onClick={this.handleNextClick.bind(this)}>Next</button>
                </div>
            </div>
        )

    }
}

const Styles = {
    DateStyle : {
        margin : "5px auto",
        textAlign : "center",
        background : "cornflowerblue",
        padding : "5px",
    },
    ButtonsDivStyle : {
        display : "flex",
        justifyContent :"space-between"
    }
}

export default ListContainer;
