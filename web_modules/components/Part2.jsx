'use strict'

import React from 'react/addons.js'
import d3 from 'd3/d3.js'

import Measure2 from './Measure2.jsx'

export default
class Part2 extends React.Component {

    render() {

        let { part, scorePart, width, height } = this.props

        // compute total duration of the part in minutes
        let totalDuration = part.measure.reduce((sum, curMeasure) => sum + 1 / curMeasure.computed.sound.tempo, 0)

        // scale for a measure's height : total duration is mapped to the total height
        let scaleY = d3.scale.linear()
            .domain([0, totalDuration])
            .range([0, height])

        // current height counter
        let currentHeight = 0

        return (
            <g>
            {part.measure.map((m, k) => {

                // compute height for current measure
                let measureHeight = scaleY(1/m.computed.sound.tempo)

                // measure component, encapsulated in a g tag with a transform attribute
                let measure = (
                    <g key={k} transform={'translate(' + [0, currentHeight] + ')'} className="measure" >
                        <Measure2 measure={m} height={measureHeight} width={width} />
                    </g>
                )

                // increment currentHeight
                currentHeight += measureHeight

                return measure
            })}
            </g>

        )
    }
}