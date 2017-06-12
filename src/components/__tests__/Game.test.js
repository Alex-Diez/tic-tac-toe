import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Game from '../Game';

describe("Tic Tac Toe game", () => {
    let game;
    let squares;

    beforeEach(() => {
        game = ReactTestUtils.renderIntoDocument(
            <Game />
        );

        squares = ReactTestUtils.scryRenderedDOMComponentsWithClass(game, 'square');
    });

    function currentPlayer() {
        return ReactTestUtils.findRenderedDOMComponentWithClass(game, 'player-info').textContent;
    }

    function clickOnSquare(col, row) {
        ReactTestUtils.Simulate.click(squares[col * 3 + row]);
    }

    function signOfSquare(col, row) {
        return squares[col * 3 + row].textContent;
    }

    function gameResult() {
        return ReactTestUtils.findRenderedDOMComponentWithClass(game, 'game-result').textContent;
    }

    test("by default game has 9 squares", () => {
        expect(squares.length).toBe(9);
        expect(squares.map((square) => square.textContent)).toEqual(new Array(9).fill(''));
    });

    test("the first player is always 'X'", () => {
        expect(currentPlayer()).toBe('Current player: X');
    });

    test("the next player is 'O' when 'X' made a move", () => {
        clickOnSquare(0, 0);

        expect(currentPlayer()).toBe('Current player: O');
    });

    test("the next player is 'X' when 'O' made a move", () => {
        clickOnSquare(0, 0);
        clickOnSquare(0, 1);

        expect(currentPlayer()).toBe('Current player: X');
    });

    test("square is filled by player sign when clicked", () => {
        clickOnSquare(0, 0);
        expect(signOfSquare(0, 0)).toBe('X');

        clickOnSquare(0, 1);
        expect(signOfSquare(0, 1)).toBe('O');
    });

    test("reset game with button click", () => {
        clickOnSquare(0, 0);
        clickOnSquare(0, 1);
        clickOnSquare(1, 0);
        clickOnSquare(1, 1);
        clickOnSquare(2, 0);

        const resetButton = ReactTestUtils.findRenderedDOMComponentWithClass(game, 'reset-button');
        ReactTestUtils.Simulate.click(resetButton);

        expect(gameResult()).toBe('The winner:  ');
        expect(squares.map((square) => square.text))
    });

    test("square can not be checked again", () => {
        clickOnSquare(0, 0);

        expect(signOfSquare(0, 0)).toBe('X');
        expect(currentPlayer()).toBe('Current player: O');

        clickOnSquare(0, 0);

        expect(signOfSquare(0, 0)).toBe('X');
        expect(currentPlayer()).toBe('Current player: O');
    });

    test("game is finished when winner is calculated", () => {
        clickOnSquare(0, 0);
        clickOnSquare(0, 1);
        clickOnSquare(1, 0);
        clickOnSquare(1, 1);
        clickOnSquare(2, 0);

        expect(gameResult()).toBe('The winner: X');

        clickOnSquare(2, 1);
        expect(signOfSquare(2, 1)).toBe('');
    });

    describe("calculate the winner", () => {
        test("leftmost col", () => {
            clickOnSquare(0, 0);
            clickOnSquare(0, 1);
            clickOnSquare(1, 0);
            clickOnSquare(1, 1);
            clickOnSquare(2, 0);

            expect(gameResult()).toBe('The winner: X');
        });

        test("center col", () => {
            clickOnSquare(0, 0);
            clickOnSquare(0, 1);
            clickOnSquare(1, 0);
            clickOnSquare(1, 1);
            clickOnSquare(0, 2);
            clickOnSquare(2, 1);

            expect(gameResult()).toBe('The winner: O');
        });

        test("rightmost col", () => {
            clickOnSquare(0, 2);
            clickOnSquare(0, 1);
            clickOnSquare(1, 2);
            clickOnSquare(1, 1);
            clickOnSquare(2, 2);

            expect(gameResult()).toBe('The winner: X');
        });

        test("uppermost row", () => {
            clickOnSquare(0, 0);
            clickOnSquare(1, 0);
            clickOnSquare(0, 1);
            clickOnSquare(1, 1);
            clickOnSquare(0, 2);

            expect(gameResult()).toBe('The winner: X');
        });

        test("center row", () => {
            clickOnSquare(1, 0);
            clickOnSquare(0, 0);
            clickOnSquare(1, 1);
            clickOnSquare(0, 1);
            clickOnSquare(1, 2);

            expect(gameResult()).toBe('The winner: X');
        });

        test("lowermost row", () => {
            clickOnSquare(2, 0);
            clickOnSquare(1, 0);
            clickOnSquare(2, 1);
            clickOnSquare(1, 1);
            clickOnSquare(2, 2);

            expect(gameResult()).toBe('The winner: X');
        });

        test("main diagonal", () => {
            clickOnSquare(0, 0);
            clickOnSquare(0, 1);
            clickOnSquare(1, 1);
            clickOnSquare(1, 2);
            clickOnSquare(2, 2);

            expect(gameResult()).toBe('The winner: X');
        });

        test("secondary diagonal", () => {
            clickOnSquare(0, 2);
            clickOnSquare(0, 1);
            clickOnSquare(1, 1);
            clickOnSquare(1, 2);
            clickOnSquare(2, 0);

            expect(gameResult()).toBe('The winner: X');
        });
    });
});
