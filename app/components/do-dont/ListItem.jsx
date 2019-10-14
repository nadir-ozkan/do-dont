import React from 'react';

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
            height : "1.4em",
            cursor : "pointer",
            lineHeight : "1.4em"
        }

        if (this.state.checked) {
            ItemStyle.background = "green";
        }

        return(
            <div style={ItemStyle} onClick={this.handleClick.bind(this)}>
                <input type="checkbox"
                    value = {this.props.text}
                    defaultChecked={this.state.checked}
                />
                <span>{this.props.text}</span>
            </div>
        );
    }
}

export default ListItem;