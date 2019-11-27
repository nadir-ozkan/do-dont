import React from 'react';

class CheckItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked : props.checked
        }
    }

    handleClick(e){

    }

    render(){

        const renderInput(){
            return "Buraya text veya label gelecek!";
        }

        const renderButtons() {
            return "Burada düğmeler olacak.";
        }

        return(
            <div onClick={this.handleClick.bind(this)}>
                <div>{renderInput()}</div>
                <div>{renderButtons()}</div>
            </div>
        );
    }
}

export default CheckItem;
