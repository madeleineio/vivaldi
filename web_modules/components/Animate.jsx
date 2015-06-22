'use strict'

import React from 'react/addons.js'
import THREE from 'three'
import { scene, renderer, control, camera, composer } from '../3d/setup.js'
import d3 from 'd3'
import $ from 'jquery'
import throttle from 'lodash/function/throttle'

let line

export default
class Animate extends React.Component {

    constructor(props) {
        super(props)

        let geometry = new THREE.Geometry()
        geometry.vertices.push(
            new THREE.Vector3(-1000, 0, 0),
            new THREE.Vector3(1000, 0, 0)
        )
        geometry.verticesNeedUpdate = true
        let material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        })
        line = new THREE.Line(geometry, material)
        scene.add(line)

        let duration = props.score.part[0].measure.reduce((sum, curMeasure) => {
            return sum + 60. * 1000 * curMeasure.computed.time.beats / curMeasure.computed.sound.tempo
        }, 0)

        this.state = {
            // currentTime in ms : start from 0
            currentTime: 0,
            // initial time
            initialTime: 0,
            // duration in ms
            duration: duration,


            // current timeline position,
            timelinePostion: 0,
            //
            isCameraMoving: false,
            //
            transitionStart: 0,
            transitionCurrentTime: 0,
            interpolationCameraPosition: null,
            interpolationCameraLookAt: null

        }
    }

    initTime() {
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

        $(document).on('mousewheel DOMMouseScroll',  function(e){
            e.preventDefault()
            // TODO : http://www.smashingmagazine.com/2014/08/25/how-i-built-the-one-page-scroll-plugin/
            console.log('scrolled first ')
        })

    }

    componentDidUpdate(prevProps, prevState) {
        let { duration, currentTime } = prevState
        if (currentTime < duration) {
            window.requestAnimationFrame(this.increaseCurrentTime.bind(this))
        }
    }

    render() {

        let {currentTime, duration } = this.state
        let w = 2000, h = 20000

        let scaleY = d3.scale.linear()
            .domain([0, duration])
            .range([0, h])

        let currentH = scaleY(currentTime)

        line.geometry.verticesNeedUpdate = true
        line.geometry.dynamic = true
        line.geometry.vertices = [
            new THREE.Vector3(-1000, currentH, 0),
            new THREE.Vector3(1000, currentH, 0)
        ]

        //camera.lookAt(new THREE.Vector3(0, currentH, 0))
        //camera.position.y = currentH

        renderer.render(scene, camera)
        //control.update()
        return false
    }

}