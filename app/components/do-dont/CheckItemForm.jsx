import React from 'react';

import utils from '../../Utils/utils.js';

class CheckItemForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            itemText : props.itemText,
            headerText : props.headerText
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
        if (this.props.onModalClose){
            this.props.onModalClose();
        }
    }

    handleKeyUp(e) {
        if (e.keyCode==13) {
            this.HandleSaveClick();
        }
    }

    componentWillReceiveProps(nextProps){
    }

    render(){

        const {DivStyle, ButtonStyle, ButtonContainerStyle, HeaderStyle,
            HeaderDivStyle} = Styles;

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


        return(
            <div style={DivStyle}>
                <div style={HeaderDivStyle}>
                    <div style={HeaderStyle}>Here is the header</div>
                    <button onClick={this.props.onModalClose.bind(this)}>X</button>
                </div>
                <div style={ButtonContainerStyle}>
                    <button style={ButtonStyle} onClick={this.HandleCancelClick.bind(this)}>İptal</button>
                    <button style={ButtonStyle} onClick={this.HandleSaveClick.bind(this)}>Kaydet</button>
                </div>
            </div>
        );
    }
}

const Styles = {
    DivStyle : {
        display : "flex",
        margin : "0 auto",
        padding : utils.hUnit(0.5),
        color : "#f7f7f7",
        width : "75%",
        background : "#314247",
        flexDirection : "column"
    },
    HeaderDivStyle : {
        display : "flex",
        alignItems : "center",
        height : utils.hUnit(5),
        justifyContent : "flex-end",
        marginBottom : utils.hUnit(1.6),
        padding : utils.hUnit(0.8)
    },
    HeaderStyle : {
        flex : "1",
        marginRight : utils.hUnit(0.8)
    },
    InputDivStyle : {
        flex : 4,
    },
    ButtonsDivStyle : {
        flex : 2,
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
        padding : utils.hUnit(0.6) + " 0",
        fontSize : utils.hUnit(2.5),
        background : "#565b5c",
        color : "#f7f7f7",
        border : "0",
        borderRadius : utils.hUnit(1.4),
        margin : utils.hUnit(0.4)
    },
    ButtonContainerStyle : {
        display : "flex",
        height : "100%",
        alignItems : "center",
        marginBottom : utils.hUnit(0.8),
    }

}

export default CheckItemForm;
