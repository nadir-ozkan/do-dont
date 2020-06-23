import axios from 'axios';

const api = axios.create({
    baseURL : process.env.NODE_ENV === 'production' ? "https://do-dont.herokuapp.com" : "http://localhost:5000"
});

const calculatePercentage = (userName, itemId, itemType, dateStr) => {
    // Nadir: get için parametre gönderirken alttaki yazım biçimini kullan.
    // return api.get("/totalPercentage", { params : { userName, itemId, itemType, dateStr} } );
    return api.post("/totalPercentage", { userName, itemId, itemType, dateStr } );
}

const calculateChain = (userName, itemId, itemType, dateStr) => {
    return api.post("/chain", { userName, itemId, itemType, dateStr } );
}

const getEntries = (userName) => {
    return new Promise(function(resolve, reject) {
        return api.post("/getEntries", { userName } )
            .then((result) => resolve(result.data));
    });
}

const saveNewEntry = (userName, doEntries, dontEntries, dateObj) => {
    return new Promise(function(resolve, reject) {
        return api.post("/saveNewEntry", {
                userName,
                doEntries : JSON.stringify(doEntries),
                dontEntries : JSON.stringify(dontEntries),
                dateObj : JSON.stringify(dateObj)
        } ).then((result) => resolve(result.data));
    });
}

const userExists = (userName) => {
    return new Promise(function(resolve, reject) {
        return api.post("/userExists", { userName } )
            .then((result) => resolve(result.data));
    });
}

const createUser = (userName, userPass) => {
    return new Promise(function(resolve, reject) {
        return api.post("/createUser", { userName, userPass } )
            .then((result) => resolve(result.data));
    });
}

const isPasswordValid = (userName, userPass) => {
    return new Promise(function(resolve, reject) {
        return api.post("/isPasswordValid", { userName, userPass } )
            .then((result) => resolve(result.data));
    });
}

const getListItems = (userName, itemType) => {
    return new Promise(function(resolve, reject) {
        return api.post("/getListItems", { userName, itemType } )
            .then((result) => resolve(result.data));
    });
}

const saveListItem = (userName, itemType, itemText) => {
    return new Promise(function(resolve, reject) {
        return api.post("/saveListItem", { userName, itemType, itemText } )
            .then((result) => resolve(result.data));
    });
}

const deleteListItem = (userName, itemType, fbKey) => {
    return new Promise(function(resolve, reject) {
        return api.post("/deleteListItem", { userName, itemType, fbKey } )
            .then((result) => resolve(result.data));
    });
}

const updateEntries = (userName, items, percentage, itemType, dateObj) => {
    return new Promise(function(resolve, reject) {
        return api.post("/updateEntries", {
                userName,
                items : JSON.stringify(items),
                percentage,
                itemType,
                dateObj : JSON.stringify(dateObj)
        } ).then((result) => resolve(result.data));
    });
}

const getFCMToken = (userName) => {
    return new Promise(function(resolve, reject) {
        return api.post("/getFCMToken", { userName } )
            .then((result) => resolve(result.data));
    });
}

const saveFCMToken = (userName, fcmToken) => {
    return new Promise(function(resolve, reject) {
        return api.post("/saveFCMToken", { userName, fcmToken } )
            .then((result) => resolve(result.data));
    });
}

const sendNotification = (to, title, body) => {
    return new Promise(function(resolve, reject) {
        return api.post("/sendNotification", { to, title, body } )
            .then((result) => resolve(result.data));
    });
}

module.exports = {
    calculatePercentage,
    calculateChain,
    getEntries,
    saveNewEntry,
    userExists,
    createUser,
    isPasswordValid,
    getListItems,
    saveListItem,
    deleteListItem,
    updateEntries,
    saveFCMToken,
    getFCMToken,
    sendNotification
}
