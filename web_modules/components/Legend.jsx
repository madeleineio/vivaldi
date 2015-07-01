import React from 'react'
import $ from 'jquery'
import timeline from '../timeline/timeline.js'
import Animation from './Animation.jsx'
import Line from './Line.jsx'

export default class Legend extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            texts: timeline[0].text
        }
    }

    componentDidMount(){
        // listen to an event sent by the animate module
        $(document).on('animate', (e, p) => {
            this.setState({
                texts: p.texts
            })
        })
    }

    render(){
        let { texts } = this.state
        return (
            <div style={{
                width: '100%',
                margin: '50px',
                fontFamily: 'Helvetica',
                fontSize: '20px',
                fontStyle: 'oblique',
                fontWeight: 100
            }}>
                {texts.map( (t,k) =>
                <Animation name={'opacity'}>
                    <Line key={k} text={t} opacity={1} />
                </Animation>
                )}
            </div>

        )
    }

}