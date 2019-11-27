import React from 'react';

import firebase, {fbRef, getData} from '../../firebase/index.js';
import utils from '../../Utils/utils.js';

import CheckItem from '../do-dont/CheckItem.jsx';

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

    addNewEntry(doItems, dontItems, dateObj){

        const newDoEntries = Object.keys(doItems).map((key) => {
            return {
                fbKey : key,
                text : doItems[key],
                checked : false
            }
        });

        this.doEntries.unshift({ items : newDoEntries, saveDateStr : dateObj.dateStrP});

        const newDontEntries = Object.keys(dontItems).map((key) => {
            return {
                fbKey : key,
                text : dontItems[key],
                checked : false
            }
        });

        this.dontEntries.unshift({ items : newDontEntries, saveDateStr : dateObj.dateStrP});

        this.saveNewEntry(this.doEntries[0].items, this.dontEntries[0].items, dateObj);
    }

    componentDidMount(){
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
