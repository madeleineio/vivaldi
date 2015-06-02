'use strict'

import React from 'react/addons.js'

export default class Part extends React.Component {

    constructor(props){
        super(props)
    }

    handleClick(){
        alert('toto')
    }

    render(){
        return (
            <div onClick={this.handleClick}>
             tutdazefqrgsqrg
            </div>
        )
    }
}