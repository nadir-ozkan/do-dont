import axios from 'axios';

const api = axios.create({
    baseURL : process.env.NODE_ENV === 'production' ? "https://do-dont.herokuapp.com" : "http://localhost:5000"
});

const getBooks = (userName) => {
    return new Promise(function(resolve, reject) {
        api.get("/getBooks", { params : { userName } } )
            .then(result => resolve(result.data));
    });
}

const deleteBook = (userName, id) => {
    return new Promise(function(resolve, reject) {
        api.get("/deleteBook", {params : { userName, id} })
            .then(result => resolve(result.data));
    });

}

const saveBook = (userName, book) => {
    return new Promise(function(resolve, reject) {
        api.get("/saveBook", {params : { userName, book} })
            .then(result => resolve(result.data));
    });
}

module.exports = {
    getBooks,
    deleteBook,
    saveBook
}
