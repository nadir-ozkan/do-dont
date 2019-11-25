import React from 'react';

import firebase, {fbRef, getData} from '../../firebase/index.js';
import utils from '../../Utils/utils.js';

import ListContainer from '../do-dont/ListContainer.jsx';
import Tabs from '../do-dont/Tabs.jsx';

class ListsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            listDataLoaded : false
        }

        this.user = props.route.user;

        this.doItems = [];
        this.dontItems = [];
        this.doEntries = [];
        this.dontEntries = [];
    }

    saveNewEntry(){

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

                        if (result.items.entries) {

                            let entriesArray = utils.objToArray(result.items.entries);
                            entriesArray.sort(function(a,b) {
                                return b.saveDate - a.saveDate;
                            });

                            const dateObj = utils.getDateObj();

                            // Duruma göre saveNewEntry
                            // ve verileri tekrar çağır    

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

                            console.log(that.doEntries);
                            console.log(that.dontEntries);

                            resolve();
                        }

                    }
                });
        });
    }

    componentDidMount(){
        this.getListData()
            .then(() => {
                this.setState({listDataLoaded : true});
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
                              onSaveItem = {() => {

                              }}
                      ></ListContainer>
          },
          {
              label:"Don'ts",
              content :  <ListContainer
                          user={this.user}
                          listItems = {this.dontItems}
                          entries = {this.dontEntries}
                          onSaveItem = {() => {

                          }}
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
          <div style={MainDivStyle}>
              {renderTabs()}
          </div>
        );

    }
}

const Styles = {
    MainDivStyle : {
        background : "aliceblue",
        margin : "0 auto",
        padding : "10px",
        width : "fit-content",
        fontSize : "18px",
        minWidth : "300px"
    },
    PageTitleStyle : {
        textAlign : "center"
    }
}

export default ListsPage;
