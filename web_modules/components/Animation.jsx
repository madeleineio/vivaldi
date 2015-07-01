import React from 'react'
import d3 from 'd3'

// Animate component has those props
// * name : name og the props to tween
// * (initialValue) : if defined, the initial value of the interpolation, 0 by default
// * (finalValue) : if undefined, we look at the first props onto the children to retrieve the final value
// * (duration) : 60 if undefined, num of loops
// * (easing) : 'cubic-in-out' by default
// * isSVG : false by default
export default
class Animation extends React.Component {

    generateState(props) {
        let { name, initialValue, finalValue, duration, easing, isSVG, children } = props

        // if undefined, initial value is 0
        if(typeof(initialValue) === 'undefined') {
            initialValue = 0
        }

        // if duration is undefined, we set it at 60 by default
        if(typeof(duration) === 'undefined') {
            duration = 60
        }

        // if final value is undefined, we look into the children (which can be an array or not)
        // https://facebook.github.io/react/tips/children-props-type.html
        if (typeof(finalValue) === 'undefined') {
            finalValue = Array.isArray(children) ? children.filter((c) => name in c.props)[0].props[name] : children.props[name]
        }

        // easing is set at 'cubic-in-out' by default
        if(typeof(easing) === 'undefined') {
            easing = 'cubic-in-out'
        }

        if(typeof(isSVG) === 'undefined'){
            isSVG = false
        }


        let currentTime = 0
        let interpolation = d3.scale.linear()
            .domain([0, 1])
            .range([initialValue, finalValue])

        return {
            name: name,
            currentTime: currentTime,
            duration: duration,
            currentValue: initialValue,
            interpolation: interpolation,
            easing: easing,
            isSVG: isSVG
        }
    }


    constructor(props) {
        super(props)
        this.state = this.generateState(props)
    }


    componentWillReceiveProps(nextProps) {
        this.setState(this.generateState(nextProps))
    }

    interpolation() {
        let {currentTime, duration, interpolation, easing} = this.state
        if (currentTime < duration) {
            this.setState({
                currentTime: currentTime + 1,
                currentValue: interpolation(d3.ease(easing)((currentTime + 1) / duration))
            })
        }
    }


    componentDidMount() {
        window.requestAnimationFrame(this.interpolation.bind(this))
    }

    componentDidUpdate() {
        window.requestAnimationFrame(this.interpolation.bind(this))
    }

    render() {
        let { name, currentValue, isSVG } = this.state
        let children = React.Children.map(this.props.children, (c) => React.cloneElement(c, {
            [ name ]: currentValue
        }))
        return isSVG ? <g>{children}</g> : <span>{children}</span>
    }

}