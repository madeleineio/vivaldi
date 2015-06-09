'use strict'

import THREE from 'three/three.js'

import { scene, renderer, control, camera, composer } from './setup.js'

export default function animate(){
    renderer.render(scene, camera)
    control.update()
    window.requestAnimationFrame(animate)
}