/**
 * Histogram and pie chart describing the total amount of trash per type of
 * survey found on a specific beach and the percentage of each type of debris,
 * respectively. On the location page.
 */
import React, { Component } from 'react';
import { sumTotals } from "../_helpers/ChartHelpers";
import ReactChartkick,
{
  ColumnChart as BarChart,
  PieChart as PChart
} from "react-chartkick";
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
   * When component receives props, sets state to total debris for surface
   * rib scan and accumulation survey, for each survey.
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
   * Changes which type of survey is displayed for the bar graph.
   * @param {any} e
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
   * Creates JSX code for bar graph and option to choose which type of survey
   * to display data.
   * @return JSX code
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
  <div className="uk-grid-margin uk-width-1-1">
    <div className="uk-card uk-card-default uk-card-body">
      <h3 className="uk-card-title">Debris Totals By Percent</h3>
      <p>Hover over segments to see percentages</p>
      <PChart
        id="pieChart"
        data={chartData}
        legend="right"
        library={{ animation: { animateRotate: true }, responsive: true }}
        height="370px"
        width="450px"
      />
    </div>
  </div>;

export { ColumnChart, PieChart };