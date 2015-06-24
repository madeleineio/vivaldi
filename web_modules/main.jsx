import $ from 'jquery'
import getData from './services/getData.js'
import setup from './3d/setup.js'
import animate from './3d/animate.js'
import Score from './components/Score.js'


// first retrieve data from server
$(window).load(() =>
        Promise.all([
            getData(),
            setup()
        ]).then(data => {
            new Score({
                score: data[0].scorePartwise
            }).render()
            animate()
        })
)