import React from 'react';
import firebase, {fbRef, githubProvider} from '../../firebase/index.js';
import utils from '../../Utils/utils.js';

class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked : props.checked
        }
    }

    handleClick(e){
        console.log(e.target.checked);
        this.setState({
            checked : e.target.checked
        });
        if (this.props.onCheckedChange){
            this.props.onCheckedChange(this.props.fbKey, e.target.checked);
        }
    }

    render(){
        return(
            <div>
                <input type="checkbox"
                    value = {this.props.text}
                    defaultChecked={this.state.checked}
                    onClick={this.handleClick.bind(this)}
                />
                <span>{this.props.text}</span>

            </div>
        );
    }
}

class List extends React.Component {

    constructor(){
        super();
        this.state = {
            items : []
        }

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

    objToArray(obj) {
        let arr = [];
        Object.keys(obj).forEach((key) => {
            arr.push(obj[key]);
        });
        return arr;
    }

    // Neden hepsini ayrı ayrı alıyorsun ki, hepsini bir arada alsan.

    // todo : GetEntries -> Önce LocalStorege'a bak, orada yok ise firebase veritabanından al.
    // todo : GetDoItems -> Aynı şekilde...
    // todo : GetDontItems -> Aynı şekilde...

    componentDidMount(){

        // const refStr = "users/Ayca/list1/items/entries";
        const refStr = "users/Ayca/list1";
        this.getData(refStr)
            .then((result) => {
                if (result) {

                    console.log(result);

                    let entriesArray = this.objToArray(result.items.entries);
                    entriesArray.sort(function(a,b) {
                        return b.saveDate - a.saveDate;
                    });
        
                    console.log(entriesArray);     
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

    saveList(){
        const refStr = "users/Ayca/list1/items/entries/" + utils.getDateObj().dateStr;
        // const refStr = "users/Ayca/list1/items/entries/03_09_2019";
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

    insertNewListItems(){
        const newItems = ["2 Litre su iç", "İp zıpla", "10 K yürüyüvergari", "Multivitamin al", "Omega3 ye"];
        newItems.forEach((item) => {
            const doItemsRef = "users/Ayca/list1/items/doItems";
            fbRef.child(doItemsRef)
                .push(item);
        });
    }

    renderList(){

        const {items} = this.state;

        if (items && items.length > 0) {
            return this.state.items.map((item)=>{
                return (
                    <div key={item.fbKey}>
                        <ListItem
                            {...item}
                            onCheckedChange = {this.onCheckedChange.bind(this)}
                        ></ListItem>
                    </div>
                );
            });
        } else {
            return "Yapmanız gereken hiçbirşey yok. Ne mutlu size!";
        }

    }

    render(){
        this.percentage = this.calculatePercentage();
        return(
            <div>
                {this.renderList()}
                <div style={{margin : "10px auto", fontSize : "24px"}}> % {this.percentage} </div>
            </div>
        );
  }
}

export default List;
