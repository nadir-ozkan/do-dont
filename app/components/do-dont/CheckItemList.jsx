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
        if (nextProps.insertMode) {
            let newItemsArr = this.state.items;
            newItemsArr.push({insertMode:true});
            this.setState( {items : newItemsArr, insertMode : nextProps.insertMode});
        } else {
            this.setState({insertMode : nextProps.insertMode});
        }
    }

    renderList(){

        let {items} = this.state;

        // Daha önce insert modda eklenmiş olabilecek itemları uçur
        if (!this.state.insertMode) {
            items = items.map(item => item.fbKey); // sadece fbKey olan itemları al
        }

        if (items && items.length > 0) {
            return this.state.items.map((item)=>{
                return (
                    <div key={"key_" + (++this.keyNo)}>
                        <CheckItem
                            {...item}
                        />
                    </div>
                );
            });
        } else {
            return "Liste yüklenirken lütfen bekleyiniz!";
        }

    }

    render(){
        let {NoClick} = Styles;
        return(
            <div>
                {this.renderList()}
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
