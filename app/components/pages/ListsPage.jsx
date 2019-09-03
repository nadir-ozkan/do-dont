import React from 'react';
import List from '../do-dont/List.jsx';
import utils from '../../Utils/utils.js';

class ListsPage extends React.Component {
    
    constructor(){
        super();
        this.state = {
        }
    }

    render(){
    return(
        <div style={{textAlign:"center"}}>
            <h1>{this.props.route.pageTitle}</h1>
            <div>{utils.getDateObj().dateStrP}</div>
            <List></List>
        </div>

    );
  }
}

export default ListsPage;
