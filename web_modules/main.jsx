import React from 'react/addons.js'

import getData from './services/getData.js'

import Score from './components/Score.jsx'


getData().then(data => {
    console.log(data)
    React.render(
        <Score score={data.scorePartwise}/>,
        document.getElementsByTagName('body')[0]
    )
})

