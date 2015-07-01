import React from 'react'
import $ from 'jquery'

export default class Legend extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            texts: []
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
            <div>
                {texts.map( (t,k) => <p key={k}>{t}</p> )}
            </div>
        )
    }

}