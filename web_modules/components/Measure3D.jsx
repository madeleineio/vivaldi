'use strict'

import React from 'react/addons.js'
import THREE from 'three/three.js'
import { scene } from '../3d/setup.js'
import getIntByPitch from '../services/getIntByPitch.js'


export default
class Measure3D extends React.Component {

    shouldComponentUpdate() {
        // single rendering
        return false
    }

    render() {

        let { measure, width, height, translateY, translateX, ind } = this.props

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

        let scaleZ = d3.scale.linear()
            // 0 - 62
            .domain([15, 45])
            .range([-300, 300])
            .clamp(false)

        let scaleColor = d3.scale.linear()
            // 0 - 62
            .domain([15, 45])
            .range(['#ff0000', '#0000ff'])
            .clamp(false)

        if(ind <= 7){
            chords.forEach((chordGroup) => {
                let h = scaleY(chordGroup[0].duration)
                chordGroup.forEach((note) => {

                    if (!('rest' in note)) {
                        let material = new THREE.MeshBasicMaterial( {color: scaleColor(getIntByPitch(note.pitch)), side: THREE.DoubleSide})
                        let geometry = new THREE.PlaneGeometry(
                            width / chordGroup.length,
                            h
                        )
                        let object = new THREE.Mesh( geometry, material )
                        object.position.x = translateX + (width / chordGroup.length)/2
                        object.position.y = translateY + currentTranslateY + h/2
                        object.position.z = scaleZ(getIntByPitch(note.pitch))

                        scene.add(object)

                    }

                })
                currentTranslateY += h
            })
        }

        else {
            let geometry = new THREE.BoxGeometry(5, 5, 5)
            let object = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xff0000}))
            object.position.x = translateX;
            object.position.y = translateY;
            object.position.z = 0;
            scene.add(object)

        }


        // display notes organized by chords
        return (
            <div/>
        )
    }
}