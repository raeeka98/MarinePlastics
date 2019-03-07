import React, { Component } from 'react';

const RibScanCell = (props) => {
  return(
    <div className="uk-grid uk-child-width-1-2">
      <div>
          <input
            type="number"
            min="0"
            id={props.id + "__fresh__" + props.ribNumber}
            className="uk-input"
            defaultValue={props.data[props.id + "__weathered__" + props.ribNumber]}
            onChange={props.updateSRS}
          />
      </div>
      <div>
          <input
            type="number"
            min="0"
            id={props.id + "__weathered__" + props.ribNumber}
            defaultValue={props.data[props.id + "__weathered__" + props.ribNumber]}
            className="uk-input"
            onChange={props.updateSRS}
            />
      </div>
    </div>
  )
}



class RibScanRow extends Component {

    render() {
      return(
        <div className="uk-grid uk-child-width-1-5">
            <div>
                <h5>{this.props.name}</h5>
            </div>
            <div>
                <RibScanCell
                  ribNumber='1'
                  id={this.props.id}
                  data={this.props.data}
                  updateSRS={this.props.updateSRS}
                  />
            </div>
            <div>
              <RibScanCell
                ribNumber='2'
                id={this.props.id}
                data={this.props.data}
                updateSRS={this.props.updateSRS}
                />
            </div>
            <div>
              <RibScanCell
                ribNumber='3'
                id={this.props.id}
                data={this.props.data}
                updateSRS={this.props.updateSRS}
                />
            </div>
            <div>
              <RibScanCell
                ribNumber='4'
                id={this.props.id}
                data={this.props.data}
                updateSRS={this.props.updateSRS}
                />
            </div>
        </div>
      );
    }
}

export default RibScanRow;
