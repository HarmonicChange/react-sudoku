import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: new Array(9).fill(0).map(() => new Array(9).fill(0))
    }
  }

  render() {
    const {squares} = this.state;
    return (
      <div>
      {
        squares.map((value1, index1) => {
          return (
            <div key={index1} className="row">
            {
              value1.map((value2, index2) => {
                return <Square key={"" + index1 + index2} value={squares[index1][index2]} />
              })
            }
            </div>
          );
        })
      }
      </div>
    );
  }
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {locked: false};
  }

  render() {
    return (
      <input
        className="square"
        type="number"
        value={this.props.value !== 0 ? this.props.value : ""}
        onChange={this.handleChange}
      />
    );
  }

  handleChange() {
    if(this.state.locked !== false) {
      //TODO: Update state in parent
    }
  }
}

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
