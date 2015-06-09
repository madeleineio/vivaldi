'use strict'

import React from 'react/addons.js'
import THREE from 'three/three.js'
import { renderer, scene } from '../3d/setup.js'


export default class Score3D extends React.Component {

    shouldComponentUpdate(){
        return false
    }

    render(){
        let geometry = new THREE.BoxGeometry( 200, 300, 15 );
        let material = new THREE.MeshBasicMaterial( {color: 0xFFff00} );
        let cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        return false
    }

}