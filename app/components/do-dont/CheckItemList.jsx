import React from 'react';
import utils from '../../Utils/utils.js';

import CheckItem from './CheckItem.jsx';

class CheckItemList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items : props.items || [],
            insertMode : props.insertMode || false,
            noClick : false,
            emptyList : props.emptyList || false
        }
        this.keyNo = 0;
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.items != nextProps.items) {
            this.setState({
                items : nextProps.items,
                emptyList : nextProps.items.length == 0
            });
        }
    }

    OnCancelNewEntry(){
        this.setState({insertMode : false});
    }

    OnSaveNewItem(itemText){
        this.setState({noClick : true}, () => {
            if (this.props.OnSaveNewItem){
                this.props.OnSaveNewItem(itemText);
            }
            this.setState({insertMode : false, noClick : false});
        });

    }

    OnDeleteItem(fbKey){
        this.setState({noClick : true}, () => {
            if (this.props.OnDeleteItem){
                this.props.OnDeleteItem(fbKey);
            }
            this.setState({insertMode : false, noClick : false});
        });
    }

    renderList(){
        const {MessageLabelStyle} = Styles;

        if (this.state.emptyList && !this.state.insertMode) {
            return <div style={MessageLabelStyle}>Listeniz boş! Hemen eklemeye başlayın!</div>
        }

        // Daha önce insert modda eklenmiş olabilecek itemları uçur
        if (!this.state.insertMode) {
            this.state.items = this.state.items.filter(item => item.fbKey);
        } else {
            this.state.items.push({
                insertMode : true,
                OnCancelNewEntry : this.OnCancelNewEntry.bind(this),
                OnSaveNewItem : this.OnSaveNewItem.bind(this)
            });
        }

        const items = this.state.items;

        if (items && items.length > 0) {
            return items.map((item)=>{
                return (
                    <div key={"key_" + (++this.keyNo)}>
                        <CheckItem
                            {...item}
                            OnDeleteItem = {this.OnDeleteItem.bind(this)}
                        />
                    </div>
                );
            });
        } else {
            return  <div style={MessageLabelStyle}>Liste yüklenirken lütfen bekleyiniz...</div>
        }

    }

    handleNewEntryClick(e){
        e.preventDefault();
        this.setState({insertMode : !this.state.insertMode});
    }

    renderButton(){
        if (this.state.insertMode) {
            return null;
        }
        const {AddButtonStyle} = Styles;
        return (
            <div style={AddButtonStyle}>
                <button style={{fontSize : utils.hUnit(2)}} onClick={this.handleNewEntryClick.bind(this)}>Yeni öğe ekle</button>
            </div>
        )
    }

    renderLabel(){
        const {LabelStyle} = Styles;
        if (this.props.ListLabel) {
            return <div style={LabelStyle}>{this.props.ListLabel}</div>
        } else {
            return null;
        }
    }

    render(){
        const {NoClick, MainDivStyle} = Styles;
        const divStyle = this.state.noClick ? NoClick : null;
        return(
            <div style = {MainDivStyle}>
                <div style={divStyle}>
                    {this.renderLabel()}
                    {this.renderList()}
                    {this.renderButton()}
                </div>
            </div>
        );
  }
}

const Styles = {
    NoClick : {
      pointerEvents: "none",
      opacity: "0.65"
    },
    LabelStyle : {
        background : "crimson",
        textAlign : "center",
        fontSize : utils.hUnit(2.5),
        height : "2em",
        lineHeight : "2em"
    },
    AddButtonStyle  : {
        textAlign : "center",
        height : "2em",
        lineHeight : "2em",
        margin : utils.hUnit(0.5) + " 0",
        fontSize : utils.hUnit(2)
    },
    MessageLabelStyle : {
        textAlign : "center",
        height : "1.3em",
        lineHeight : "1.3em",
        margin : utils.hUnit(0.25) + " 0"
    },
    MainDivStyle : {
        border : "1px solid crimson",
        margin : utils.hUnit(0.5)
    }
}

export default CheckItemList;
