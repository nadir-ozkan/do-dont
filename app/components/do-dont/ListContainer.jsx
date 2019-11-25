import React from 'react';
import firebase, {fbRef, getData} from '../../firebase/index.js';

import utils from '../../Utils/utils.js';
import notify from '../../Utils/notify.js';

import List from "./List.jsx";
import axios from 'axios';

class ListContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items : [],
            dateStr : props.dateStr ? props.dateStr : utils.getDateObj().dateStrP,
            isNewEntry : false
        }

        this.currentIndex = 0;
        this.entries = props.entries;
        this.user = props.user;
        this.doItems = props.doItems;
        this.dontItems = props.dontItems;
    }

    componentWillMount() {
        //this.insertNewListItems();
    }

    componentDidMount(){

        const refStr = `users/${this.user.userName}/list1`;

        getData(refStr)
            .then((result) => {

                if (result) {

                    console.log(result);

                    this.doItems = result.items.doItems;
                    this.dontItems = result.items.dontItems;

                    if (result.items.entries) {

                        let entriesArray = utils.objToArray(result.items.entries);
                        entriesArray.sort(function(a,b) {
                            return b.saveDate - a.saveDate;
                        });

                        this.entries = entriesArray.map((entry) => {
                            return {
                                items : entry.does,
                                saveDateStr : entry.saveDateStr
                            }
                        });
                        console.log(this.entries);
                    }

                }

                const dateObj = utils.getDateObj();

                if (this.entries) {
                    if (this.entries[0].saveDateStr !== dateObj.dateStrP) {
                        if (this.doItems) {
                            const doItemsArr = Object.keys(this.doItems).map((key) => {
                                return {
                                    fbKey : key,
                                    text : this.doItems[key],
                                    checked : false
                                }
                            });
                            this.setState({items : doItemsArr, isNewEntry : true});
                        }
                    } else {
                        this.setState({items : this.entries[0].items});
                    }
                }
                else // henüz hiç entry girilmemişse
                {
                    if (this.doItems) {
                        const doItemsArr = Object.keys(this.doItems).map((key) => {
                            return {
                                fbKey : key,
                                text : this.doItems[key],
                                checked : false
                            }
                        });
                        this.setState({items : doItemsArr, isNewEntry : true});
                    }
                }

            });

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

    onSaveList(entry, isNewEntry) {
        if (isNewEntry) {
          this.entries.unshift(entry);
          this.setState({isNewEntry : false});
        } else {
          this.entries[0] = entry;
        }
        console.log(this.entries);
    }

    render(){
        const {DateStyle, ButtonsDivStyle} = Styles;

        return (
            <div>
                <div style={DateStyle}>{this.state.dateStr}</div>
                <List
                    items={this.state.items}
                    isNewEntry={this.state.isNewEntry}
                    onSaveList = {this.onSaveList.bind(this)}
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
