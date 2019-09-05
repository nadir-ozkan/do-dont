import React from 'react';
import firebase, {fbRef, githubProvider} from '../../firebase/index.js';
import utils from '../../Utils/utils.js';

import List from "./List.jsx";

class ListContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items : [],
            dateStr : props.dateStr ? props.dateStr : utils.getDateObj().dateStrP
        }

        this.currentIndex = 0;
        this.itemsList = [];
        this.itemsListCount = 0;

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
        this.insertNewListItems();
    }

    componentDidMount(){

        // const refStr = "users/Ayca/list1/items/entries";
        const refStr = "users/Ayca/list1";
 
        this.getData(refStr)
            .then((result) => {
                if (result) {

                    console.log(result);

                    let entriesArray = utils.objToArray(result.items.entries);
                    entriesArray.sort(function(a,b) {
                        return b.saveDate - a.saveDate;
                    });
        
                    console.log(entriesArray);     

                    this.itemsList = entriesArray;
                    this.itemsListCount = entriesArray.length;

                    localStorage.setItem("entries", JSON.stringify(entriesArray));
                   
                }

                localStorage.setItem("doItems", JSON.stringify(result.items.doItems));
            
                const dateObj = utils.getDateObj();
                const entries = JSON.parse(localStorage.getItem("entries"));
        
                if (entries.length == 0) {
                    const doItems = JSON.parse(localStorage.getItem("doItems"));
                    if (doItems) {
                        const doItemsArr = Object.keys(doItems).map((key) => {
                            return {
                                fbKey : key,
                                text : doItems[key],
                                checked : false
                            }
                        });
                        this.setState({items : doItemsArr});
                    }
                }
                
                if (entries) {
                    if (entries[0].saveDateStr !== dateObj.dateStrP) {
                        const doItems = JSON.parse(localStorage.getItem("doItems"));
                        if (doItems) {
                            const doItemsArr = Object.keys(doItems).map((key) => {
                                return {
                                    fbKey : key,
                                    text : doItems[key],
                                    checked : false
                                }
                            });
                            this.setState({items : doItemsArr});
                        }
                    } else {
                        this.setState({items : entries[0].does});
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
            "Bir bardak su iç", 
            "Surya Namaskar", 
            "5K yürüyüş", 
            "Bir bardak su iç", 
            "Pilates yap",
            "Yüz bakımı",
            "1. Yemek",
            "Bir bardak su iç",
            "Haplarını al",
            "Bir bardak su iç",
            "2. Yemek",
            "Bir bardak su iç",
            "Meditasyon yap"
        ];
        newItems.forEach((item) => {
            const doItemsRef = "users/Ayca/list1/items/doItems";
            fbRef.child(doItemsRef)
                .push(item);
        });
    }

    setItemsAndDate() {
        const newItems = this.itemsList[this.currentIndex];

        if (newItems && newItems.does){
            this.setState({
                items : newItems.does, 
                dateStr: newItems.saveDateStr 
            });
        }      
    }

    handleNextClick(e) {
        if (this.currentIndex==0) return;
        this.currentIndex--;
        this.setItemsAndDate();
    }

    handlePrevClick(e) {
        if (this.currentIndex == this.itemsListCount-1) return;
        this.currentIndex++;
        this.setItemsAndDate();
    }

    render(){
        const {DateStyle, ButtonsDivStyle} = Styles;
        return (
            <div>
                <div style={DateStyle}>{this.state.dateStr}</div>
                <List items={this.state.items}></List>
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