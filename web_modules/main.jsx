import React from 'react/addons.js'

import getData from './services/getData.js'

import { scene, camera, renderer, control } from './3d/setup.js'

import animate from './3d/animate.js'


// first retrieve data from server
getData().then(data => {

    animate()

})