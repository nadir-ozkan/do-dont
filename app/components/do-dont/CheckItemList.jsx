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

        // Daha önce insert modda eklenmiş olabilecek itemları uçur
        if (!this.state.insertMode) {
            this.state.items = this.state.items.filter(item => item.fbKey);
        }

        const items = this.state.items;

        if (items && items.length > 0) {
            return items.map((item)=>{
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
