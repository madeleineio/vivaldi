'use strict'

import React from 'react/addons.js'
import d3 from 'd3'

import getIntByPitch from '../services/getIntByPitch.js'

export default
class Measure2 extends React.Component {

    render() {

        let { measure, width, height } = this.props

        // reoganize measure.note by chords
        // [1, 2 chord, 3 chord, 4, 5] => [[1,2,3], [4], [5]]
        let chords = []
        for (let n of measure.note) {
            if ('chord' in n) {
                chords[chords.length - 1].push(n)
            } else {
                chords.push([n])
            }
        }

        // scale Y
        let scaleY = d3.scale.linear()
            .domain([0, measure.computed.time.beats * measure.computed.divisions])
            .range([0, height])

        let currentTranslateY = 0

        let scaleColor = d3.scale.linear()
            // 0 - 62
            .domain([15, 45])
            .range(['#ff0000', '#0000ff'])
            .clamp(false)

        // measur border for debug
        let measureBorder = <rect x={0} width={width} y={0} height={height} fillOpacity={0} stroke={'black'} strokeWidth={1}/>

        // display notes organized by chords
        return (
            <g>
                {chords.map( (group,k) => {
                    let y = scaleY(group[0].duration)
                    let chordGroup = (
                        <g key={k}>
                            {group.map( (n, kk) => {
                                let col = 'rest' in n ? 'white' : scaleColor(getIntByPitch(n.pitch))
                                return (<rect
                                    key={kk}
                                    transform={'translate(' + [0, currentTranslateY] + ')'}
                                    x={kk * width / group.length}
                                    width={width / group.length}
                                    y={0}
                                    height={y}
                                    fill={col}
                                    stroke={col}
                                />)
                            }) }
                        </g>
                    )
                    currentTranslateY += y
                    return chordGroup
                } )}
            </g>
        )
    }
}