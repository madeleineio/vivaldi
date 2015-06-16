'use strict'

import React from 'react/addons.js'
import d3 from 'd3'

export default
class Measure extends React.Component {

    render() {

        console.log(this.props.measure.computed)

        let { note, computed } = this.props.measure

        // scaleX : one quarter is 50px
        let scaleX = d3.scale.linear()
        .domain([0, 1])
        .range([0, 50])
        let x = scaleX(computed.time.beats)

        // scaleY to draw grid,
        let y = 30, numLineGrid = 5
        let scaleY = d3.scale.linear()
            .domain([0, numLineGrid-1])
            .range([0, y])

        // display notes on the whole length of the measure
        let scaleXNote = d3.scale.linear()
            .domain([-1, note.length])
            .range([0, x])

        let style = {
            width: x + 'px',
            height: y + 'px',
            backgroundColor: 'white'
        }


        return (
            <span>
                <svg style={style}>
                    <g>{ d3.range(0, numLineGrid).map(l => <line key={l} x1="0" y1={scaleY(l)} x2={x} y2={scaleY(l)} stroke="black"/>) }</g>
                    <g>
                        <line x1={x} y1="0" x2={x} y2={y} stroke="black" />
                    </g>
                    <g>
                    {note.map( (n,k) => {
                        if('rest' in n){
                            return <rect x={scaleXNote(k)} y="13" width="10" height="4" fill="black" />
                        }else if('pitch' in n) {
                            return <circle cx={scaleXNote(k)} cy={y/2} r="3" fill="black" />
                        }
                    } )}
                    </g>
                </svg>
            </span>

        )
    }

}