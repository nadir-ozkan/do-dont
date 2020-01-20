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

        this.resizeHandler = this.reRender.bind(this);
    }

    reRender(){
        this.setState({reRender : true});
    }

    componentDidMount(){
        if (this.userNameInput) {
            this.userNameInput.focus();
        }
        if (this.props.debugMode){
            if (this.props.onGetUser) {
                this.props.onGetUser({userName : "KayzerSoze"});
            }
        }
        // window.addEventListener("resize", this.resizeHandler);
    }

    componentWillUnmount(){
        // window.removeEventListener("resize", this.resizeHandler);
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
        return this.state.showSpinner ? <div><img src="spinner.svg" height={utils.hUnit(2.5)}/></div> : null;
    }

    renderRegisterLabel(){
        const {LabelStyle} = Styles;
        return !this.state.registerMode ?
            <div>
                <span style={LabelStyle} onClick={this.handleRegisterClick.bind(this)}>Yeni Hesap Oluştur</span>
            </div> : null;
    }

    render() {

        const {MainDivStyle, InputStyle, LogoStyle, ErrorStyle, NoClick} = Styles;

        const mainDivStyle = this.state.noClick ? utils.mergeObjects(MainDivStyle, NoClick) : MainDivStyle;

        const loginButtonLabel = this.state.registerMode ? "Kaydol" : "Giriş Yap";

        return (
            <div style={mainDivStyle}>

                <div id="logo-div" style={{flex: 1, display : "flex", flexDirection : "column", justifyContent : "center"}}>
                    <span style={LogoStyle}>Do-Dont</span>
                </div>

                <div id="input-fields-div" style = {{flex:1, display: "flex", flexDirection : "column", justifyContent : "center"}}>

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

                </div>

                <div id="actions-div" style= {{flex: 1, display : "flex", flexDirection : "column", justifyContent : "center"}}>

                    <div>
                        <button style={InputStyle} onClick={this.handleLoginClick.bind(this)}>{loginButtonLabel}</button>
                    </div>
                    {this.renderRegisterLabel()}
                    <div style={ErrorStyle}>
                        <div>{this.state.errorMessage}</div>
                        {this.renderSpinner()}
                    </div>

                </div>

            </div>
        );
    }

}

const Styles = {
    MainDivStyle : {
        textAlign : "center",
        background : "#314247",
        width : "100%",
        margin : "0 auto",
        paddingTop : "10px",
        paddingBottom : "10px",
        display : "flex",
        flexDirection : "column",
        height : utils.hUnit(60)
    },
    InputStyle : {
        margin : "5px auto",
        width : "85%",
        fontSize : utils.hUnit(4)
    },
    LogoStyle : {
        margin: "0 auto",
        fontSize : utils.hUnit(5),
        color : "#f7f7f7"
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
    LabelStyle : {
        color : "#f7f7f7",
        cursor : "pointer",
        marginTop : "10px",
        marginBottom : "10px",
        display : "inline-block",
        fontSize : utils.hUnit(2.5)
    }
}

export default LoginPage;
