import React from 'react/addons.js'

import getData from './services/getData.js'

import { scene, camera, renderer, control } from './3d/setup.js'

import Score3D from './components/Score3D.jsx'
import Animate from './components/Animate.jsx'


// first retrieve data from server
getData().then(data => {

    React.render(
        <div>
            <Score3D score={data.scorePartwise} />
            <Animate score={data.scorePartwise}/>
        </div>,
        document.querySelector('#react-container')
    )

})