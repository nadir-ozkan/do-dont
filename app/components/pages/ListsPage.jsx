import React from 'react';
import ListContainer from '../do-dont/ListContainer.jsx';
import utils from '../../Utils/utils.js';

class ListsPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
        }
        this.user = null;
    }

    render(){
        const {MainDivStyle, PageTitleStyle} = Styles;
        this.user = this.props.route.user;
    return(
        <div style={MainDivStyle}>
            <h1 style={PageTitleStyle}>{this.props.route.pageTitle}</h1>
            <ListContainer user={this.user}></ListContainer>
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
    },
    PageTitleStyle : {
        textAlign : "center"
    }
}

export default ListsPage;
