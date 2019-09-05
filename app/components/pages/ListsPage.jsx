import React from 'react';
import ListContainer from '../do-dont/ListContainer.jsx';
import utils from '../../Utils/utils.js';

class ListsPage extends React.Component {
    
    constructor(){
        super();
        this.state = {
        }
    }

    render(){
    const {MainDivStyle} = Styles;
    return(
        <div style={MainDivStyle}>
            <h1>{this.props.route.pageTitle}</h1>
            <ListContainer></ListContainer>
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
        fontSize : "18px"
    }
}

export default ListsPage;
