import React from "react";
import Square from "./Square";

export default class Game extends React.Component {
    constructor() {
        super();

        this.state = {
            winner: ' ',
            squares: new Array(9).fill(''),
            player: 'X'
        };

        this.handle = this.handle.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    handle(e, index) {
        e.preventDefault();

        const winner = this.state.winner;
        const squares = this.state.squares;

        if (winner === ' ' && squares[index] === '') {
            const player = this.state.player;
            squares[index] = player;

            function calculateWinner() {
                const lines = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6]
                ];
                for (let i = 0; i < lines.length; i++) {
                    const [a, b, c] = lines[i];
                    if (player === squares[a] && player === squares[b] && player === squares[c]) {
                        return player;
                    }
                }
                return ' ';
            }

            this.setState({
                winner: calculateWinner(),
                squares: squares,
                player: player === 'X' ? 'O' : 'X'
            })
        }
    }

    resetGame(e) {
        e.preventDefault();

        this.setState({
            winner: ' ',
            squares: new Array(9).fill(''),
            player: 'X'
        })

    }

    render() {
        const self = this;

        function renderSquare(index) {
            return (
                <Square
                    onClick={(e) => self.handle(e, index)}
                    value={self.state.squares[index]}
                />
            )
        }

        return (
            <div className="game">
                <div className="game-board">
                    <div className="board-row">
                        {renderSquare(0)}
                        {renderSquare(1)}
                        {renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {renderSquare(3)}
                        {renderSquare(4)}
                        {renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {renderSquare(6)}
                        {renderSquare(7)}
                        {renderSquare(8)}
                    </div>
                    <div className="player-info">Current player: {this.state.player}</div>
                    <div className="game-result">The winner: {this.state.winner}</div>
                    <button
                        className="reset-button"
                        onClick={this.resetGame}
                    >
                        Reset
                    </button>
                </div>
            </div>
        )
    }
}
