import $ from 'jquery'
import React from 'react'

import getData from './services/getData.js'
import setup from './3d/setup.js'
import animate from './3d/animate.js'
import Score from './components/Score.js'
import Legend from './components/Legend.jsx'


// first retrieve data from server
$(window).load(() => {
        React.render(
            <Legend />,
            document.querySelector('#react-container')
        )

        Promise.all([
            getData(),
            setup()
        ]).then(data => {
            new Score({
                score: data[0].scorePartwise
            }).render()
            animate()
        })
    }
)