'use strict'

import React from 'react/addons.js'
import d3 from 'd3/d3.js'

import Measure2 from './Measure2.jsx'

export default
class Part2 extends React.Component {

    // just one rendering
    shouldComponentUpdate(){
        return false
    }

    render() {

        let { part, scorePart, width, height, duration } = this.props

        // scale for a measure's height : total duration is mapped to the total height
        let scaleY = d3.scale.linear()
            .domain([0, duration])
            .range([0, height])

        // current height counter
        let currentHeight = 0

        return (
            <g>
            {part.measure.map((m, k) => {
                // compute height for current measure : beats by measure / tempo
                let measureHeight = scaleY(1000 * 60 * m.computed.time.beats / m.computed.sound.tempo)
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