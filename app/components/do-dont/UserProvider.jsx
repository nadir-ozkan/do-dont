import React from 'react';

import utils from '../../Utils/utils.js';

class UserProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          user : props.user || null
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {
        console.log("willMount : " +  new Date().getTime());
    }

    componentDidMount(){
        console.log("didMount : " + new Date().getTime());
        setTimeout(() => {
            this.setState({
                user : {name : "Nadir"}
            });
        }, 3000);

    }

    render(){

        if (this.state.user) {
            return(
              this.props.children
            );
        } else {
          return (
              <div>No, no, no, no!!!</div>
          );
        }

    }
}

export default UserProvider;
