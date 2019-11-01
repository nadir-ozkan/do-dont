import React from 'react';

import ListContainer from '../do-dont/ListContainer.jsx';
import Tabs from '../do-dont/Tabs.jsx';
import utils from '../../Utils/utils.js';

class ListsPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        }
        this.user = null;
    }

    render(){

      this.user = this.props.route.user;

      const tabs = [
        {label:"Do'es", content: <ListContainer user={this.user}></ListContainer>},
        {label:"Don'ts", content :  <h3>Buraya donts gelecek </h3>},
      ]

      const {MainDivStyle, PageTitleStyle} = Styles;

      return(
        <div style={MainDivStyle}>
            <Tabs tabs={tabs} activeTab="Do'es"/>
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
        fontSize : "18px",
        minWidth : "300px"
    },
    PageTitleStyle : {
        textAlign : "center"
    }
}

export default ListsPage;
