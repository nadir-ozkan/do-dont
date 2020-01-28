import React from 'react';

import api from '../../api/doDontApi';
import utils from '../../Utils/utils.js';

class TotalPercent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            percent : "..."
        }
        this.checked = props.checked;
    }

    getPercent(){

        if (this.props.totalPercentage) {
            this.setState({percent : this.props.totalPercentage});
            return;
        }

        const {userName, dateStr} = this.props;
        api.calculatePercentage(userName, this.props.fbKey, this.props.containerType, dateStr)
            .then((result) => {
                this.setState({percent : result.data.percent});
            });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked != this.checked){
            this.checked = nextProps.checked;
            this.getPercent();
        }
    }

    componentDidMount(){
        this.getPercent();
    }

    render(){
        return(
            <div style={Styles.PercentStyle}>
                <i>{"(%" + this.state.percent + ")"}</i>
            </div>
        );
    }
}

const Styles = {
    PercentStyle : {
      paddingLeft : utils.hUnit(0.8),
      display : "inline-block",
      fontSize : utils.hUnit(2)
  }
}

export default TotalPercent;
