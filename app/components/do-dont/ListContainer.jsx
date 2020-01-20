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
            dateStr : props.dateStr || utils.getDateObj().dateStrP
        }

        this.currentIndex = 0;

        this.listItems = props.listItems;
        this.entries = props.entries;
        this.user = props.user;
    }

    componentWillMount() {
        // this.insertNewListItems();
    }

    componentWillReceiveProps(nextProps) {
        if (this.entries != nextProps.entries) {
            this.entries = nextProps.entries;
            this.setState({items : nextProps.entries[0].items})
        }
    }

    componentDidMount(){
        // Şimdilik yeni kullanıcıların gözünü korkutmaya gerek yok.
        // TODO: Push notification izni için kullandığın apiyi modern browser apisiyle değiştir.
        // notify.askPermissionForMessaging(this.user.userName);
    }

    insertNewListItems(){
        const newItems = [
            "Yapma 1",
            "Yapma 2"
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
            if (this.props.onDateChange){
                this.props.onDateChange(newEntries.saveDateStr);
            }
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

        const {userName} = this.user;
        const dateObj = utils.getDateObj();

        const refStr = `users/${userName}/list1/items/entries/` + dateObj.dateStr;
        // const refStr = `users/${userName}/list1/items/entries/17_01_2020`;

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

    renderButtons(){

        const nextButtonVisible = this.state.dateStr != utils.getDateObj().dateStrP;
        const prevButtonVisible = this.entries && this.entries.length && this.entries.length>1;

        if (nextButtonVisible || prevButtonVisible){
            const {ButtonsDivStyle, ButtonStyle} = Styles;
            return (
                <div style={ButtonsDivStyle}>
                    {prevButtonVisible ? <button id="prevButton"
                                            onClick={this.handlePrevClick.bind(this)}
                                            style = {ButtonStyle}
                                         >Prev</button>
                                        : null
                                     }

                    {nextButtonVisible ? <button id="nextButton"
                                            onClick={this.handleNextClick.bind(this)}
                                            style = {ButtonStyle}
                                         >Next</button>
                                        : null
                    }
                </div>
            );
        } else {
            return null;
        }
    }

    render(){
        return (
            <div>
                <List
                    items={this.state.items}
                    onSaveItems = {this.onSaveItems.bind(this)}
                    dateStr = {this.state.dateStr}
                    user = {this.props.user}
                ></List>
                {this.renderButtons()}
            </div>
        )

    }
}

const Styles = {
    ButtonsDivStyle : {
        display : "flex",
        justifyContent :"space-between"
    },
    ButtonStyle: {
        fontSize : utils.hUnit(3),
        marginTop : utils.hUnit(0.5),
        marginBottom : utils.hUnit(0.5),
        background : "#565b5c",
        color : "#f7f7f7",
        border : "0",
        padding : utils.hUnit(0.8),
        borderRadius : utils.hUnit(1.4),
        padding : "0 " + utils.hUnit(1.4)
    }
}

export default ListContainer;
