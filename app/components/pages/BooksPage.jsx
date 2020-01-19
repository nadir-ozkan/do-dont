"use strict";

import React from 'react';
import axios from 'axios';

import utils from '../../Utils/utils.js';
import {fbRef, getData} from '../../firebase/index.js';

import BookList from '../books/BookList.js';

class AddNewBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            YazarAdi : "",
            KitapAdi : "",
            ISBN : ""
        }
    }

    onTextChange(name, e) {
        this.state[name] = e.target.value;
        this.forceUpdate();
    }

    onSave() {
        if (this.props.onSave){
            this.props.onSave({
                bookName : this.state.KitapAdi,
                authorName : this.state.YazarAdi,
                isbn : this.state.ISBN
            });
        }
    }

    onClose(){
        if (this.props.onClose){
            this.props.onClose();
        }
    }

    render(){
        const {SpanStyle, TextInputStyle, RowStyle, HeaderStyle} = Styles;
        return(
            <div
                style={{zIndex : 4, width : "50%", background : "grey", padding : "20px"}}
                onClick = {(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
            >
                <div style={HeaderStyle}>
                    <button onClick={this.onClose.bind(this)}>X</button>
                </div>
                <div style={RowStyle}>
                    <span style={SpanStyle} >Yazar Adı : </span>
                    <input
                        type="text"
                        style={TextInputStyle}
                        onChange={this.onTextChange.bind(this, "YazarAdi")}
                        value ={this.state.YazarAdi}
                    />
                </div>
                <div style={RowStyle}>
                    <span style={SpanStyle}>Kitap Adı : </span>
                    <input
                        type="text"
                        style={TextInputStyle}
                        onChange={this.onTextChange.bind(this, "KitapAdi")}
                        value ={this.state.KitapAdi}
                    />
                </div>
                <div style={RowStyle}>
                    <span style={SpanStyle}>ISBN : </span>
                    <input
                        type="text"
                        style={TextInputStyle}
                        onChange={this.onTextChange.bind(this, "ISBN")}
                        value ={this.state.ISBN}
                    />
                </div>
                <div style={HeaderStyle}>
                    <button onClick = {this.onSave.bind(this)}>Kaydet</button>
                </div>
            </div>
        )
    }
}

class BooksPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showModal : false,
            books : []
        };
        this.user = props.route.user;
        this.OnLogOut = props.route.OnLogOut;
    }

    componentDidMount(){
        const {userName} = this.user;
        const refStr = `users/${userName}/books/`;
        getData(refStr)
            .then((books) => {
                if (books) {
                    console.log(books);
                    this.setState({books : utils.objToArray(books)});
                }
            });
    }

    onSaveBook(book) {

        const {userName} = this.user;
        const refStr = `users/${userName}/books`;

        const newBookRef = fbRef.child(refStr).push();
        book.id = newBookRef.getKey();

        const that = this;

        newBookRef.set(book)
            .then(() => {
                that.state.books.push(book);
                that.showModal(false);
            });
    }

    renderModal() {
        const {OverlayStyle} = Styles;
        if (this.state.showModal){
            return (
                <div style = {OverlayStyle} onClick={this.showModal.bind(this, false)}>
                    <AddNewBook
                        onClose={this.showModal.bind(this, false)}
                        onSave ={this.onSaveBook.bind(this)}
                    />
                </div>
            );
        } else {
            return null;
        }
    }

    showModal(state) {
        this.setState({showModal : state});
    }

    onDelete(id){
        const that = this;
        const {userName} = this.user;
        const refStr = `users/${userName}/books/${id}`;
        fbRef.child(refStr)
            .set(null)  // İlgili refi sil...
            .then(() => {
                that.setState({books : this.state.books.filter((book) => book.id!=id)});
            });
    }

    render() {
        const {WelcomeSpanStyle, MainDivStyle} = Styles;
        return (
            <div>
                <div style = {MainDivStyle}>

                    <div style = {{display : "flex", fontSize : utils.hUnit(3)}}>
                        <span style ={WelcomeSpanStyle}>Hoşgeldiniz, {this.user.userName}</span>
                        <button onClick={this.OnLogOut}>Çıkış Yap</button>
                    </div>

                    <BookList
                        books = {this.state.books}
                        onAddNew = {this.showModal.bind(this, true)}
                        onDelete = {this.onDelete.bind(this)}
                    />

                </div>
                <div id="modalDiv">
                    {this.renderModal()}
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
    OverlayStyle : {
        // background : "green",
        // opacity: "0.65",
        position: "fixed", /* Sit on top of the page content */
        width:"100%", /* Full width (cover the whole page) */
        height:"100%", /* Full height (cover the whole page) */
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,128,0,0.65)", /* Black background with opacity */
        zIndex: 1,
        display : "flex",
        alignItems  : "center",
        justifyContent : "center"
    },
    SpanStyle : {
        display : "inline-block",
        flex: 1,
        textAlign : "right",
        marginRight : "5px"
    },
    TextInputStyle : {
        flex : 4,
    },
    RowStyle : {
        display : "flex",
        marginBottom : "10px"
    },
    HeaderStyle : {
        display : "flex",
        marginBottom : "20px",
        justifyContent : "flex-end",
        paddinRight : "10px"
    }
}

export default BooksPage;
