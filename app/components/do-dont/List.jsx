import React from 'react';

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
                <span>{this.props.fbKey} - {this.props.text}</span>
                
            </div>
        );
    }
}

class List extends React.Component {
    
    constructor(){
        super();
        this.state = {
            items : [
                {
                    fbKey : "0",
                    text : "2 litre su iç",
                    checked : false
                },
                {
                    fbKey : "1",
                    text : "İp hopla",
                    checked : true
                },  
                {
                    fbKey : "2",
                    text : "10 K yürü",
                    checked : false
                },   
                {
                    fbKey : "4",
                    text : "Multivitamin al",
                    checked : false
                },    
                {
                    fbKey : "5",
                    text : "Omega 3 ye",
                    checked : false
                },                                                                                              
            ]            
        }
        
    }

    addLeadingZero(sayi) {
        sayi = "" + sayi; // metin olarak algılanmasını garantile
        return sayi.length==1 ? "0" + sayi : sayi;
    }

    getDateObj(){
        const simdi = new Date();
        const gun = this.addLeadingZero(simdi.getDate());
        const ay = this.addLeadingZero(simdi.getMonth() + 1);
        const yil = simdi.getFullYear().toString();        

        return {
            dateStr : gun + "_" + ay + "_" + yil,
            gun,
            ay, 
            yil
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
            // save items and percentage to fb
            // console.log(this.getDateObj());
            // alert(this.getDateObj().dateStr + " -> " + this.percentage);
            // this.createList();
        });
    }

    createList(){
        let lists = {
            list1 : {
                items : {
                    doItems : {
                        "0" : "2 litre su iç",
                        "1" : "İp hopla",
                        "2" : "10 K yürü",
                        "3" : "Multivitamin al",
                        "4" : "Omega 3 ye"
                        },
                    entries : {
                        "29_08_2019" : {
                            does : {
                                "0" : true,
                                "1" : false,
                                "2" : false,
                                "3" : false,
                                "4" : true
                            },
                            doesPercent : 40,
                            donts : {
                                "0" : true,
                                "1" : false
                            },
                            dontsPercent : 50
                        }
                    },
                    dontItems : {
                        
                        }
                    }
                }
            }
        
        console.log(JSON.stringify(lists));
    }
    
    calculatePercentage(){
        const itemsCount = this.state.items.length;
        let checkedCount = 0;
        this.state.items.forEach((item) => {
            if (item.checked) {
                checkedCount++
            }
        });
        return parseInt(checkedCount / itemsCount * 100, 10);
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
