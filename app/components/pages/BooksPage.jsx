"use strict";

import React from 'react';
import axios from 'axios';

import utils from '../../Utils/utils.js';
import {fbRef, getData} from '../../firebase/index.js';

import BookList from '../books/BookList.js';

class BooksPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        };
        this.user = props.route.user;
        this.OnLogOut = props.route.OnLogOut;
    }

    componentDidMount(){
    }

    componentDidUpdate(prevProps, prevState){
    }

    handleKeyUp(e){
        if (e.keyCode==13){

        }
    }

    renderSpinner(){
        return this.state.showSpinner ? <div><img src="spinner.svg" height={utils.hUnit(2.5)}/></div> : null;
    }

    render() {
        const {WelcomeSpanStyle, MainDivStyle} = Styles;
        return (
            <div style = {MainDivStyle}>
                <div style = {{display : "flex", fontSize : utils.hUnit(3)}}>
                    <span style ={WelcomeSpanStyle}>Hoşgeldiniz, {this.user.userName}</span>
                    <button onClick={this.OnLogOut}>Çıkış Yap</button>
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
        paddingTop : "10px",
        paddingBottom : "10px"
    },
    ErrorStyle : {
        color : "crimson",
        width : "85%",
        margin: "0 auto",
        fontSize : utils.hUnit(2.5)
    },
    NoClick : {
      pointerEvents: "none",
      opacity: "0.65"
    },
    WelcomeSpanStyle : {
        flex:1,
        marginLeft : utils.hUnit(1),
        color : "grey"
    }
}

export default BooksPage;
