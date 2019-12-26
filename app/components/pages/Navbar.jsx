import React from 'react';

import utils from '../../Utils/utils.js';

const MenuItem = ( {Title, IsActiveItem, OnClick}) => {
    const {MenuItemStyle, ActiveItemStyle} = Styles;
    const itemStyle = IsActiveItem ? utils.mergeObjects(MenuItemStyle, ActiveItemStyle) : MenuItemStyle;
    const HandleClick = () => {
        if(OnClick){
            OnClick(Title);
        }
    }
    return (
        <span style={itemStyle} onClick={HandleClick}>{Title}</span>
    )
}

class Navbar extends React.Component{

    handleClick(item) {
        if (item) {
            switch (item) {
                case "Ana Sayfa":
                    this.props.router.push('/');
                    break;
                case "Listeler":
                    this.props.router.push('/list-ops');
                    break;
                case "Çıkış":
                    const cevap = confirm("Çıkış yapmak istediğinizden emein misiniz?");
                    if (cevap) {
                        this.props.router.push('/');
                        if (this.props.OnLogOut) {
                            this.props.OnLogOut();
                        }
                    }
                    break;
                default:
                    return;
            }
        }
    }

    render(){
        const {MainDivStyle, LeftButtonsStyle, SignOutButtonStyle, MenuItemStyle } = Styles;
        const MainPageActive = this.props.ActivePage == "MainPage";
        const ListOpsPageActive = this.props.ActivePage == "ListOps";

        return(
          <div id="Nav-MainDiv" style={MainDivStyle}>
            <div style={LeftButtonsStyle}>
                <MenuItem Title={"Ana Sayfa"} IsActiveItem={MainPageActive} OnClick={this.handleClick.bind(this)}/>
                <MenuItem Title={"Listeler"} IsActiveItem={ListOpsPageActive} OnClick={this.handleClick.bind(this)}/>
            </div>
            <div style={SignOutButtonStyle}>
                <MenuItem Title={"Çıkış"} OnClick={this.handleClick.bind(this)}/>
            </div>
          </div>
        );
    }
}

const Styles = {
    MainDivStyle : {
        display : "flex",
        height : utils.hUnit(6),
        lineHeight : utils.hUnit(6),
        fontSize : utils.hUnit(2.7),
        background : "gold",
        padding : "0 10px"
    },
    LeftButtonsStyle : {
        flex : "2",
    },
    SignOutButtonStyle : {
        flex : "1",
        display : "flex",
        justifyContent : "flex-end"
    },
    MenuItemStyle : {
        padding : "0 10px",
        display : "inline-block",
        cursor : "pointer"
    },
    ActiveItemStyle :  {
        background : "crimson"
    }
}

export default Navbar;
