import React from 'react';

import utils from '../../Utils/utils.js';

class PercentDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          percent : props.percent || 0
        }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.percent != this.state.percent) {
        this.setState({
          percent : nextProps.percent
        });
      }
    }

    render(){
        let {PercentStyle, NoClick, PercentBarStyle} = Styles;
        const percentBarStyle = utils.mergeObjects(PercentBarStyle, {width : this.state.percent + "%"});
        return(
            <div style={PercentStyle}>
              % {this.state.percent}
              <div style={percentBarStyle}> </div>
            </div>
        );
    }
}

const Styles = {
    PercentBarStyle : {
        position : "absolute",
        width : "0%",
        // background : "linear-gradient(90deg, rgba(248,219,219,1) 35%, rgba(210,80,122,1) 100%)",
        background : "#d8809d",
        zIndex : -1,
        top :"0",
        left : "0",
        height : utils.hUnit(4),
        borderRadius : utils.hUnit(2)
    },
    NoClick : {
      pointerEvents: "none",
      opacity: "0.65"
    },
    PercentStyle :{
      position : "relative",
      textAlign : "center",
      zIndex : 1,
      height : utils.hUnit(4),
      padding : utils.hUnit(0.5),
      margin : utils.hUnit(1.5) + " 0",
      fontSize : utils.hUnit(3),
      color : "#f7f7f7"
    }
}

export default PercentDisplay;
