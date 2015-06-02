'use strict'

import React from 'react/addons.js'

import Measure from './Measure.jsx'

export default class Part extends React.Component {

    render(){
        let { partName } = this.props.scorePart
        let { measure } = this.props.part

        return (
            <div>
                <h2>part : {partName}</h2>
                { measure.map( (m,k) =>  <Measure key={k} measure={m}/> )}
            </div>
        )
    }
}