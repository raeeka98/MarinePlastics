/**
 * SurveyCharts.jsx
 * Creates bar chart and pie chart to display on survey page. Only the pie
 * chart is used in SurveyEntry.jsx.
 */
import React, { Component } from 'react';
import { sumTotals } from "../_helpers/ChartHelpers";
import ReactChartkick, { ColumnChart as BarChart, PieChart as PChart } from "react-chartkick";
import { Chart } from "chart.js";
ReactChartkick.addAdapter(Chart);

class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showData: 'srs',
      srsBarData: sumTotals(this.props.chartData, 'SRS'),
      asBarData: sumTotals(this.props.chartData, 'AS'),
      mdsBarData: sumTotals(this.props.chartData, 'MDS')
    };
  }

  /**
   * When component gets props, stores in state the total data for each type
   * of survey using sumTotals(surveys, isSRS) from
   * ../_helpers/ChartHelpers.js.
   * @param {any} chartData
   */
  componentWillReceiveProps({ chartData }) {
    this.setState({
      srsBarData: sumTotals(chartData, 'SRS'),
      asBarData: sumTotals(chartData, 'AS'),
      mdsBarData: sumTotals(chartData, 'MDS')
    });
  }

  /**
   * Changes whether the graph is showing data for surface rib scan or
   * accumulation survey.
   */
  changeBarGraph = (e) => {
    this.setState({ showData: e.target.value });
  }

  /**
   * Determines which survey to show data on in the bar chart, based on what
   * the user selected.
   * @return the correct bar data
   */
  showBarData = () => {
    switch (this.state.showData) {
      case 'srs':
        return this.state.srsBarData;
      case 'as':
        return this.state.asBarData;
      case 'mds':
        return this.state.mdsBarData;
      default:
        return {};
    }
  }

  /**
   * Creates bar chart for survey and options to change between which type of
   * survey it shows data on.
   * @return rendered react component to display bar chart
   */
  render() {
    return (
      <div className="uk-width-3-4">
        <div className="uk-card uk-card-default uk-card-body">
          <h3 className="uk-card-title">
            Number of Pieces of Debris Collected
          </h3>
          <select
            className="uk-select uk-form-large"
            id='bar-type'
            onChange={this.changeBarGraph}
          >
            <option value="srs">in Surface Rib Scan Surveys</option>
            <option value="as">in Accumulation Sweep Surveys</option>
            <option value="mds">in Micro Debris Surveys</option>
          </select>
          <div className="uk-align-center" style={{ width: '45vw' }}>
            <BarChart
              data={this.showBarData()}
              library={{ animation: { animateScale: true } }}
            />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Creates pie chart that shows percentage of each type of debris.
 * @param {any} chartData
 */
let PieChart = ({ chartData }) =>
  <PChart
    id="pieChart"
    data={chartData}
    legend="right"
    library={{ animation: { animateRotate: true }, responsive: true }}
    height="370px"
    width="450px"
  />

export { ColumnChart, PieChart };