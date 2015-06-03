import React from 'react/addons.js'

import getData from './services/getData.js'

import Score2 from './components/Score2.jsx'

// first retrieve data from server
getData().then(data => {
    // then render the Score component controller
    React.render(
        <Score2 score={data.scorePartwise}/>,
        document.getElementsByTagName('body')[0]
    )
})

