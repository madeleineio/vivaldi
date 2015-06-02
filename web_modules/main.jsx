import React from 'react/addons.js'

import getData from './services/getData.js'

import Score from './components/Score.jsx'

// first retrieve data from server
getData().then(data => {
    // then render the Score component controller
    React.render(
        <Score score={data.scorePartwise}/>,
        document.getElementsByTagName('body')[0]
    )
})

