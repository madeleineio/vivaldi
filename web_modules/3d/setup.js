'use strict'
import THREE from 'three'
import isWebglEnabled from 'detector-webgl'

// we do not instantiate the promise initially, we let the main module call the exported function first after the dom ready
// to be sure to have the good width and height
let p
export default () => {
    if(!p) {
        p = new Promise( (resolve) => {
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
                    precision: 'highp'
                })
                renderer.setClearColor( 0xFFFFFF, 1 )
            } else {
                renderer = new THREE.CanvasRenderer()
            }
            renderer.setSize( outerWidth, outerHeight )

            scene.add(camera)
            camera.position.set(0, 0, -2000)
            camera.lookAt(scene.position)

            let container = document.querySelector('#three-container')
            container.appendChild(renderer.domElement)

            let axis = new THREE.AxisHelper(100)
            scene.add(axis)

            resolve({
                scene: scene,
                camera: camera,
                renderer: renderer
            })

        } )
    }
    return p
}