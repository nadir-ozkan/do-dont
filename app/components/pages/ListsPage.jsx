import React from 'react';
import List from '../do-dont/List.jsx';

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
            <h3>This is the ListsPage</h3>
            <List></List>
        </div>

    );
  }
}

export default ListsPage;
