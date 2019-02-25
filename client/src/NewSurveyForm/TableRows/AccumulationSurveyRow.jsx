import React, { Component } from 'react';


class AccumulationSurveyRow extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return(
        <div className="uk-grid uk-child-width-1-4">
            <div>
                <h5>{this.props.name}</h5>
            </div>
            <div>
              <input
                type="number"
                min="0"
                id={this.props.id + "-accumulation-fresh"}
                className="uk-input"
                onBlur={this.props.updateSurveyState}
              />
            </div>
            <div>
                <input
                  type="number"
                  min="0"
                  id={this.props.id + "-accumulation-weathered"}
                  className="uk-input"
                  onBlur={this.props.updateSurveyState}
                />
            </div>
            <div>
                <input
                  type="number"
                  min="0"
                  id={this.props.id + "-accumulation-total"}
                  className="uk-input"
                  onBlur={this.props.updateSurveyState}
                />
            </div>
        </div>
      );
    }
}

export default AccumulationSurveyRow;
