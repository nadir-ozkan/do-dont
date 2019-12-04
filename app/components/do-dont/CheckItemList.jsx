import React from 'react';
import utils from '../../Utils/utils.js';

import CheckItem from './CheckItem.jsx';

class CheckItemList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items : props.items ? props.items : [],
            insertMode : props.insertMode ? props.insertMode : false
        }
        this.keyNo = 0;
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.items != nextProps.items) {
            this.setState({items : nextProps.items});
        }
    }

    OnCancelNewEntry(){
        this.setState({insertMode : false});
    }

    OnSaveNewItem(itemText){
        if (this.props.OnSaveNewItem){
            this.props.OnSaveNewItem(itemText);
        }
    }

    OnDeleteItem(fbKey){
        if (this.props.OnDeleteItem){
            this.props.OnDeleteItem(fbKey);
        }
    }

    renderList(){

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
            return "Liste yüklenirken lütfen bekleyiniz!";
        }

    }

    handleNewEntryClick(e){
        e.preventDefault();
        this.setState({insertMode : !this.state.insertMode});
    }

    renderButton(){
        if(this.state.insertMode) {
            return null;
        }

        return (
            <button onClick={this.handleNewEntryClick.bind(this)}>Yeni öğe ekle</button>
        )
    }

    render(){
        let {NoClick} = Styles;
        return(
            <div>
                {this.renderList()}
                {this.renderButton()}
            </div>
        );
  }
}

const Styles = {
    NoClick : {
      pointerEvents: "none",
      opacity: "0.65"
    },
}

export default CheckItemList;
