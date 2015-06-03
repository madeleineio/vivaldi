'use strict'

import React from 'react/addons.js'
import d3 from 'd3/d3.js'

export default
class Measure2 extends React.Component {

    render() {

        let { measure, width, height } = this.props

        let scaleY = d3.scale.linear()
            .domain([0, measure.computed.time.beats * measure.computed.divisions])
            .range([0, height])
        let heightNote = height / measure.note.length

        let currentTranslateY = 0

        return (
            <g>
                    {measure.note.filter(n => !('chord' in n)).map( (n,k) => {
                        let y = scaleY(n.duration)
                        let rect =  <rect
                            key={k}
                            transform={'translate(' + [0,currentTranslateY] + ')'}
                            x={0}
                            width={width}
                            y={y}
                            height={heightNote}
                            fill={'rest' in n ? 'white' : 'black'}
                            stroke={'red'}  />
                        currentTranslateY += y
                        return rect
                    } )}
            </g>
        )
    }
}