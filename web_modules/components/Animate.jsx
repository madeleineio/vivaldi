'use strict'

import React from 'react/addons.js'
import THREE from 'three'
import { scene, renderer, control, camera, composer } from '../3d/setup.js'
import d3 from 'd3'
import $ from 'jquery'
import timeline from '../timeline/timeline.js'

let line
let cameraPositionCurve = [],
    cameraLookAtCurve = []

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
            transitionNum: 0,
            cameraPosition: new THREE.Vector3(0, 0, -2000),
            cameraLookAt: new THREE.Vector3(0, 0, 0)

        }
    }

    initTime() {
        let initialTime = (new Date()).getTime()
        this.setState({
            initialTime: initialTime
        })
    }

    increaseCurrentTime() {
        let { initialTime,  isCameraMoving, transitionNum } = this.state

        let updatedState = {
            //currentTime: ( (new Date()).getTime() - initialTime )
        }

        // camera is moving, we also compute timeline's interpolation
        if (isCameraMoving && transitionNum < 50) {
            $.extend(updatedState, {
                cameraPosition: cameraPositionCurve[transitionNum],
                cameraLookAtCurve: cameraLookAtCurve[transitionNum],
                transitionNum: transitionNum + 1
            })
        }

        this.setState(updatedState)
    }

    launchCameraMovement() {

        cameraPositionCurve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(...timeline[0].position),
            new THREE.Vector3(...timeline[1].position),
            new THREE.Vector3(...timeline[2].position)
        ).getPoints(50)

        cameraLookAtCurve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(...timeline[0].lookAt),
            new THREE.Vector3(...timeline[1].lookAt),
            new THREE.Vector3(...timeline[2].lookAt)
        ).getPoints(50)


        this.setState({
            isCameraMoving: true,
            transitionNum: 0
        })
    }

    componentDidMount() {
        this.initTime()

        /*$(document).on('mousewheel DOMMouseScroll',  function(e){
         e.preventDefault()
         // TODO : http://www.smashingmagazine.com/2014/08/25/how-i-built-the-one-page-scroll-plugin/
         console.log(e.originalEvent.detail)
         console.log('scrolled first ')
         })*/

        $(document).on('click', this.launchCameraMovement.bind(this))

    }

    componentDidUpdate(prevProps, prevState) {
        let { duration, currentTime } = prevState
        if (currentTime < duration) {
            window.requestAnimationFrame(this.increaseCurrentTime.bind(this))
        }
    }

    render() {

        let {currentTime, duration, cameraPosition, cameraLookAt } = this.state
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

        camera.lookAt(cameraLookAt)
        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)

        renderer.render(scene, camera)
        //control.update()
        return false
    }

}