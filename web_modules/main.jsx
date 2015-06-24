import $ from 'jquery'

import getData from './services/getData.js'
import { scene, camera, renderer, control } from './3d/setup.js'
import Score from './components/Score.js'



// first retrieve data from server
$( () =>
        getData().then(data => {
            new Score({
                score: data.scorePartwise
            }).render()
        })
)