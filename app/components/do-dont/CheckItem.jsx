import React from 'react';

import utils from '../../Utils/utils.js';

class CheckItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            insertMode : props.insertMode,
            itemText : props.itemText
        }
    }

    componentDidMount() {
        if (this.textInput) {
            this.textInput.focus();
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (this.textInput) {
            this.textInput.focus();
        }
    }

    handleTextChange(e) {
        this.setState({itemText : e.target.value});
    }

    HandleDeleteClick(e){
        const cevap = confirm("Bu öğeye ait geçmişe yönelik tüm istatistikler silinecektir. Silmek istediğinizden emin misiniz?");
        if (cevap && this.props.OnDeleteItem){
            this.props.OnDeleteItem(this.props.fbKey);
        }
    }

    HandleSaveClick(){
        const itemText = this.state.itemText;
        if (!itemText || itemText.trim() == "") {
            alert("Öğe için bir metin girip tekrar deneyiniz.");
            return;
        }
        if (this.props.OnSaveNewItem){
            this.props.OnSaveNewItem(itemText.trim());
        }
    }

    HandleCancelClick(e){
        if (this.props.OnCancelNewEntry){
            this.props.OnCancelNewEntry();
        }
    }

    handleKeyUp(e) {
        if (e.keyCode==13) {
            this.HandleSaveClick();
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.insertMode != this.state.insertMode){
            this.setState({insertMode : nextProps.insertMode});
        }
    }

    render(){

        const {ItemDivStyle, InputDivStyle, ButtonsDivStyle,
            ButtonStyle, TextStyle, LabelStyle, ButtonContainerStyle} = Styles;

        const InputStyle = this.state.insertMode ? TextStyle : LabelStyle;

        const that = this;

        const renderInput = () => {
            if (this.state.insertMode) {
                return (
                    <input
                        // Burada ilgili html öğesine ait ref bir fonksiyon kullanılarak,
                        // içinde bulunduğu bileşene değişken olarak kaydediliyor!
                        ref={ (input) => { this.textInput = input; }}
                        style={InputStyle}
                        type="text"
                        value={this.state.itemText}
                        onChange={this.handleTextChange.bind(this)}
                        onKeyUp={this.handleKeyUp.bind(this)}
                        autoFocus="true"
                    />
                );
            } else {
                return (
                    <label style={InputStyle}>{this.state.itemText}</label>
                )
            }
        }

        const renderButtons = () => {
            if (this.state.insertMode) {
                return (
                    <div style={ButtonContainerStyle}>
                        <button style={ButtonStyle} onClick={this.HandleCancelClick.bind(this)}>İptal</button>
                        <button style={ButtonStyle} onClick={this.HandleSaveClick.bind(this)}>Kaydet</button>
                    </div>
                );
            } else {
                return (
                    <div style={ButtonContainerStyle}>
                        <button style={ButtonStyle} onClick={this.HandleDeleteClick.bind(this)}>Sil</button>
                    </div>
                );
            }
        }

        return(
            <div style={ItemDivStyle}>
                <div style={InputDivStyle}>{renderInput()}</div>
                <div style={ButtonsDivStyle}>{renderButtons()}</div>
            </div>
        );
    }
}

const Styles = {
    ItemDivStyle : {
        display : "flex",
        // background : "gold",
        margin : "0 auto",
        padding : utils.hUnit(0.5),
        color : "#f7f7f7"
    },
    InputDivStyle : {
        flex : 4,
        // border : "solid 1px crimson"
    },
    ButtonsDivStyle : {
        flex : 2,
        // border : "solid 1px cornflowerblue",
        borderLeft : 0,
    },
    TextStyle : {
        width : "100%",
        fontSize : utils.hUnit(2.5),
    },
    LabelStyle : {
        width : "100%",
        fontSize : utils.hUnit(2.5),
        display : "inline-block",
        marginLeft : utils.hUnit(0.25),
        marginTop : utils.hUnit(0.25)
    },
    ButtonStyle : {
        flex : "1",
        cursor : "pointer",
        fontSize : utils.hUnit(2),
        padding : utils.hUnit(0.4) + " 0",
        background : "#565b5c",
        color : "#f7f7f7",
        border : "0",
        borderRadius : utils.hUnit(1.4),
    },
    ButtonContainerStyle : {
        display : "flex",
        height : "100%",
        alignItems : "center"
    }

}

export default CheckItem;
