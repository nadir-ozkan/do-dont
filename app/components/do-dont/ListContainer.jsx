import React from 'react';
import {fbRef} from '../../firebase/index.js';

import utils from '../../Utils/utils.js';
import notify from '../../Utils/notify.js';

import List from "./List.jsx";
import axios from 'axios';

class ListContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items : props.entries[0].items,
            dateStr : props.dateStr ? props.dateStr : utils.getDateObj().dateStrP
        }

        this.currentIndex = 0;

        this.listItems = props.listItems;
        this.entries = props.entries;
        this.user = props.user;
    }

    componentWillMount() {
        //this.insertNewListItems();
    }

    componentWillReceiveProps(nextProps) {
        if (this.entries != nextProps.entries) {
            this.entries = nextProps.entries;
            this.setState({items : nextProps.entries[0].items})
        }
    }

    componentDidMount(){
        notify.askPermissionForMessaging(this.user.userName);
    }

    insertNewListItems(){
        const newItems = [
            "Kafein tüketme",
            "Şeker tüketme",
            "Süt ve süt ürünlerinden uzak dur",
            "Un tüketme"
        ];

        const dontItemsRef = `users/${this.user.userName}/list1/items/dontItems`;
        newItems.forEach((item) => {
            fbRef.child(dontItemsRef)
                .push(item);
        });
    }

    setItemsAndDate() {
        const newEntries = this.entries[this.currentIndex];

        if (newEntries && newEntries.items){
            this.setState({
                items : newEntries.items,
                dateStr: newEntries.saveDateStr
            });
        }
    }

    handleNextClick(e) {
        if (!this.entries) return;
        if (this.currentIndex==0) return;
        this.currentIndex--;
        this.setItemsAndDate();
    }

    handlePrevClick(e) {
        if (!this.entries) return;
        if (this.currentIndex == this.entries.length-1) return;
        this.currentIndex++;
        this.setItemsAndDate();
    }

    onSaveItems(items, percentage){

        // entries[0]'ı güncelle. ??

        console.log(items, percentage);
        const {userName} = this.user;
        const dateObj = utils.getDateObj();

        const refStr = `users/${userName}/list1/items/entries/` + dateObj.dateStr;
        // const refStr = "users/Nadir/list1/items/entries/05_09_2019";

        const updates = {};

        if (this.props.containerType == "does") {
            updates[refStr + "/does"] = items;
            updates[refStr + "/doesPercent"] = percentage;
        } else {
            updates[refStr + "/donts"] = items;
            updates[refStr + "/dontsPercent"] = percentage;
        }

        updates[refStr + "/saveDate"] = dateObj.jsTime;
        updates[refStr + "/saveDateStr"] = dateObj.dateStrP;

        fbRef.update(updates)
            .then(() => {
                // güncelleme sonrası bir callback çalıştırmak istersen...
            });
    }

    render(){
        const {DateStyle, ButtonsDivStyle} = Styles;

        return (
            <div>
                <div style={DateStyle}>{this.state.dateStr}</div>
                <List
                    items={this.state.items}
                    onSaveItems = {this.onSaveItems.bind(this)}
                    dateStr = {this.state.dateStr}
                    user = {this.props.user}
                ></List>
                <div style={ButtonsDivStyle}>
                    <button id="prevButton" onClick={this.handlePrevClick.bind(this)}>Prev</button>
                    {/* <button id="todayButton">Today</button> */}
                    <button id="nextButton" onClick={this.handleNextClick.bind(this)}>Next</button>
                </div>
            </div>
        )

    }
}

const Styles = {
    DateStyle : {
        margin : "5px auto",
        textAlign : "center",
        background : "cornflowerblue",
        padding : "5px",
    },
    ButtonsDivStyle : {
        display : "flex",
        justifyContent :"space-between"
    }
}

export default ListContainer;
