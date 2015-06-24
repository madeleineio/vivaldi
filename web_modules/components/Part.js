'use strict'

import d3 from 'd3'
import Measure from './Measure.js'

export default
class Part {

    constructor({
        translateX,
        part,
        duration,
        width,
        height }) {

        // scale for a measure's height : total duration is mapped to the total height
        let scaleY = d3.scale.linear()
            .domain([0, duration])
            .range([0, height])

        // current height counter
        let currentHeight = 0

        this.measures = part.measure.map( (m ) => {
            // compute height for current measure : beats by measure / tempo
            let measureHeight = scaleY(1000 * 60 * m.computed.time.beats / m.computed.sound.tempo)
            let measure = new Measure({
                measure: m,
                translateX: translateX,
                translateY: currentHeight,
                height: measureHeight,
                width: width
            })
            // increment currentHeight
            currentHeight += measureHeight
            return measure
        })

        // chaining pattern
        return this
    }

    render(){
        this.measures.forEach( (measure) => measure.render() )
    }

}