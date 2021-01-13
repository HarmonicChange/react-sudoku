import React, { useState } from 'react'
import Square from './Square'

function Board(props) {
    //props:
    //  squares - a 2d array of numbers representing the starting state of the puzzle

    var lockedArr = props.squares.map((value1) => {
        return value1.map((value2) => {
            if (value2 === 0) {
                return false;
            } else {
                return true;
            }
        });
    })

    const [puzzle, setPuzzle] = useState(props.squares)
    const [locked, setLocked] = useState(lockedArr)

    const onChange = (index1, index2) => {
        return (event) => {
            if (/[1-9]{1}/.test(event.target.value) || event.target.value.length === 0) {
                var newPuzzle = puzzle.map((el1, i1) => {
                    return el1.map((el2, i2) => {
                        if (index1 === i1 && index2 === i2) {
                            return event.target.value
                        } else {
                            return el2
                        }
                    })
                })
                setPuzzle(newPuzzle)
            }
            //TODO: Add something with checkComplete here. When puzzle is completed, show win text
        }
    }

    const checkComplete = () => {
        //Check whether there are incomplete squares first since this is most common
        for(var i = 0; i < puzzle.length; i++) {
            for(var j = 0; j < puzzle[i].length; j++) {
                if(puzzle[i][j] === 0) {
                    return false
                }
            }
        }

        //Check rows for duplicates
        for(var i = 0; i < puzzle.length; i++) {
            for(var j = 0; j < puzzle[i].length; j++) {
                var setOfNums = new Set()
                setOfNums.add(puzzle[i][j])
            }
            if(setOfNums.size < 9) {
                return false
            }
        }

        //Check columns for duplicates
        for(var i = 0; i < puzzle.length; i++) {
            for(var j = 0; j < puzzle[i].length; j++) {
                var setOfNums = new Set()
                setOfNums.add(puzzle[j][i])
            }
            if(setOfNums.size < 9) {
                return false
            }
        }

        //TODO: Check 3x3 squares for duplicates

        //Passed all checks
        return true
    }

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
                                        onChange={onChange(index1, index2)}
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

export default Board;