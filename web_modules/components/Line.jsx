import React from 'react'
import $ from 'jquery'
import timeline from '../timeline/timeline.js'
import Animation from './Animation.jsx'

export default class Line extends React.Component {


    render(){
        let { text, opacity } = this.props
        return <p style={{
            opacity: opacity
        }}>{text}</p>
    }

}