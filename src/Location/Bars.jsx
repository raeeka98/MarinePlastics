import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

export default class Bars extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range([' #00ccff', '#000099'])
      .interpolate(interpolateLab)
  }

  render() {
    const { scales, margins, data, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions


    const bars = (

      data.map(datum =>{
        let Ydata;
        if(this.props.isSRS && datum.SRSTotal){
          Ydata= datum.SRSTotal
        }else if (!this.props.isSRS && datum.AStotal){
          Ydata = datum.AStotal
        }
        console.log(Ydata)
        console.log("hey", datum)
        console.log("hi", this.props)
        return(
        <rect
          key={datum._id}
          x={xScale(datum.date)}
          y={yScale(Ydata)}
          height={height - margins.bottom - scales.yScale(Ydata)}
          width={xScale.bandwidth()}
          fill={this.colorScale(Ydata)}
        />
      );
    }
  ));

    return (
      <g>{bars}</g>
    )
  }
}
