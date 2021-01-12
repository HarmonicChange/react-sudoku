import React, {useState} from 'react'
import Square from './Square'

function Board(props) {
  //props:
  //  squares - a 2d array of numbers representing the starting state of the puzzle

  var lockedArr = props.squares.map((value1) => {
      return value1.map((value2) => {
          if(value2 === 0) {
              return false;
          } else {
              return true;
          }
      });
  })

  const [puzzle, setPuzzle] = useState(props.squares)
  const [locked, setLocked] = useState(lockedArr)

  return (
    <React.Fragment>
    <table><tbody>
    {
      puzzle.map((value1, index1) => {
        return (
          <tr key={index1} className="row">
          {
            value1.map((value2, index2) => {
              return <Square
                key={"" + index1 + index2}
                value={puzzle[index1][index2]}
                locked={locked[index1][index2]}
                onChange={onChange}
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

function onChange() {
    
}

export default Board;