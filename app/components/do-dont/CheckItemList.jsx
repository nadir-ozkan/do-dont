import React from 'react';
import utils from '../../Utils/utils.js';

import ListItem from './ListItem.jsx';
import PercentDisplay from './PercentDisplay.jsx';

class CheckItemList extends React.Component {

    constructor(props){
        super(props);
        this.state = { items : props.items }
        this.keyNo = 0;
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.items != nextProps.items) {
            this.setState({items : nextProps.items});
        }
    }

    onCheckedChange(fbKey, checked) {
        let newItems = this.state.items.map((item) => {
           if (item.fbKey == fbKey) {
               item.checked = checked;
               return item;
           } else {
               return item;
           }
        });
        this.setState({items : newItems}, () => {
            if (this.props.onSaveItems) {
                this.props.onSaveItems(newItems, this.percentage);
            }
        });
    }

    calculatePercentage(){
        const itemsCount = this.state.items.length;
        let checkedCount = 0;
        this.state.items.forEach((item) => {
            if (item.checked) {
                checkedCount++
            }
        });

        const result = parseInt(checkedCount / itemsCount * 100, 10);

        return isNaN(result) ? 0 : result;
    }

    renderList(){

        const {items} = this.state;

        if (items && items.length > 0) {
            return this.state.items.map((item)=>{
                return (
                    <div key={"key_" + (++this.keyNo)}>
                        <ListItem
                            {...item}
                            onCheckedChange = {this.onCheckedChange.bind(this)}
                        ></ListItem>
                    </div>
                );
            });
        } else {
            return "Liste yüklenirken lütfen bekleyiniz!";
        }

    }

    render(){
        let {NoClick, PercentBarStyle} = Styles;
        this.percentage = this.calculatePercentage();
        const percentBarStyle = utils.mergeObjects(PercentBarStyle, {width : this.percentage + "%"});
        const listDivStyle = utils.isToday(this.props.dateStr) ? null : NoClick;
        return(
            <div style={listDivStyle}>
                {this.renderList()}
                <PercentDisplay percent={this.percentage}></PercentDisplay>
            </div>
        );
  }
}

const Styles = {
    PercentBarStyle : {
        position : "absolute",
        fontSize : "24px",
        width : "0%",
        background : "gold",
        zIndex : -1,
        top :"0",
        left : "0",
        height :"27px"
    },
    NoClick : {
      pointerEvents: "none",
      opacity: "0.65"
    },
    PercentStyle :{
      position : "relative",
      textAlign : "center",
      zIndex : 1,
      height : "27px",
      padding : "5px",
      margin : "5px 0"
    }
}

export default CheckItemList;
