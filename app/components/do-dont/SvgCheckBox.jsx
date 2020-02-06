import React from 'react';

class SvgCheckBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked : props.checked || false,
            checkColor : props.checkColor || "black",
            boxColor : props.boxColor || "black",
            backgroundColor : props.backgroundColor || "transparent",
            height : props.height ? parseInt(props.height, 10) : 24
        }
    }

    handleClick(e) {
        this.setState({checked : !this.state.checked},
            () => {
                if (this.props.OnChange) {
                    this.props.OnChange(this.state.checked);
                }
            }
        );
    }

    render(){

        const {checkColor, boxColor, backgroundColor, height} = this.state;
        const tickHeight = height - (height/6);
        const tickLeft = height/12;
        const paddingTop = height/12;
        const tickTop = height/6;

        const innerDivStyle = {
            position : "relative",
            display : "inline-block",
            paddingTop : paddingTop + "px",
            background : backgroundColor
        }

        return(
            <div onClick={this.handleClick.bind(this)} style = {{width : "0px"}}>

                <div style={innerDivStyle}>
                    <svg fill={boxColor} xmlns="http://www.w3.org/2000/svg" width={height} height={height} viewBox="0 0 24 24">
                        <path d="M21,2H3A1,1,0,0,0,2,3V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2ZM20,20H4V4H20Z"/>
                    </svg>
                    {
                        this.state.checked ?
                        <svg
                            xmlns="http://www.w3.org/2000/svg" fill={checkColor}
                            width={tickHeight} height={tickHeight} viewBox="0 0 24 24"
                            style={{position : "absolute", left : tickLeft, top : tickTop}}
                        >
                            <path fill="none" d="M0 0h24v24H0V0z"/>
                            <path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"/>
                        </svg>
                        : null
                    }
                </div>

            </div>
        );
    }
}

export default SvgCheckBox;
