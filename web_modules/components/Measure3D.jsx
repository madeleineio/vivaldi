'use strict'

import React from 'react/addons.js'
import THREE from 'three/three.js'
import { scene } from '../3d/setup.js'
import getIntByPitch from '../services/getIntByPitch.js'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

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

        // TODO : compute backup : we have to sort notes by voice

        // scale Y
        let scaleY = d3.scale.linear()
            .domain([0, measure.computed.time.beats * measure.computed.divisions])
            .range([0, height])

        let currentTranslateY = 0

        let scaleZ = d3.scale.linear()
            // 0 - 62
            .domain([15, 45])
            .range([-500, 500])
            .clamp(false)

        let scaleColor = d3.scale.linear()
            // 0 - 62
            .domain([15, 45])
            .range(['#ff0000', '#0000ff'])
            .clamp(false)

        let currentVoice = 0

        chords.forEach((chordGroup) => {
            let h = scaleY(chordGroup[0].duration)

            chordGroup.forEach((note, numNote) => {

                if(numNote === 0 && note.voice !== currentVoice){
                    currentVoice = note.voice
                    currentTranslateY = 0
                }

                if (!('rest' in note)) {
                    let col = scaleColor(getIntByPitch(note.pitch))
                    let shaderMaterial =   new THREE.ShaderMaterial({
                        uniforms: {
                            u_Color: {
                                type: 'v4',
                                value: new THREE.Vector4(d3.rgb(col).r / 255., d3.rgb(col).g / 255., d3.rgb(col).b / 255., 1.0)
                            }
                        },
                        vertexShader:   vertexShader,
                        fragmentShader: fragmentShader
                    });

                    let geometry = new THREE.BoxGeometry(
                        width / chordGroup.length,
                        h,
                        5
                    )
                    let object = new THREE.Mesh(geometry, shaderMaterial)
                    object.position.x = translateX + (numNote * width / chordGroup.length) + (width / chordGroup.length) / 2
                    object.position.y = translateY + currentTranslateY + h / 2
                    object.position.z = scaleZ(getIntByPitch(note.pitch))

                    scene.add(object)

                }

            })
            currentTranslateY += h
        })


        // display notes organized by chords
        return (
            <div/>
        )
    }
}