"use strict";

import React from 'react';
import utils from '../../Utils/utils.js';

class NewBook extends React.Component {
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

        const bookName = this.state.KitapAdi;
        const authorName = this.state.YazarAdi;
        const isbn = this.state.ISBN.toString();

        if (bookName.trim() == "" || authorName.trim() == "" || isbn.trim() == ""){
            alert("Lütfen eksik alanları doldurup, tekrar deneyiniz.");
            return;
        }
        
        if (this.props.onSave){
            this.props.onSave({ bookName, authorName, isbn });
        }
    }

    onClose(){
        if (this.props.onClose){
            this.props.onClose();
        }
    }

    handleKeyUp(e){
        if (e.keyCode==13){
            this.onSave();
        }
    }
    render(){
        const {SpanStyle, TextInputStyle, RowStyle, HeaderStyle} = Styles;
        return(
            <div
                style={{zIndex : 4, width : "50%", background : "grey", padding : "20px"}}
                onClick = {(e) => {
                    e.stopPropagation(); // Bu olmazsa, modalın onClick olayı çalışıyor ve modal kendini kapatıyor :)
                    e.preventDefault();
                }}
                onKeyUp = {this.handleKeyUp.bind(this)}
            >
                <div style={HeaderStyle}>
                    <button onClick={this.onClose.bind(this)}>X</button>
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
                    <span style={SpanStyle} >Yazar Adı : </span>
                    <input
                        type="text"
                        style={TextInputStyle}
                        onChange={this.onTextChange.bind(this, "YazarAdi")}
                        value ={this.state.YazarAdi}
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

const Styles = {
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
        justifyContent : "flex-end"
    }
}

export default NewBook;
