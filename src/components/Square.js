import React from 'react'

function Square(props) {
    //props:
    //  locked - boolean that indicates whether this is a given number in the puzzle
    //  onChange - function that handles when the number changes
    //  value - number that indicates the number filled in, 0 being blank
    
    return (
      <td style={{backgroundColor: (props.locked) ? "lightgray" : "white"}}>
      <input
        className="square"
        onChange={props.onChange}
        value={props.value === 0 ? "" : props.value}
        readOnly={props.locked}
        />
      </td>
    );
}

export default Square;