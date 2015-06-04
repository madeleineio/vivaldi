import React from 'react/addons.js'

import Part from './Part.jsx'

// ## Score component : a Score contains multiples parts (one for each type of instruments involved in the score
export default
class Score extends React.Component {

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