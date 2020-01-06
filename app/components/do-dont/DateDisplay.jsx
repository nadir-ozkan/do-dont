import React from 'react';

import utils from '../../Utils/utils.js';

class DateDisplay extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div style={Styles.DateStyle}>{this.props.dateStr}</div>
        );
    }
}

const Styles = {
    DateStyle : {
        margin : "5px auto",
        textAlign : "center",
        padding : "5px",
        fontSize : utils.hUnit(3),
        borderBottom : "solid 8px #d8809d",
        color : "#f7f7f7"
    }
}

export default DateDisplay;
