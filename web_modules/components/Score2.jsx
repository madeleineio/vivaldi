'use strict'

import React from 'react/addons.js'
import d3 from 'd3/d3.js'

import Part2 from './Part2.jsx'

export default
class Score2 extends React.Component {

    constructor(props) {
        super(props)

        // compute total duration of the score in ms
        // on the first part of the score, we sum the durations of each measures : 60 * 1000 * beats by measure / tempo
        let duration = props.score.part[0].measure.reduce((sum, curMeasure) => {
            return sum + 60. * 1000 * curMeasure.computed.time.beats / curMeasure.computed.sound.tempo
        }, 0)
        this.state = {
            // currentTime in ms : start from 0
            currentTime: 0,
            // initial time
            initialTime: 0,
            // duration in ms
            duration: duration
        }
        console.log(duration / 60000)
    }

    initTime(){
        let initialTime = (new Date()).getTime()
        this.setState({
            initialTime: initialTime
        })
    }

    increaseCurrentTime() {
        this.setState({
            currentTime: ( (new Date()).getTime() - this.state.initialTime )
        })
    }

    componentDidMount() {
        this.initTime()
    }

    componentDidUpdate(prevProps, prevState){
        let { duration, currentTime } = prevState
        if(currentTime < duration){
            window.requestAnimationFrame(this.increaseCurrentTime.bind(this))
        }
    }

    render() {

        let { part, partList } = this.props.score
        let {currentTime, duration } = this.state

        let w = 500, h = 20000
        let partWidth = w / part.length

        let scaleXParts = d3.scale.linear()
            .domain([0, part.length])
            .range([0, w])

        let scaleYTime = d3.scale.linear()
            .domain([0, duration])
            .range([0, h])

        return (
            <svg width={w} height={h} >
                {part.map((p, k) =>
                        <g key={k} transform={'translate(' + [scaleXParts(k), 0] + ')'} className="part" >
                            <Part2 part={p} scorePart={partList.scorePart[k]} duration={this.state.duration} width={partWidth} height={h} />
                        </g>
                )}
                <line y1={scaleYTime(currentTime)} y2={scaleYTime(currentTime)} x1={0} x2={w} stroke={'black'} fill={'black'} />
            </svg>
        )
    }
}