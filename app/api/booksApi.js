import axios from 'axios';

const api = axios.create({
    baseURL : process.env.NODE_ENV === 'production' ? "https://do-dont.herokuapp.com" : "http://localhost:5000"
});

const getBooks = () => {
    throw new Error("Not implemented yet!");
    return null;
}

module.exports = {
    calculatePercentage,
    calculateChain
}
