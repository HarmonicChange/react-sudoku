import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board.js'

const apiEndpoint = "http://localhost:3000"
fetch(apiEndpoint)
    .then(response => response.json())
    .then((json) => {
        // Easy puzzle to test completion
        /*ReactDOM.render(
            <Board puzzleId={0} squares={   
              [[0,3,5,4,1,6,9,2,7],
              [2,9,6,8,5,7,4,3,1],
              [4,1,7,2,9,3,6,5,8],
              [5,6,9,1,3,4,7,8,2],
              [1,2,3,6,7,8,5,4,9],
              [7,4,8,5,2,9,1,6,3],
              [6,5,2,7,8,1,3,9,4],
              [9,8,1,3,4,5,2,7,6],
              [3,7,4,9,6,2,8,1,5]] }/>,
              document.getElementById('root')
          ); */

        ReactDOM.render(
            <Board puzzleId={json.puzzle_id} squares={convertTo2DArray(json.puzzle)}/>,
              document.getElementById('root')
        );
    })
    .catch(() => {
        console.log("Error occurred getting the puzzle from the api")
    })

function convertTo2DArray(puzzleString) {
    var puzzle2DArray = new Array(9).fill(0).map(() => Array(9).fill(0))
    for(var i = 0; i < puzzleString.length; i++) {
        var row = Math.floor(i/9)
        var col = i - (9*row)
        puzzle2DArray[row][col] = parseInt(puzzleString.charAt(i))
    }
    return puzzle2DArray
}