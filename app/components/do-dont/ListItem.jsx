import React from 'react';

import utils from '../../Utils/utils.js';

class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked : props.checked
        }
    }

    handleClick(e){
        const newCheckState = !this.state.checked;
        this.setState({
            checked : newCheckState
        });
        if (this.props.onCheckedChange){
            this.props.onCheckedChange(this.props.fbKey, newCheckState);
        }
    }

    render(){

        const ItemStyle = {
            marginBottom : "5px",
            marginTop : "5px",
            height : utils.hUnit(4.5),
            cursor : "pointer",
            fontSize : utils.hUnit(3.1),
            display : "flex",
            alignItems : "center",
            color : "#f7f7f7"
        }

        const LabelStyle = {};

        const CheckboxStyle = {
            height : utils.hUnit(3.1),
            width : utils.hUnit(3.1),
            marginLeft : utils.hUnit(0.5),
            marginRight : utils.hUnit(0.5)
        }

        if (this.state.checked) {
            // ItemStyle.background = "green";
            LabelStyle.color = "#848383";
            LabelStyle.textDecoration = "line-through";
        }

        return(
            <div style={ItemStyle} onClick={this.handleClick.bind(this)}>
                <input type="checkbox"
                    value = {this.props.text}
                    defaultChecked={this.state.checked}
                    style = {CheckboxStyle}
                />
                <span style={LabelStyle}>{this.props.text}</span>
            </div>
        );
    }
}

export default ListItem;
