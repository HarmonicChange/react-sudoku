import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends React.Component {
  constructor(props) {
    super(props);

    var lockedArr = props.squares.map((el1, ind1) => el1.map((el2, ind2) => {
      if(props.squares[ind1][ind2] === 0) {
        return false;
      } else {
        return true;
      }
    }))

    this.state = {
      squares: props.squares,
      locked: lockedArr
      //TODO: Add an "answers" array here?
    }
  }

  render() {
    const {squares, locked} = this.state;
    return (
      <table><tbody>
      {
        squares.map((value1, index1) => {
          return (
            <tr key={index1} className="row">
            {
              value1.map((value2, index2) => {
                return <Square
                  key={"" + index1 + index2}
                  value={squares[index1][index2]}
                  onChange={(e) => this.handleChange(index1, index2, e)}
                  locked={locked[index1][index2]}
                />
              })
            }
            </tr>
          );
        })
      }
      </tbody></table>
    );
  }

  handleChange (i, j, event) {
    const {squares} = this.state;
    const newState = new Array(9).fill(0).map(() => new Array(9).fill(0))
    squares.forEach((elem1, ind1) => elem1.forEach((elem2, ind2) => {
      if(ind1 === i && ind2 === j) {
        if(event.target.value.length === 0) {
          newState[ind1][ind2] = 0;
        } else {
          newState[ind1][ind2] = parseInt(event.target.value);
        }
      } else {
        newState[ind1][ind2] = elem2;
      }
    }))
    this.setState({squares: newState});
  }
}

class Square extends React.Component {
  render() {
    return (
      <td>
        <input
          className="square"
          onChange={this.props.onChange}
          style={{color: (this.props.locked) ? "gray" : "black"}}
          value={this.props.value === 0 ? "" : this.props.value}
          />
      </td>
    );
  }
}

ReactDOM.render(
  <Board squares={ [[ 0, 0, 4,   0, 0, 0,   0, 6, 7 ],
                    [ 3, 0, 0,   4, 7, 0,   0, 0, 5 ],
                    [ 1, 5, 0,   8, 2, 0,   0, 0, 3 ],

                    [ 0, 0, 6,   0, 0, 0,   0, 3, 1 ],
                    [ 8, 0, 2,   1, 0, 5,   6, 0, 4 ],
                    [ 4, 1, 0,   0, 0, 0,   9, 0, 0 ],

                    [ 7, 0, 0,   0, 8, 0,   0, 4, 6 ],
                    [ 6, 0, 0,   0, 1, 2,   0, 0, 0 ],
                    [ 9, 3, 0,   0, 0, 0,   7, 1, 0 ]] }/>,
  document.getElementById('root')
);
