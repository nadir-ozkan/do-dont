import React from 'react';

import firebase, {fbRef, getData} from '../../firebase/index.js';
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
        alert("SaveNewItem " + itemType + " => " + itemText);
    }

    DeleteItem(itemType, fbKey) {
        alert("DeleteItem " + itemType + " => " + fbKey);
    }

    render() {
        const {MainDivStyle} = Styles;
        return(
            <div style={MainDivStyle}>
                <h3>List-ops are here!</h3>
                <CheckItem
                    insertMode= {this.state.insertMode}
                    itemText = {"İp hopla"}
                ></CheckItem>
                <button onClick= {() => {
                    this.setState({insertMode : !this.state.insertMode});
                }}>Change Mode</button>
                <CheckItemList
                    items={this.state.doItems}
                    OnSaveNewItem = {this.SaveNewItem.bind(this, "doItems")}
                    OnDeleteItem = {this.DeleteItem.bind(this, "doItems")}
                />
                <CheckItemList
                    items={this.state.dontItems}
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
