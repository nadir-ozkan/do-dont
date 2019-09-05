import React from 'react';
import firebase, {fbRef, githubProvider} from '../../firebase/index.js';
import utils from '../../Utils/utils.js';

import List from "./List.jsx";

class ListContainer extends React.Component{
    render(){
        const {DateStyle} = Styles;
        return (
            <div>
                <div style={DateStyle}>{utils.getDateObj().dateStrP}</div>
                <List items={null}></List>
            </div>
        )
        
    }
}

const Styles = {
    DateStyle : {
        margin : "5px auto",
        textAlign : "center",
        background : "cornflowerblue",
        padding : "5px",
    }
}

export default ListContainer;