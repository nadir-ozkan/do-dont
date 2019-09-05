import React from 'react';
import firebase, {fbRef, githubProvider} from '../../firebase/index.js';
import utils from '../../Utils/utils.js';

import List from "./List.jsx";

class ListContainer extends React.Component{
    render(){
        const {DateStyle, ButtonsDivStyle} = Styles;
        return (
            <div>
                <div style={DateStyle}>{utils.getDateObj().dateStrP}</div>
                <List items={null}></List>
                <div style={ButtonsDivStyle}>
                    <button id="prevButton">Prev</button>
                    {/* <button id="todayButton">Today</button> */}
                    <button id="nextButton">Next</button>            
                </div>
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
    },
    ButtonsDivStyle : {
        display : "flex",
        justifyContent :"space-between"
    }
}

export default ListContainer;