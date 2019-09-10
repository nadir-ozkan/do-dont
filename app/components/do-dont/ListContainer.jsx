import React from 'react';
import firebase, {fbRef, githubProvider} from '../../firebase/index.js';
import utils from '../../Utils/utils.js';

import List from "./List.jsx";

class ListContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items : [],
            dateStr : props.dateStr ? props.dateStr : utils.getDateObj().dateStrP,
            isNewEntry : false
        }

        this.currentIndex = 0;
        this.entries = undefined;

        this.mockData = [
            {
                does : [
                    {checked: false, fbKey: "-a", text: "Item 1"},
                    {checked: true, fbKey: "-ab", text: "Item 2"},
                    {checked: false, fbKey: "-abf", text: "Item 3"},
                    {checked: true, fbKey: "-adeer", text: "Item 4"},
                    {checked: false, fbKey: "-aff", text: "Item 5"}
                ],
                saveDateStr : "05.09.2019"
            },
            {
                does : [
                    {checked: false, fbKey: "-sa", text: "Item 1"},
                    {checked: false, fbKey: "-ssab", text: "Item 2"},
                    {checked: false, fbKey: "-sddabf", text: "Item 3"},
                    {checked: false, fbKey: "-22adeer", text: "Item 4"},
                    {checked: false, fbKey: "-1aff", text: "Item 5"}
                ],
                saveDateStr : "03.09.2019"
            },
            {
                does : [
                    {checked: true, fbKey: "3-sa", text: "Item 1"},
                    {checked: true, fbKey: "3-ssab", text: "Item 2"},
                    {checked: true, fbKey: "3-sddabf", text: "Item 3"},
                    {checked: true, fbKey: "3-22adeer", text: "Item 4"},
                    {checked: true, fbKey: "3-1aff", text: "Item 5"}
                ],
                saveDateStr : "01.09.2019"
            },
        ]

    }

    componentWillMount() {
        //this.insertNewListItems();
    }

    componentDidMount(){

        // const refStr = "users/Ayca/list1/items/entries";
        const refStr = "users/Nadir/list1";

        this.getData(refStr)
            .then((result) => {
                if (result) {

                    console.log(result);

                    this.doItems = result.items.doItems;

                    if (result.items.entries) {

                        let entriesArray = utils.objToArray(result.items.entries);
                        entriesArray.sort(function(a,b) {
                            return b.saveDate - a.saveDate;
                        });

                        this.entries = entriesArray;
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
                        this.setState({items : this.entries[0].does});
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

    }

    getData(refStr) {
        return new Promise(function(resolve, reject) {
            fbRef.child(refStr).once("value")
                .then((ss) => {
                    ss.exists() ? resolve(ss.val()) : resolve(null);
                })
                .catch((hata) => {
                    console.log("Hata " + hata.toString());
                    reject(hata);
                    throw hata;
                });
          });
    }

    insertNewListItems(){
        const newItems = [
            "Kediyi besle",
            "İp hopla",
            "İşe git"
        ];
        newItems.forEach((item) => {
            const doItemsRef = "users/Nadir/list1/items/doItems";
            fbRef.child(doItemsRef)
                .push(item);
        });
    }

    setItemsAndDate() {
        const newItems = this.entries[this.currentIndex];

        if (newItems && newItems.does){
            this.setState({
                items : newItems.does,
                dateStr: newItems.saveDateStr
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

    onSaveList(newEntry) {
        this.entries[0] = newEntry;
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
