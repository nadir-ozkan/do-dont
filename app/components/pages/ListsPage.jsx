import React from 'react';

import firebase, {fbRef, getData} from '../../firebase/index.js';
import utils from '../../Utils/utils.js';

import ListContainer from '../do-dont/ListContainer.jsx';
import Tabs from '../do-dont/Tabs.jsx';
import Navbar from './Navbar.jsx';

class ListsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            listDataLoaded : false
        }

        this.user = props.route.user;
        this.OnLogOut = props.route.OnLogOut;

        this.doItems = [];
        this.dontItems = [];
        this.doEntries = [];
        this.dontEntries = [];
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

    getListData() {
        const that = this;
        return new Promise(function(resolve, reject) {
            const refStr = `users/${that.user.userName}/list1`;

            getData(refStr)
                .then((result) => {
                    if (result) {

                        console.log(result);

                        that.doItems = result.items.doItems;
                        that.dontItems = result.items.dontItems;

                        const dateObj = utils.getDateObj();

                        if (result.items.entries) {

                            let entriesArray = utils.objToArray(result.items.entries);
                            entriesArray.sort(function(a,b) {
                                return b.saveDate - a.saveDate;
                            });

                            that.doEntries = entriesArray.map((entry) => {
                                return {
                                    items : entry.does,
                                    saveDateStr : entry.saveDateStr
                                }
                            });

                            that.dontEntries = entriesArray.map((entry) => {
                                return {
                                    items : entry.donts,
                                    saveDateStr : entry.saveDateStr
                                }
                            });

                            if (that.doEntries[0].saveDateStr !== dateObj.dateStrP) {
                                that.addNewEntry(that.doItems, that.dontItems, dateObj);
                            }

                            resolve(true);

                        } else { // hiç giriş yok ise
                            that.addNewEntry(that.doItems, that.dontItems, dateObj);
                            resolve(true);
                        }

                    } else {
                        resolve(false);
                    }
                });
        });
    }

    componentDidMount(){
        this.getListData()
            .then((hasData) => {
                if (hasData) {
                    this.setState({listDataLoaded : true});
                } else {
                    this.props.router.push('/list-ops');
                }
            });
    }

    render() {

        const {MainDivStyle} = Styles;
        const tabs = [
          {
              label:"Do'es",
              content: <ListContainer
                              user={this.user}
                              listItems = {this.doItems}
                              entries = {this.doEntries}
                              containerType = {"does"}
                      ></ListContainer>
          },
          {
              label:"Don'ts",
              content :  <ListContainer
                          user={this.user}
                          listItems = {this.dontItems}
                          entries = {this.dontEntries}
                          containerType = {"donts"}
                      ></ListContainer>
          },
        ]

        const renderTabs = () => {
            if (this.state.listDataLoaded) {
                return <Tabs tabs={tabs} activeTab="Do'es"/>
            } else {
                return <h3>Veriler alınırken lütfen bekleyiniz</h3>
            }
        }

        return(
            <div>
                <Navbar ActivePage={"MainPage"}
                    router={this.props.router}
                    OnLogOut={this.OnLogOut}
                />
                <div style={MainDivStyle}>
                    {renderTabs()}
                </div>
            </div>
        );

    }
}

const Styles = {
    MainDivStyle : {
        background : "aliceblue",
        margin : "0 auto",
        padding : "10px",
        fontSize : "18px",
        minWidth : "300px"
    },
    PageTitleStyle : {
        textAlign : "center"
    }
}

export default ListsPage;
