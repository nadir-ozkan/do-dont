"use strict";

import React from 'react';
import axios from 'axios';

import utils from '../../Utils/utils.js';
import {fbRef, getData} from '../../firebase/index.js';

class LoginPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            errorMessage : null,
            showSpinner : false,
            registerMode : false
        };
    }

    componentDidMount(){
        if (this.userNameInput) {
            this.userNameInput.focus();
        }
        if (this.props.debugMode){
            if (this.props.onGetUser) {
                this.props.onGetUser({userName : "Nadir"});
            }
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (this.userNameInput) {
            this.userNameInput.focus();
        }
    }

    showErrorMessage(errorMessage) {
        this.setState({
            errorMessage : errorMessage,
            noClick : false,
            showSpinner : false
        });
    }

    userExist(userName) {
        return new Promise(function(resolve, reject) {
            const refStr = `users/${userName}`;
            getData(refStr)
                .then((result) => {
                    resolve(result!=null);
                });
        });
    }

    doRegister(userName, userPass){
        if (!userName || !userPass) {
            this.showErrorMessage("Kullanıcı adı ya da şifre eksik!");
            return;
        }

        this.userExist(userName)
            .then((exists) => {
                if (exists) {
                    this.showErrorMessage("Bu kullanıcı mevcut, lütfen başka bir kullanıcı adı seçiniz.");
                    return;
                } else {
                    const refStr = `users/${userName}`;
                    fbRef.child(refStr)
                        .set({password : userPass})
                        .then(()=> {
                            this.setState({
                                errorMessage : null,
                                showSpinner : false,
                                registerMode : false,
                                noClick : false
                            }, () => {
                                alert("Yeni kullanıcı başarıyla oluşturuldu. Listeleri oluşturmaya hemen başlayabilirsiniz!");
                                this.handleLoginClick();
                            });


                        });
                }
            });


    }

    handleLoginClick(){

        this.setState({
            errorMessage : null,
            showSpinner : true,
            noClick : true
        });

        const txtUserName = document.getElementById("txtUserName");
        const txtUserPass = document.getElementById("txtUserPass");

        const userName = txtUserName.value;
        const userPass = txtUserPass.value;

        if (this.state.registerMode){
            this.doRegister(userName, userPass);
            return;
        }

        const url = "https://us-central1-do-dont.cloudfunctions.net/checkUser"

        axios.get(url, { params : { userName, userPass} } )
            .then((resp)=>{
                const {isPasswordValid} = resp.data;
                if (isPasswordValid) {
                    if (this.props.onGetUser) {
                        this.props.onGetUser({userName});
                    }
                } else {
                    this.setState({
                        errorMessage : "Yanlış kullanıcı adı ya da şifre!",
                        noClick : false,
                        showSpinner : false
                    });
                }
            })
            .catch((hata)=>{
                console.log(hata);
                alert(hata);
                this.setState({
                    errorMessage : "Bir hata oluştu.",
                    noClick : false,
                    showSpinner : false
                });
            })
            .finally(() => {
                this.setState({
                    noClick : false,
                    showSpinner : false
                });
            });

    }

    handleRegisterClick(e){
        this.setState({
            registerMode : true,
            errorMessage : null,
            showSpinner : false,
        });
    }

    handleKeyUp(e){
        if (e.keyCode==13){
            this.handleLoginClick(e);
        }
    }

    renderSpinner(){
        return this.state.showSpinner ? <div><img src="spinner.svg" height="32px"/></div> : null;
    }

    renderRegisterLabel(){
        const {LabelStyle} = Styles;
        return !this.state.registerMode ?
            <div>
                <span style={LabelStyle} onClick={this.handleRegisterClick.bind(this)}>Yeni Hesap Oluştur</span>
            </div> : null;
    }

    render() {

        const {MainDivStyle, InputStyle, HeaderStyle, ErrorStyle, NoClick} = Styles;

        const mainDivStyle = this.state.noClick ? utils.mergeObjects(MainDivStyle, NoClick) : MainDivStyle;

        const loginButtonLabel = this.state.registerMode ? "Kaydol" : "Giriş Yap";

        return (
            <div style={mainDivStyle}>
                <div style={HeaderStyle}>Do Don't</div>
                <div>
                    <input style={InputStyle} type="text"
                        ref={ (input) => { this.userNameInput = input; }}
                        placeholder="Kullanıcı adı" id="txtUserName"
                        onKeyUp = {this.handleKeyUp.bind(this)}
                    ></input>
                </div>
                <div>
                    <input style={InputStyle} type="password"
                        placeholder="Şifre" id="txtUserPass"
                        onKeyUp = {this.handleKeyUp.bind(this)}
                    ></input>
                </div>
                <div>
                    <button style={InputStyle} onClick={this.handleLoginClick.bind(this)}>{loginButtonLabel}</button>
                </div>
                {this.renderRegisterLabel()}
                <div style={ErrorStyle}>
                    <div>{this.state.errorMessage}</div>
                    {this.renderSpinner()}
                </div>
            </div>
        );
    }
}

const Styles = {
    MainDivStyle : {
        textAlign : "center",
        background : "gold",
        width : "50%",
        margin : "0 auto",
        paddingTop : "10px",
        paddingBottom : "10px",
    },
    InputStyle : {
        margin : "5px auto",
        width : "85%",
    },
    HeaderStyle : {
        height : "2em",
        background : "crimson",
        lineHeight : "2em",
        width : "85%",
        margin: "0 auto",
        fontWeight : "700"
    },
    ErrorStyle : {
        color : "crimson",
        lineHeight : "1.2em",
        width : "85%",
        margin: "0 auto",
    },
    NoClick : {
      pointerEvents: "none",
      opacity: "0.65"
    },
    LabelStyle : {
        color : "grey",
        cursor : "pointer",
        marginTop : "10px",
        marginBottom : "10px",
        display : "inline-block"
    }
}


export default LoginPage;
