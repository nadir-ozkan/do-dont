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

const getEntries = () => {
    throw new Error("Not implemented yet!");
    return null;
}

const getListItems = () => {
    throw new Error("Not implemented yet!");
    return null;
}

module.exports = {
    calculatePercentage,
    calculateChain
}
