import React from 'react';
import Navbar from './Navbar.jsx';

class Main extends React.Component {
  render(){
    const componentName = this.props;
    return(
      <div>
        <div className="row">
          {/* small-centered will scale up to every screen width. */}
          <div className="columns medium-8 large-6 small-centered">
            {/* Router tarafından gelen bileşen aşağıda görüntülenecek. */}
            {this.props.children}
          </div>
        </div>

      </div>
    );
  }
}

export default Main;
