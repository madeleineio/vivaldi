'use strict'

import React from 'react/addons.js'
import d3 from 'd3/d3.js'

let style = {
    width: '150px',
    height: '30px',
    backgroundColor: 'white'
}

export default
class Measure extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        console.log(this.props.measure.computed)

        // draw grid
        let scaleY = d3.scale.linear()
            .domain([0, 6])
            .range([0, 30])

        // draw notes
        let { note } = this.props.measure
        // note is not always an array...
        !Array.isArray(note) && (note = [note])

        let scaleXNote = d3.scale.linear()
            .domain([-1, note.length])
            .range([0, 150])

        return (
            <span>
                <svg style={style}>
                    <g>{ d3.range(0, 7).map(l => <line key={l} x1="0" y1={scaleY(l)} x2="150" y2={scaleY(l)} stroke="black"/>) }</g>
                    <g>
                        <line x1="150" y1="0" x2="150" y2="30" stroke="black" />
                    </g>
                    <g>
                    {note.map( (n,k) => {
                        if('rest' in n){
                            return <rect x={scaleXNote(k)} y="13" width="10" height="4" fill="black" />
                        }else if('pitch' in n) {
                            return <circle cx={scaleXNote(k)} cy="15" r="3" fill="black" />
                        }
                    } )}
                    </g>
                </svg>
            </span>

        )
    }

}