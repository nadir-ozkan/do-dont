import React from 'react';

import utils from '../../Utils/utils.js';
import api from '../../api/doDontApi';

import ListContainer from '../do-dont/ListContainer.jsx';
import Tabs from '../do-dont/Tabs.jsx';
import Navbar from './Navbar.jsx';
import DateDisplay from '../do-dont/DateDisplay.jsx';

class ListsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            listDataLoaded : false,
            dateStr : utils.getDateObj().dateStrP
        }

        this.user = props.route.user;
        this.userName = props.route.user.userName;
        this.OnLogOut = props.route.OnLogOut;

        this.doItems = [];
        this.dontItems = [];
        this.doEntries = [];
        this.dontEntries = [];
    }

    SaveNewEntry(doEntries, dontEntries, dateObj){
        api.saveNewEntry(this.userName, doEntries, dontEntries, dateObj);
    }

    AddNewEntry(doItems, dontItems, dateObj){

        const newDoEntries = Object.keys(doItems).map((key) => {
            return {
                fbKey : key,
                text : doItems[key],
                checked : false
            }
        });

        this.doEntries.unshift({ items : newDoEntries, saveDateStr : dateObj.dateStrP, saveDate : dateObj.jsTime});

        const newDontEntries = Object.keys(dontItems).map((key) => {
            return {
                fbKey : key,
                text : dontItems[key],
                checked : false
            }
        });

        this.dontEntries.unshift({ items : newDontEntries, saveDateStr : dateObj.dateStrP, saveDate : dateObj.jsTime});

    }

    UpdateLastEntry(){
        // Save current last entries
        const lastDoEntries = this.doEntries[0].items;
        const lastDontEntries = this.dontEntries[0].items;

        // Delete last entries
        this.doEntries.shift();
        this.dontEntries.shift();

        const dateObj = utils.getDateObj();

        // Enter new empty entries
        this.AddNewEntry(this.doItems, this.dontItems, dateObj);

        // Yeni do girişleri eskilerle eşle
        lastDoEntries.forEach((entry) => {
            const curDoEntries = this.doEntries[0].items;
            const idx = curDoEntries.findIndex(e => e.fbKey === entry.fbKey);
            if (idx != -1){
                this.doEntries[0].items[idx].checked = entry.checked;
            }
        });

        // Yeni dont girişleri eskilerle eşle
        lastDontEntries.forEach((entry) => {
            const curDontEntries = this.dontEntries[0].items;
            const idx = curDontEntries.findIndex(e => e.fbKey === entry.fbKey);
            if (idx != -1){
                this.dontEntries[0].items[idx].checked = entry.checked;
            }
        });

        this.SaveNewEntry(this.doEntries[0].items, this.dontEntries[0].items, dateObj);

        localStorage.ListUpdated = false;

    }

    GetListData() {
        const that = this;

        return new Promise(function(resolve, reject) {
            api.getEntries(that.userName)
                .then((result) => {
                    if (result) {

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
                                    saveDateStr : entry.saveDateStr,
                                    saveDate : entry.saveDate
                                }
                            });

                            that.dontEntries = entriesArray.map((entry) => {
                                return {
                                    items : entry.donts,
                                    saveDateStr : entry.saveDateStr,
                                    saveDate : entry.saveDate
                                }
                            });
                            // Burada listeyi oluşturan kodları backende çek...

                            // console.log(that.doEntries);

                            if (that.doEntries[0].saveDateStr !== dateObj.dateStrP) {
                                that.AddNewEntry(that.doItems, that.dontItems, dateObj);
                                that.SaveNewEntry(that.doEntries[0].items, that.dontEntries[0].items, dateObj);
                            }

                            localStorage.setItem("does", JSON.stringify(that.doEntries));
                            localStorage.setItem("donts", JSON.stringify(that.dontEntries));

                            // Kullanıcı do ya da dont listesinde herhangi bir değişiklik yapmış ise
                            const ListUpdated = localStorage.getItem("ListUpdated");

                            if (ListUpdated=="true"){
                                that.UpdateLastEntry(); // Son girişleri güncelle...
                            }

                            resolve(true);

                        } else { // hiç giriş yok ise
                            that.AddNewEntry(that.doItems, that.dontItems, dateObj);
                            that.SaveNewEntry(that.doEntries[0].items, that.dontEntries[0].items, dateObj);
                            resolve(true);
                        }

                    } else {
                        resolve(false);
                    }
                });

        });
    }

    componentDidMount(){
        this.GetListData()
            .then((hasData) => {
                if (hasData) {
                    this.setState({listDataLoaded : true});
                } else {
                    this.props.router.push('/list-ops');
                }
            });
    }

    handleDateChange(newDateStr){
        this.setState({dateStr : newDateStr});
    }

    render() {

        const {MainDivStyle} = Styles;
        const tabs = [
          {
              label:"DO",
              content: <ListContainer
                              user={this.user}
                              listItems = {this.doItems}
                              entries = {this.doEntries}
                              containerType = {"does"}
                              onDateChange = {this.handleDateChange.bind(this)}
                      ></ListContainer>
          },
          {
              label:"DONT",
              content :  <ListContainer
                          user={this.user}
                          listItems = {this.dontItems}
                          entries = {this.dontEntries}
                          containerType = {"donts"}
                          onDateChange = {this.handleDateChange.bind(this)}
                      ></ListContainer>
          },
        ]

        const renderTabs = () => {
            if (this.state.listDataLoaded) {
                return <Tabs tabs={tabs} activeTab="DO"/>
            } else {
                return <h3 style={{fontSize : utils.hUnit(3), color : "#f7f7f7"}}>Veriler alınırken lütfen bekleyiniz</h3>
            }
        }

        return(
            <div>
                <Navbar ActivePage={"MainPage"}
                    router={this.props.router}
                    OnLogOut={this.OnLogOut}
                />
                <div style={MainDivStyle}>
                    <DateDisplay dateStr={this.state.dateStr}/>
                    {renderTabs()}
                </div>
            </div>
        );

    }

}

const Styles = {
    MainDivStyle : {
        background : "#314247",
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
