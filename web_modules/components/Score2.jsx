'use strict'

import React from 'react/addons.js'
import d3 from 'd3/d3.js'

import Part2 from './Part2.jsx'

export default
class Score2 extends React.Component {
    render() {

        let { part, partList } = this.props.score

        let w = 400, h = 20000
        let partWidth = w / part.length

        let scaleXParts = d3.scale.linear()
            .domain([0, part.length])
            .range([0, w])

        return (
            <div>
                <h1>score</h1>
                <svg width={w} height={h}>
                {part.map((p, k) =>
                    <g key={k} transform={'translate(' + [scaleXParts(k), 0] + ')'} >
                        <Part2 part={p} scorePart={partList.scorePart[k]} width={partWidth} height={h}/>
                    </g>
                )}
                </svg>
            </div>
        )
    }
}