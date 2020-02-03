import axios from 'axios';

const api = axios.create({
    baseURL : process.env.NODE_ENV === 'production' ? "https://do-dont.herokuapp.com" : "http://localhost:5000"
});

const calculatePercentage = (userName, itemId, itemType, dateStr) => {
    return api.get("/totalPercentage", { params : { userName, itemId, itemType, dateStr} } );
}

const calculateChain = (userName, itemId, itemType, dateStr) => {
    return api.get("/chain", { params : { userName, itemId, itemType, dateStr} } );
}

const getEntries = (userName) => {
    return new Promise(function(resolve, reject) {
        return api.get("/getEntries", { params : { userName} } )
            .then((result) => resolve(result.data));
    });
}

const saveNewEntry = (userName, doEntries, dontEntries, dateObj) => {
    return new Promise(function(resolve, reject) {
        return api.get("/saveNewEntry", { params : {
                userName,
                doEntries : JSON.stringify(doEntries),
                dontEntries : JSON.stringify(dontEntries),
                dateObj : JSON.stringify(dateObj)
            }
        } ).then((result) => resolve(result.data));
    });
}

const getListItems = () => {
    throw new Error("Not implemented yet!");
    return null;
}



module.exports = {
    calculatePercentage,
    calculateChain,
    getEntries,
    saveNewEntry
}
