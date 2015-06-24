import $ from 'jquery'
import getData from './services/getData.js'
import setup from './3d/setup.js'
import Score from './components/Score.js'



// first retrieve data from server
$( () =>
        Promise.all([
            getData(),
            setup()
        ]).then(data => {
            new Score({
                score: data[0].scorePartwise
            }).render()
        })
)