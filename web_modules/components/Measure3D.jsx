'use strict'

import React from 'react/addons.js'
import THREE from 'three/three.js'
import { scene } from '../3d/setup.js'



export default class Measure3D extends React.Component {

    shouldComponentUpdate(){
        // single rendering
        return false
    }

    render() {

        let { measure, width, height, translateY, translateX } = this.props

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


        let geometry = new THREE.BoxGeometry( 10, 10, 10 )
        let object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) )
        object.position.x = translateX;
        object.position.y = translateY;
        object.position.z = 0;
        scene.add(object)

        // display notes organized by chords
        return (
            <div/>
        )
    }
}