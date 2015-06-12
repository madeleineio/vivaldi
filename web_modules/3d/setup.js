'use strict'

import THREE from 'three/three.js'
import OrbitControlsFactory from 'three-orbit-controls/index.js'
import isWebglEnabled from 'detector-webgl/index.js'


// create a scene
let scene = new THREE.Scene()

let { outerWidth, outerHeight } = window

let [viewAngle, aspect, near, far] = [40, outerWidth / outerHeight, .1, 40000]

// create a camera
let camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far)

// renderer
let renderer
if(isWebglEnabled){
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        //precision: 'highp'
    })
    renderer.setClearColor( 0xFFFFFF, 1 )
} else {
    renderer = new THREE.CanvasRenderer()
}
renderer.setSize( outerWidth, outerHeight )

// control
let OrbitControls = OrbitControlsFactory(THREE)
let control = new OrbitControls(camera, renderer.domElement)

scene.add(camera)
camera.position.set(-600,0,-600)
camera.lookAt(scene.position)

let container = document.querySelector('#three-container')
container.appendChild(renderer.domElement)

let axis = new THREE.AxisHelper(100)
scene.add(axis)

export { scene as scene }
export { camera as camera }
export { renderer as renderer }
export { control as control }