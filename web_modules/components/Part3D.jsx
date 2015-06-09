'use strict'

import React from 'react/addons.js'
import d3 from 'd3/d3.js'
import Measure3D from './Measure3D.jsx'

export default
class Part3D extends React.Component {


    shouldComponentUpdate(){
        // single rendering
        return false
    }

    render() {

        let { part, width, height, duration, translateX } = this.props

        // scale for a measure's height : total duration is mapped to the total height
        let scaleY = d3.scale.linear()
            .domain([0, duration])
            .range([0, height])

        // current height counter
        let currentHeight = 0

        return (
            <div>
                {part.measure.map((m, k) => {
                    // compute height for current measure : beats by measure / tempo
                    let measureHeight = scaleY(1000 * 60 * m.computed.time.beats / m.computed.sound.tempo)
                    let measure = (
                        <Measure3D
                            key={k}
                            measure={m}
                            translateX={translateX}
                            translateY={currentHeight}
                            height={measureHeight}
                            width={width} />
                    )
                    // increment currentHeight
                    currentHeight += measureHeight
                    return measure
                })}
            </div>

        )
    }
}