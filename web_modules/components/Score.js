'use strict'

import d3 from 'd3'
import Part from './Part.js'

// http://www.2ality.com/2014/08/es6-today.html
// http://www.2ality.com/2011/11/keyword-parameters.html
export default class Score {
    constructor({score, w = 2000, h = 20000} = {}){

        // compute total duration of the score in ms
        // on the first part of the score, we sum the durations of each measures : 60 * 1000 * beats by measure / tempo
        let duration = score.part[0].measure.reduce( (sum, currentMeasure) =>
            sum + 60. * 1000 * currentMeasure.computed.time.beats / currentMeasure.computed.sound.tempo,
            0)

        // compute width of a single part
        let partWidth = w / (score.part.length * 3)

        // x is mapped on width
        let scaleXParts = d3.scale.linear()
            .domain([0, score.part.length])
            .range([-w/2, w/2])

        // y is mapped on duration
        let scaleYTime = d3.scale.linear()
            .domain([0, duration])
            .range([0, h])

        // we define each part
        this.parts = score.part.map( ( part, ind ) => new Part({
            ind: ind,
            translateX: scaleXParts(ind),
            part: part,
            duration: duration,
            width: partWidth,
            height: h
        }) )

        // chaining pattern
        return this
    }

    render(){
        this.parts.forEach( (part) => part.render() )
    }
}