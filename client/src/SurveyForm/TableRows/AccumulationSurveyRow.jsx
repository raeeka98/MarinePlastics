import React, { Component } from 'react';


class AccumulationSurveyRow extends Component {

    render() {
      return(
        <div className="uk-grid uk-child-width-1-3">
            <div>
                <h5>{this.props.name}</h5>
            </div>
            <div>
              <input
                type="number"
                min="0"
                id={this.props.id + "__fresh__accumulation"}
                className="uk-input"
                defaultValue={this.props.data[this.props.id + "__fresh__accumulation"]}
                onChange={this.props.updateAS}
              />
            </div>
            <div>
                <input
                  type="number"
                  min="0"
                  id={this.props.id + "__weathered__accumulation"}
                  className="uk-input"
                  defaultValue={this.props.data[this.props.id + "__weathered__accumulation"]}
                  onChange={this.props.updateAS}
                />
            </div>
        </div>
      );
    }
}

export default AccumulationSurveyRow;
