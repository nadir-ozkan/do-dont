import React from 'react';
import firebase, {fbRef, githubProvider} from '../../firebase/index.js';
import utils from '../../Utils/utils.js';

import ListItem from './ListItem.jsx';

class List extends React.Component {

    constructor(props){
        super(props);
        this.state = { items : [] }
        this.keyNo = 0;
    }

    componentWillReceiveProps(nextProps) {
        // Gelen listeyi sayfaya bastıktan sonra eğer liste yeni kayıt ise veritabanına da yaz.
        this.setState({items : nextProps.items}, () => {
            if (nextProps.isNewEntry) {
                this.saveList();
            }
        });

    }

    onCheckedChange(fbKey, checked) {
        let newItems = this.state.items.map((item) => {
           if (item.fbKey == fbKey) {
               item.checked = checked;
               return item
           } else {
               return item;
           }
        });
        this.setState({items : newItems}, () => {
            this.saveList();
        });
    }

    calculatePercentage(){
        const itemsCount = this.state.items.length;
        let checkedCount = 0;
        this.state.items.forEach((item) => {
            if (item.checked) {
                checkedCount++
            }
        });

        const result = parseInt(checkedCount / itemsCount * 100, 10);

        return isNaN(result) ? 0 : result;
    }

    saveList(){
        const refStr = "users/Nadir/list1/items/entries/" + utils.getDateObj().dateStr;
        // const refStr = "users/Nadir/list1/items/entries/05_09_2019";

        const dateObj = utils.getDateObj();

        const objToBeSaved = {
          does : this.state.items,
          doesPercent : this.percentage,
          donts : this.state.items, // buraya donts listesi gelecek
          dontsPercent : this.percentage, // buraya donts yüzdesi gelecek
          saveDate : dateObj.jsTime,
          saveDateStr : dateObj.dateStrP
        }

        fbRef.child(refStr)
            .set(objToBeSaved)
            .then(()=> {
                // ListContainer'daki entry dizisini güncelle...
                if(this.props.onSaveList) {
                    this.props.onSaveList(objToBeSaved);
                }
            });
    }

    renderList(){

        const {items} = this.state;

        if (items && items.length > 0) {
            return this.state.items.map((item)=>{
                return (
                    <div key={"key_" + (++this.keyNo)}>
                        <ListItem
                            {...item}
                            onCheckedChange = {this.onCheckedChange.bind(this)}
                        ></ListItem>
                    </div>
                );
            });
        } else {
            return "Liste yüklenirken lütfen bekleyiniz!";
        }

    }

    render(){
        let {PercentStyle, NoClick, PercentBarStyle} = Styles;
        this.percentage = this.calculatePercentage();
        const percentBarStyle = utils.mergeObjects(PercentBarStyle, {width : this.percentage + "%"});
        const listDivStyle = utils.isToday(this.props.dateStr) ? null : NoClick;
        return(
            <div style={listDivStyle}>
                {this.renderList()}
                <div style={PercentStyle}>
                  % {this.percentage}
                  <div style={percentBarStyle}> </div>
                </div>
            </div>
        );
  }
}

const Styles = {
    PercentBarStyle : {
        position : "absolute",
        fontSize : "24px",
        width : "0%",
        background : "gold",
        zIndex : -1,
        top :"0",
        left : "0",
        height :"27px"
    },
    NoClick : {
      pointerEvents: "none",
      opacity: "0.65"
    },
    PercentStyle :{
      position : "relative",
      textAlign : "center",
      zIndex : 1,
      height : "27px",
      padding : "5px",
      margin : "5px 0"
    }
}

export default List;
