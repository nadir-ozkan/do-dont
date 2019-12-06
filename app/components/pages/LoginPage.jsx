"use strict";

import React from 'react';
import axios from 'axios';

class LoginPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            errorMessage : null
        };
    }

    componentDidMount(){
        if (this.props.debugMode){
            if (this.props.onGetUser) {
                this.props.onGetUser({userName : "Nadir"});
            }
        }
    }

    handleLoginClick(e){
        e.preventDefault();

        const txtUserName = document.getElementById("txtUserName");
        const txtUserPass = document.getElementById("txtUserPass");

        const userName = txtUserName.value;
        const userPass = txtUserPass.value;

        const url = "https://us-central1-do-dont.cloudfunctions.net/checkUser"

        axios.get(url, { params : { userName, userPass} } )
            .then((resp)=>{
                console.log(resp);
                const {isPasswordValid} = resp.data;
                if (isPasswordValid) {
                    if (this.props.onGetUser) {
                        this.props.onGetUser({userName});
                    }
                } else {
                    this.setState({errorMessage : "Yanlış kullanıcı adı ya da şifre!"});
                }
            })
            .catch((hata)=>{
                console.log(hata);
                alert(hata);
                this.setState({errorMessage : "Bir hata oluştu."})
            })
            .finally(() => {

            });

    }

    handleRegisterClick(e){
        e.preventDefault();
    }

    handleKeyUp(e){
        if (e.keyCode==13){
            this.handleLoginClick(e);
        }
    }

    render() {

        const {MainDivStyle, InputStyle} = Styles;

        return (
            <div style={MainDivStyle}>
                <h5>Do Don't Programına Hoş Geldiniz</h5>
                <div>
                    <input style={InputStyle} type="text"
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
                    <button style={InputStyle} onClick={this.handleLoginClick.bind(this)}>Giriş Yap</button>
                </div>
                <div>
                    <button style={InputStyle} onClick={this.handleRegisterClick.bind(this)}>Hesap Oluştur</button>
                </div>
                <div>
                    {this.state.errorMessage}
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
        paddingTop : "10px"
    },
    InputStyle : {
        margin : "5px auto",
        width : "85%",

    }
}


export default LoginPage;
