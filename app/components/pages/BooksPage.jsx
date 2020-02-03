"use strict";

import React from 'react';
import axios from 'axios';

import utils from '../../Utils/utils.js';

import BookList from '../books/BookList.js';
import NewBook from '../books/NewBook.js';
import Modal from '../common/Modal.js';

import api from '../../api/booksApi';

class BooksPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showModal : false,
            books : []
        };
        this.userName = props.route.user.userName;
        this.OnLogOut = props.route.OnLogOut;
    }

    componentDidMount(){
        api.getBooks(this.userName)
            .then((books) => {
                if (books) {
                    this.setState({books : utils.objToArray(books)});
                }
            });
    }

    onSaveBook(book) {
        api.saveBook(this.userName, book)
            .then((book) => {
                this.state.books.push(book);
                this.showModal(false);
            });

    }

    showModal(state) {
        this.setState({showModal : state});
    }

    onDelete(id){
        api.deleteBook(this.userName, id)
            .then((id) => {
                this.setState({books : this.state.books.filter((book) => book.id!=id)});
            });
    }

    render() {
        const {WelcomeSpanStyle, MainDivStyle} = Styles;
        return (
            <div>
                <div style = {MainDivStyle}>

                    <div style = {{display : "flex", fontSize : utils.hUnit(3)}}>
                        <span style ={WelcomeSpanStyle}>Hoşgeldiniz, {this.userName}</span>
                        <button onClick={this.OnLogOut}>Çıkış Yap</button>
                    </div>

                    <BookList
                        books = {this.state.books}
                        onAddNew = {this.showModal.bind(this, true)}
                        onDelete = {this.onDelete.bind(this)}
                    />

                </div>
                <div id="modalDiv">
                    <Modal isVisible={this.state.showModal}>
                        <NewBook
                            onClose={this.showModal.bind(this, false)}
                            onSave ={this.onSaveBook.bind(this)}
                        />
                    </Modal>
                </div>
            </div>
        );
    }

}

const Styles = {
    MainDivStyle : {
        background : "#314247",
        width : "100%",
        margin : "0 auto",
        padding : utils.hUnit(1)
    },

    NoClick : {
      pointerEvents: "none",
      opacity: "0.65"
    },
    WelcomeSpanStyle : {
        flex:1,
        color : "grey"
    },
}

export default BooksPage;
