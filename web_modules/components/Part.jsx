'use strict'

import React from 'react/addons.js'

export default class Part extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            click: 0
        }
    }

    handleClick(){
        this.setState({
            click: this.state.click+140
        })
    }

    render(){
        return (
            <div onClick={this.handleClick.bind(this)}>
            {this.state.click}
            </div>
        )
    }
}