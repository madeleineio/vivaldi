'use strict'

import React from 'react/addons.js'
import d3 from 'd3/d3.js'

import getIntByPitch from '../services/getIntByPitch.js'

export default
class Measure2 extends React.Component {

    render() {

        let { measure, width, height } = this.props

        let scaleY = d3.scale.linear()
            .domain([0, measure.computed.time.beats * measure.computed.divisions])
            .range([0, height])

        let currentTranslateY = 0

        let scaleColor = d3.scale.linear()
            // 0 - 62
            .domain([10, 50])
            .range(['#ff0000', '#0000ff'])
            .clamp(false)

        return (
            <g>
                {measure.note.filter(n => !('chord' in n)).map((n, k) => {
                    let y = scaleY(n.duration)
                    let col = 'rest' in n ? 'white' : scaleColor(getIntByPitch(n.pitch))
                    let rect = <rect
                        key={k}
                        transform={'translate(' + [0, currentTranslateY] + ')'}
                        x={0}
                        width={width}
                        y={0}
                        height={y}
                        fill={col}
                        stroke={'white'}
                    />
                    currentTranslateY += y
                    return rect
                })}
                <rect x={0} width={width} y={0} height={height} fillOpacity={0} stroke={'black'} strokeWidth={1}/>
            </g>
        )
    }
}