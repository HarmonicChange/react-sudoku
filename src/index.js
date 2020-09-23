import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: new Array(9).fill("").map(() => new Array(9).fill(""))
    }
  }

  render() {
    const {squares} = this.state;
    return (
      <div>
      {
        squares.forEach((value1, index1) => value1.forEach((value2, index2) => {
          return <Square value={squares[index1][index2]} />
        }))
      }
      </div>
    );
  }
}

class Square extends React.Component {
  render() {
    console.log("rendering square");
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
