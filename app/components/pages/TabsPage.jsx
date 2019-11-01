import React from 'react';
import utils from '../../Utils/utils.js';

import Tabs from '../do-dont/Tabs.jsx';

class TabsPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
      const tabs = [
        {label : "Tab1", content : <h3>Tab1 İçeriği</h3>},
        {label : "Tab2", content : <h3>Kedi</h3>},
        {label : "Tab3", content : <h3>Köpek</h3>},
        {label : "Tab4", content : <h3>Kuş</h3>},
      ]
    return(
      <Tabs activeTab="Tab2" tabs={tabs}/>
    );
  }
}

const Styles = {
    MainDivStyle : {
        background : "aliceblue",
        margin : "0 auto",
        padding : "10px",
        width : "fit-content",
        fontSize : "18px"
    },
    PageTitleStyle : {
        textAlign : "center"
    }
}

export default TabsPage;
