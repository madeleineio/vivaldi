import React from 'react/addons.js'

import Part from './Part.jsx'

export default class Score extends React.Component {

    constructor(props){
        super(props)
    }

    render(){

        let {part, partList} = this.props.score

        return (
            <div>
            {part.map( (p,k) => <Part part={p} scorePart={partList[k]} key={k}  /> )}
            </div>
        )
    }
}