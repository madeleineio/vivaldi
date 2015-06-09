'use strict'

import React from 'react/addons.js'
import THREE from 'three/three.js'
import d3 from 'd3/d3.js'
import { renderer, scene } from '../3d/setup.js'
import Measure2 from './Measure3D.jsx'

export default
class Measure3D extends React.Component {


    render() {
        var geometry = new THREE.BoxGeometry( 5, 10, 10 );
        var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        return <div />
    }
}