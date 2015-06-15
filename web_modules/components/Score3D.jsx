'use strict'

import React from 'react/addons.js'
import Part3D from './Part3D.jsx'

export default class Score3D extends React.Component {

    constructor(props) {
        super(props)

        // compute total duration of the score in ms
        // on the first part of the score, we sum the durations of each measures : 60 * 1000 * beats by measure / tempo
        let duration = props.score.part[0].measure.reduce((sum, curMeasure) => {
            return sum + 60. * 1000 * curMeasure.computed.time.beats / curMeasure.computed.sound.tempo
        }, 0)
        this.state = {
            // duration in ms
            duration: duration
        }
    }

    render(){

        // part is an array representing the parts
        let { part } = this.props.score
        let { duration } = this.state

        // define total width and height
        let w = 2000, h = 20000

        // compute width of a single part
        let partWidth = w / (part.length * 2)

        // x is mapped on width
        let scaleXParts = d3.scale.linear()
            .domain([0, part.length])
            .range([-w/2, w/2])

        // y is mapped on duration
        let scaleYTime = d3.scale.linear()
            .domain([0, duration])
            .range([0, h])

        return (
            <div>
                {part.map((p, k) => <Part3D
                    ind={k}
                    key={k}
                    translateX={scaleXParts(k)}
                    part={p}
                    duration={duration}
                    width={partWidth}
                    height={h} />)}
            </div>
        )
    }
}