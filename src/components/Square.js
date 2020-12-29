import React from 'react';

export default class Square extends React.Component {
    render() {
      return (
        <td style={{backgroundColor: (this.props.locked) ? "lightgray" : (this.props.isValid) ? "white" : "red"}}>
          <input
            className="square"
            onChange={this.props.onChange}
            value={this.props.value === 0 ? "" : this.props.value}
            readOnly={this.props.locked}
            />
        </td>
      );
    }
  }