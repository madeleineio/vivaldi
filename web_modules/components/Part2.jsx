'use strict'

import React from 'react/addons.js'
import d3 from 'd3/d3.js'

import Measure2 from './Measure2.jsx'

export default
class Part2 extends React.Component {

    render() {

        let { part, scorePart, width, height } = this.props

        let scaleYMeasure = d3.scale.linear()
            .domain([0, part.measure.length-1])
            .range([0, height])
        let measureHeight = height / part.measure.length

        return (
            <g>
            {part.measure.map( (m,k) => (
                <g key={k} transform={'translate(' + [0, scaleYMeasure(k)] + ')'} className="measure" >
                    <Measure2 measure={m} height={measureHeight} width={width} />
                </g>
            ) )}
            </g>

        )
    }
}