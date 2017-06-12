import React from "react";

export default class Square extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {
        const value = this.props.value;
        let playerClass = '';
        if (value !== undefined) {
            playerClass = value === 'X'
                ? "player-x"
                : "player-o";
        }
        const className = "square " + playerClass;
        return (
            <button
                className={className}
                onClick={this.props.onClick}
            >
                {value}
            </button>
        )
    }
}
