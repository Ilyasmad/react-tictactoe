import React, { Component } from 'react';
import './App.css';
import Player from './components/choosePlayer'

class App extends Component {

  state = {
    board: Array(9).fill(null),
    player: null,
    winner: null
  }

  handleClick = (index) => {
    if (this.state.player && !this.state.winner) {
      let newBoard = this.state.board;

      if (!this.state.board[index]) {
        newBoard[index] = this.state.player;
        this.setState({
          board: newBoard,
          player: this.state.player === "X" ? "O" : "X"
        });
      };
      this.checkWinner();
    }
  }
  checkWinner = () => {
    let winLines =
    [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["0", "4", "8"],
      ["2", "4", "6"]
    ];

    for (let i=0; i<winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (this.state.board[a] && this.state.board[a] === this.state.board[b] && this.state.board[a] === this.state.board[c]) {
        alert('You Won!');
        this.setState({
          winner: this.state.player
        })
      }
    }
  }
  setPlayer = (player) => {
    this.setState({
      player
    })
  }
  handleReset = () => {
    this.setState({
      board: Array(9).fill(null),
      player: null,
      winner: null,
    })
  }

  render() {

    const box = this.state.board.map(
      (box, index) => <div className="box" onClick={() => this.handleClick(index)} key={index}>{box}</div>);
    let status = this.state.winner ? <div> <h2>Winner is {this.state.winner} </h2> <button onClick={() => this.handleReset()}>Reset</button> </div>
      : this.state.player ? <h2>Next player is {this.state.player}</h2>
        : <Player player={(e) => this.setPlayer(e)}/>;

    return (
      <div className="App">
        <h1>Tic Tac Toe</h1>
          {status}
        <div className="board">
          {box}
        </div>
      </div>
    )
  }

}

export default App;
