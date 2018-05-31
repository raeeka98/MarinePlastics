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
      data.map(datum =>
        <rect
          key={datum.Beach}
          x={xScale(datum.Beach)}
          y={yScale(datum.ASTotal)}
          height={height - margins.bottom - scales.yScale(datum.ASTotal)}
          width={xScale.bandwidth()}
          fill={this.colorScale(datum.ASTotal)}
        />,
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}
