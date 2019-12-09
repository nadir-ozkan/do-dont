import React from 'react';

import {fbRef, getData} from '../../firebase/index.js';
import utils from '../../Utils/utils.js';

import CheckItem from '../do-dont/CheckItem.jsx';
import CheckItemList from '../do-dont/CheckItemList.jsx';

class ListOpsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            listDataLoaded : false,
            insertMode : false,
            doItems : [],
            dontItems : []
        }

        this.user = props.route.user;

    }

    getListData(itemType){
        const that = this;
        return new Promise(function(resolve, reject) {
            const refStr = `users/${that.user.userName}/list1/items/${itemType}`;
            getData(refStr)
                .then((items) => {
                    if (items) {
                        let arr =[];
                        Object.keys(items).forEach((key) => {
                            arr.push({
                                itemText : items[key],
                                fbKey : key
                            });
                        });
                        resolve(arr);
                    } else {
                        resolve([]);
                    }
                });
        });
    }

    saveNewEntry(doEntries, dontEntries, dateObj){
        const {userName} = this.user;
        const refStr = `users/${userName}/list1/items/entries/` + dateObj.dateStr;
        // const refStr = "users/Nadir/list1/items/entries/05_09_2019";

        const objToBeSaved = {
          does : doEntries,
          doesPercent : 0,
          donts : dontEntries,
          dontsPercent : 0,
          saveDate : dateObj.jsTime,
          saveDateStr : dateObj.dateStrP
        }

        fbRef.child(refStr)
            .set(objToBeSaved)
            .then(()=> {
                // yeni kayıt sonrası callback çalıştırmak istersen...
            });
    }

    componentDidMount(){
        this.getListData("doItems")
            .then((doItemsArray) => {
                this.setState({doItems : doItemsArray});
                this.getListData("dontItems")
                    .then((dontItemsArray) => {
                        this.setState({dontItems : dontItemsArray});
                    });
            });
    }

    SaveNewItem(itemType, itemText){
        const {userName} = this.user;
        const refStr = `users/${userName}/list1/items/${itemType}`;
        const newDoItemRef = fbRef.child(refStr).push();
        newDoItemRef.set(itemText)
            .then(() => {
                this.getListData(itemType)
                    .then((itemsArray) => {
                        const obj = {};
                        obj[itemType] = itemsArray;
                        this.setState(obj);
                    });
            });
    }

    DeleteItem(itemType, fbKey) {
        const {userName} = this.user;
        const refStr = `users/${userName}/list1/items/${itemType}/${fbKey}`;
        fbRef.child(refStr)
            .set(null)  // İlgili refi sil...
            .then(() => {
                this.getListData(itemType)
                    .then((itemsArray) => {
                        const obj = {};
                        obj[itemType] = itemsArray;
                        this.setState(obj);
                    });
            });
    }

    render() {
        const {MainDivStyle} = Styles;
        return(
            <div style={MainDivStyle}>
                <CheckItemList
                    items={this.state.doItems}
                    ListLabel = {"Do Items"}
                    OnSaveNewItem = {this.SaveNewItem.bind(this, "doItems")}
                    OnDeleteItem = {this.DeleteItem.bind(this, "doItems")}
                />
                <CheckItemList
                    items={this.state.dontItems}
                    ListLabel = {"Don't Items"}
                    OnSaveNewItem = {this.SaveNewItem.bind(this, "dontItems")}
                    OnDeleteItem = {this.DeleteItem.bind(this, "dontItems")}
                />
            </div>
        );
    }


}

const Styles = {
    MainDivStyle : {
        background : "aliceblue",
        margin : "0 auto",
        padding : "10px"
    }
}

export default ListOpsPage;
