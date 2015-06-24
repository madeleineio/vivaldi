import d3 from 'd3'
import THREE from 'three'
import getIntByPitch from '../services/getIntByPitch.js'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'
import setup from '../3d/setup.js'

export default
class Measure {

    constructor({
        measure,
        translateX,
        translateY,
        height,
        width
        }) {

        this.width = width
        this.translateX = translateX
        this.translateY = translateY

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
        this.chords = chords

        // scale Y
        this.scaleY = d3.scale.linear()
            .domain([0, measure.computed.time.beats * measure.computed.divisions])
            .range([0, height])
        this.scaleZ = d3.scale.linear()
            // 0 - 62
            .domain([15, 45])
            .range([-500, 500])
            .clamp(false)
        this.scaleColor = d3.scale.linear()
            // 0 - 62
            .domain([15, 45])
            .range(['#ff0000', '#0000ff'])
            .clamp(false)
    }

    render() {

        let { chords, scaleY, scaleZ, scaleColor, width, translateX, translateY } = this
        let currentTranslateY = 0
        // we have to deal with backup and voice
        let currentVoice = 0

        setup().then(({scene}) => {

            chords.forEach((chordGroup) => {
                let h = scaleY(chordGroup[0].duration)

                chordGroup.forEach((note, numNote) => {

                    if (numNote === 0 && note.voice !== currentVoice) {
                        currentVoice = note.voice
                        currentTranslateY = 0
                    }

                    if (!('rest' in note)) {
                        let col = scaleColor(getIntByPitch(note.pitch))
                        let shaderMaterial = new THREE.ShaderMaterial({
                            uniforms: {
                                u_Color: {
                                    type: 'v4',
                                    value: new THREE.Vector4(d3.rgb(col).r / 255., d3.rgb(col).g / 255., d3.rgb(col).b / 255., 1.0)
                                }
                            },
                            vertexShader: vertexShader,
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


        })


    }

}