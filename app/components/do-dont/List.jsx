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
        this.setState({items : nextProps.items});
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
        const refStr = "users/Ayca/list1/items/entries/" + utils.getDateObj().dateStr;
        // const refStr = "users/Ayca/list1/items/entries/05_09_2019";
        const dateObj = utils.getDateObj();

        fbRef.child(refStr)
            .set(
                {
                    does : this.state.items,
                    doesPercent : this.percentage,
                    donts : this.state.items, // buraya donts listesi gelecek
                    dontsPercent : this.percentage, // buraya donts yüzdesi gelecek                
                    saveDate : dateObj.jsTime,
                    saveDateStr : dateObj.dateStrP
                }
            )
            .then(()=> {
                console.log("Kayıt işlemi başarıyla yapıldı...");
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
        const {PercentStyle} = Styles;
        this.percentage = this.calculatePercentage();
        return(
            <div>
                {this.renderList()}
                <div style={PercentStyle}> % {this.percentage} </div>
            </div>
        );
  }
}

const Styles = {
    PercentStyle : {
        textAlign : "center",
        margin : "10px auto", 
        fontSize : "24px"
    }
}

export default List;
