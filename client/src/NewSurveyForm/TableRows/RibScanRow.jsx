import React, { Component } from 'react';

const RibScanCell = (props) => {
  return(
    <div className="uk-grid uk-child-width-1-2">
      <div>
          <input
            type="number"
            min="0"
            id={props.id + "-fresh-rib-" + props.ribNumber}
            className="uk-input"
          />
      </div>
      <div>
          <input
            type="number"
            min="0"
            id={props.id + "-weathered-rib-" + props.ribNumber}
            className="uk-input"
            />
      </div>
    </div>
  )
}



class RibScanRow extends Component {
    constructor(props) {
      super(props);
    }

    render() {

      let numberBoxes = [];
      for(let i=1; i<=4; i++){
          numberBoxes.push(

          );
      }
      return(
        <div className="uk-grid uk-child-width-1-5">
            <div>
                <h5>{this.props.name}</h5>
            </div>
            <div><RibScanCell ribNumber='1' id={this.props.id}/></div>
            <div><RibScanCell ribNumber='2' id={this.props.id}/></div>
            <div><RibScanCell ribNumber='3' id={this.props.id}/></div>
            <div><RibScanCell ribNumber='4' id={this.props.id}/></div>
        </div>
      );
    }
}

export default RibScanRow;
