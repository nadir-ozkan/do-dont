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
        const newItems = ["2 Litre su iç", "İp zıpla", "10 K yürüyüvergari", "Multivitamin al", "Omega3 ye"];
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