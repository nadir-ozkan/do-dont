"use strict";

import React from 'react';
import utils from '../../Utils/utils.js';

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isVisible : props.isVisible || false
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.isVisible != this.state.isVisible){
            this.setState({isVisible : nextProps.isVisible});
        }
    }

    render(){
        const {OverlayStyle} = Styles;
        return(
            this.state.isVisible
            ?   <div style = {OverlayStyle} onClick={() => {this.setState({isVisible:false})}}>
                    {this.props.children}
                </div>
            :   null
        );
    }
}

const Styles = {
    OverlayStyle : {
        position: "fixed", /* Sit on top of the page content */
        width:"100%", /* Full width (cover the whole page) */
        height:"100%", /* Full height (cover the whole page) */
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,128,0,0.65)", /* Black background with opacity */
        zIndex: 1,
        display : "flex",
        alignItems  : "center",
        justifyContent : "center"
    }
}

export default Modal;
