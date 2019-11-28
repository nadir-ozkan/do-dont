import React from 'react';

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
        alert("Sil : " + this.props.fbKey);
        if (this.props.OnDeleteCheckItem){
            this.props.OnDeleteCheckItem(this.props.fbKey);
        }
    }

    HandleSaveClick(e){
        alert("Kaydet : " + this.state.itemText);
        if (this.props.OnSaveCheckItem){
            this.props.OnSaveCheckItem(this.state.itemText);
        }
    }

    HandleCancelClick(e){
        alert("Cancel");
        if (this.props.OnCancelNewEntry){
            this.props.OnCancelNewEntry();
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.insertMode != this.state.insertMode){
            this.setState({insertMode : nextProps.insertMode});
        }
    }

    render(){

        const {ItemDivStyle, InputDivStyle, ButtonsDivStyle,
            ButtonStyle, TextStyle, LabelStyle} = Styles;

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
                    <div style={{display:"flex"}}>
                        <button style={ButtonStyle} onClick={this.HandleCancelClick.bind(this)}>İptal</button>
                        <button style={ButtonStyle} onClick={this.HandleSaveClick.bind(this)}>Kaydet</button>
                    </div>
                );
            } else {
                return (
                    <div style={{display:"flex"}}>
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
        background : "gold",
        margin : "0 auto",
        padding : "10px"
    },
    InputDivStyle : {
        flex : 4,
        border : "solid 1px crimson"
    },
    ButtonsDivStyle : {
        flex : 2,
        border : "solid 1px cornflowerblue",
        borderLeft : 0,
    },
    TextStyle : {
        width : "100%",
        fontSize : "14px",
    },
    LabelStyle : {
        width : "100%",
        fontSize : "14px",
        display : "inline-block",
        marginLeft : "3px",
        marginTop : "3px"
    },
    ButtonStyle : {
        flex : "1",
        cursor : "pointer"
    }

}

export default CheckItem;