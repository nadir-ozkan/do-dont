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
                <span>{this.props.text}</span>
            </div>
        );
    }
}

export default ListItem;