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
                        this.props.router.push( {pathname: '/', state : {logOut : true} } );
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
        fontSize : utils.hUnit(2.4),
        background : "#314247",
        padding : "0 10px",
        color : "#d2d2d2",
        height : "100%"
    },
    LeftButtonsStyle : {
        flex : "2",
        padding : utils.hUnit(0.8) + " 0"
    },
    SignOutButtonStyle : {
        flex : "1",
        display : "flex",
        justifyContent : "flex-end"
    },
    MenuItemStyle : {
        padding : "0 10px",
        display : "inline-block",
        cursor : "pointer",
        marginRight : "20px"
    },
    ActiveItemStyle :  {
        background : "#d8809d",
        color : "#f7f7f7",
        borderRadius: utils.hUnit(2.4),
    }
}

export default Navbar;
