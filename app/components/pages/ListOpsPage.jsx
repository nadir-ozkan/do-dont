import React from 'react';

import {fbRef, getData} from '../../firebase/index.js';
import utils from '../../Utils/utils.js';

import CheckItem from '../do-dont/CheckItem.jsx';
import CheckItemList from '../do-dont/CheckItemList.jsx';
import Navbar from './Navbar.jsx';

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
        this.OnLogOut = props.route.OnLogOut;

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

    UpdateUi(itemType, itemsArray) {
        const obj = {};
        obj[itemType] = itemsArray;
        this.setState(obj);
    }

    SaveNewItem(itemType, itemText){
        const {userName} = this.user;
        const refStr = `users/${userName}/list1/items/${itemType}`;
        const newDoItemRef = fbRef.child(refStr).push();

        newDoItemRef.set(itemText)
            .then(() => {
                this.getListData(itemType)
                    .then((itemsArray) => {
                        localStorage.setItem("ListUpdated", true);
                        this.UpdateUi(itemType, itemsArray);
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
                        localStorage.setItem("ListUpdated", true);
                        this.UpdateUi(itemType, itemsArray);
                    });
            });
    }

    render() {
        const {MainDivStyle} = Styles;
        return(
            <div>
                <Navbar ActivePage={"ListOps"}
                    router={this.props.router}
                    OnLogOut={this.OnLogOut}
                />
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
            </div>

        );
    }

}

const Styles = {
    MainDivStyle : {
        background : "#314247",
        margin : "0 auto",
        padding : "10px"
    }
}

export default ListOpsPage;
