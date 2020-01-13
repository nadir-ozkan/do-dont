import axios from 'axios';

let apiConfig = {};

const getConfigFromApi = () => {
    console.log("Api config alınıyor...");
    const url = "https://do-dont.herokuapp.com/getConfig?pass=guzel_gozlum";
    axios.get(url)
        .then((resp)=>{
            console.log(resp.data);
            apiConfig = resp.data;
        })
        .catch((hata)=>{
            console.log(hata);
            alert(hata);
        })
        .finally(() => {

        });
}

const _config = {
    debugMode : false,
    userName : "Nadir",
    userId : 1,
    message : "Hellööö local people",
    firebaseCongif : {
        apiKey: "AIzaSyDRL0tGplOcdGP4dCCrA3sXCOusGbkNmgM",
        authDomain: "do-dont.firebaseapp.com",
        databaseURL: "https://do-dont.firebaseio.com",
        projectId: "do-dont",
        storageBucket: "do-dont.appspot.com",
        messagingSenderId: "1088307007360",
        appId: "1:1088307007360:web:d4d9ebc195ba62e0"
    },
    notificationConfig : {
        key : 'AAAA_WQnD4A:APA91bHuvhz5QCzh1-MqmAZuwEhw1DC5HaJf6fQP4DfCFU_W8JmH5jm1qsZPAvTR4zrXDnCAh4b64jsBCzIrMcmK1sDVtLKVWWvVa4dmdXHd2dIUAT24Q7-Rrrl5ZAs9xLmgoGcygFfi',
        url : "https://fcm.googleapis.com/fcm/send",
        default_to : 'eeaTXCMqppc:APA91bEIGQadyesYGsKWktFUdl_fB2-X5Ib6cb-nU0aZwnkYu0buhKedzjVuT8o-7PoqQC6aaeVPTUw86EgqgserNQL1qq19jISXByHwdJRkSmwEfosKY1P5QL2VSPncHvXLZtla9eI1'
    }
}

const getConfig = () => {
    if (process.env.NODE_ENV && process.env.NODE_ENV == "production") {
        return _config; // TODO: Daha sonra bu config bilgilerini heroku env. değişkenlerinden al...
    } else {
        return _config;
    }
}

module.exports = {
    config : getConfig()
}
