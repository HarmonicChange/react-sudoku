import React from 'react';
import Square from './Square.js'

export default class Board extends React.Component {
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
      const newSquares = squares.map((el) => el.map((el2) => el2)) //deep copy squares
      const newIsValid = isValid.map((el) => el.map((el2) => el2)); //deep copy isValid
      const myUpdatedValue = parseInt(event.target.value);
  
      //take care of the new entry in newSquares
      if(!isNaN(myUpdatedValue) && myUpdatedValue <= 9 && myUpdatedValue >= 1) {
        newSquares[i][j] = myUpdatedValue
      } else {
        newSquares[i][j] = 0
      }
  
      // See whether this change has a duplicate
      if(!isNaN(myUpdatedValue)) {
        for(let row = 0; row < 8; row++) { //check entries in row
          if(row !== i && squares[row][j] === myUpdatedValue) { //found duplicate
            newIsValid[i][j] = false
          }
        }
  
        for(let col = 0; col < 8; col++) { //check column
          if(col !== j && squares[i][col] === myUpdatedValue) {
            newIsValid[i][j] = false
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
              newIsValid[i][j] = false
            }
          }
        }
      } else { //On change to no number
        newIsValid[i][j] = true
      }
  
      this.setState({
        squares: newSquares,
        isValid: newIsValid
      });
    }
  }