"use strict";

import React from "react";

import utils from "../Utils/utils.js";

class Tab extends React.Component{
  constructor(props) {
    super(props);
  }

  handleClick(){
    if (this.props.onTabClick){
      this.props.onTabClick(this.props.label);
    }
  }

  render() {
    const {TabItemStyle, ActiveTabStyle} = Styles;
    const itemStyle = this.props.isActiveTab ? utils.mergeObjects(TabItemStyle, ActiveTabStyle) : TabItemStyle;
    return (
      <il style={itemStyle} onClick={this.handleClick.bind(this)}>
        {this.props.label}
      </il>
    );
  }
}

class Tabs extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          activeTab : props.activeTab || props.tabs[0].label,
      };
  }

  handleTabClick(label){
    this.setState({activeTab:label});
  }

  renderTabContent() {
    return this.props.tabs.filter(t => t.label == this.state.activeTab)[0].content;
  }

  render(){

    return (
      <div>
        <ul>
          {this.props.tabs.map((tab, idx) => {
            const isActiveTab = tab.label == this.state.activeTab;
            return  <Tab key={idx} isActiveTab ={isActiveTab}
                        label={tab.label}
                        onTabClick={this.handleTabClick.bind(this)}>
                    </Tab>
          })}
        </ul>
        <div>
          {this.renderTabContent()}
        </div>
      </div>

    );
  }
}

const Styles = {
  TabItemStyle : {
    display: "inline-block",
    marginBottom: "-1px",
    marginRight : "5px",
    width : "100px",
    background : "gold",
    cursor : "pointer",
    height : "50px",
    lineHeight : "50px",
    textAlign : "center"
  },
  ActiveTabStyle : {
    background : "crimson"
  }
}

export default Tabs;
