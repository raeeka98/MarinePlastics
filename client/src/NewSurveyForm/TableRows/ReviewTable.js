import React, {Component} from 'react';


class RibScanRowReview extends Component {

    render() {

        return(
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.fresh[0]}</td>
                <td>{this.props.weathered[0]}</td>
                <td>{this.props.fresh[1]}</td>
                <td>{this.props.weathered[1]}</td>
                <td>{this.props.fresh[2]}</td>
                <td>{this.props.weathered[2]}</td>
                <td>{this.props.fresh[3]}</td>
                <td>{this.props.weathered[3]}</td>
            </tr>
        );
    }
  }

class ASRowReview {
    
}

export default RibScanRowReview;