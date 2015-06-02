import React from 'react/addons.js'

import Part from './Part.jsx'

export default
class Score extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        let {part, partList} = this.props.score

        return (
            <div>
                <h1>score</h1>
                {part.map((p, k) => <Part part={p} scorePart={partList.scorePart[k]} key={k}  />)}
            </div>
        )
    }
}