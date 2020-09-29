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
                return <Square key={"" + index1 + index2} value={squares[index1][index2]} onChange={(e) => this.handleChange(index1, index2, e)}/>
              })
            }
            </div>
          );
        })
      }
      </div>
    );
  }

  handleChange (i, j, event) {
    const {squares} = this.state;
    const newState = new Array(9).fill(0).map(() => new Array(9).fill(0))
    squares.forEach((elem1, ind1) => elem1.forEach((elem2, ind2) => {
      if(ind1 === i && ind2 === j) {
        newState[ind1][ind2] = parseInt(event.target.value);
      } else {
        newState[ind1][ind2] = elem2;
      }
    }))
    this.setState({squares: newState});
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
        onChange={this.props.onChange}
      />
    );
  }
}

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
