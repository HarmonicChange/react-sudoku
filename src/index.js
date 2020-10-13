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
      locked: lockedArr,
      isValid: new Array(9).fill(true).map(() => new Array(9).fill(true)) //assume starter input always valid
    }
  }

  render() {
    const {squares, locked, isValid} = this.state;
    return (
      <React.Fragment>
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
                  isValid={isValid[index1][index2]}
                />
              })
            }
            </tr>
          );
        })
      }
      </tbody></table>
      <div className="win-text"></div>
      </React.Fragment>
    );
  }

  handleChange (i, j, event) {
    const {squares, isValid} = this.state;
    const newState = new Array(9).fill(0).map(() => new Array(9).fill(0))
    const newIsValid = isValid.map((el) => el.map((el2) => el2)); //deep copy isValid
    const myUpdatedValue = parseInt(event.target.value);
    var foundDuplicate = false;

    //take care of newState
    squares.forEach((elem1, ind1) => elem1.forEach((elem2, ind2) => {
      if(ind1 === i && ind2 === j) {
        if(myUpdatedValue.length === 0) {
          newState[ind1][ind2] = 0;
        } else {
          newState[ind1][ind2] = myUpdatedValue;
        }
      } else {
        newState[ind1][ind2] = elem2;
      }
    }))

    //On a change, we only need to check whether it causes its row, col, and grid to be invalid
    for(let row = 0; row < 8; row++) { //check row
      if(row !== i && squares[row][j] === myUpdatedValue) { //found duplicate
        newIsValid[i][j] = false;
        newIsValid[row][j] = false;
        foundDuplicate = true;
      }
    }

    for(let col = 0; col < 8; col++) { //check column
      if(col !== j && squares[i][col] === myUpdatedValue) {
        newIsValid[i][j] = false;
        newIsValid[i][col] = false;
        foundDuplicate = true;
      }
    }

    //check grid
    var startX;
    var startY;

    if (i >= 0 && i <= 2) {
      startX = 0;
    } else if (i >= 3 && i <= 5) {
      startX = 3;
    } else if (i >= 6 && i <= 8) {
      startX = 6;
    }

    if (j >= 0 && j <= 2) {
      startY = 0;
    } else if (j >= 3 && j<= 5) {
      startY = 3;
    } else if (j >= 6 && j <= 8) {
      startY = 6;
    }

    for(let gridX = startX; gridX <= startX + 2; gridX++) {
      for(let gridY = startY; gridY <= startY + 2; gridY++) {
        if(i !== gridX && j !== gridY && squares[gridX][gridY] === myUpdatedValue) {
          newIsValid[i][j] = false;
          newIsValid[gridX][gridY] = false;
          foundDuplicate = true;
        }
      }
    }

    //If there are no duplicates, turn the row/col/grid validity to true
    if(squares[i][j] === false && foundDuplicate === false) {
      for(let row = 0; row < 8; row++) {
        newIsValid[row][j] = true;
      }
      for(let col = 0; col < 8; col++) {
        newIsValid[i][col] = true;
      }
      for(let gridX = startX; startX <= startX + 2; startX++) {
        for(let gridY = startY; startY <= startY + 2; startY++) {
          newIsValid[gridX][gridY] = true;
        }
      }
    }

    this.setState({
      squares: newState,
      isValid: newIsValid
    });
  }
}

class Square extends React.Component {
  render() {
    return (
      <td style={{backgroundColor: (this.props.locked) ? "lightgray" : (this.props.isValid) ? "white" : "red"}}>
        <input
          className="square"
          onChange={this.props.onChange}
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
