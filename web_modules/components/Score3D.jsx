'use strict'

import React from 'react/addons.js'
import THREE from 'three/three.js'
import Part3D from './Part3D.jsx'

export default class Score3D extends React.Component {

    shouldComponentUpdate(){
        return false
    }

    render(){
        let { part, partList } = this.props.score
        let w = 500, h = 20000
        let partWidth = w / part.length
        return (
            <div>
                {part.map((p, k) => <Part3D part={p} scorePart={partList.scorePart[k]} width={partWidth} height={h} />)}
            </div>
        )
    }

}