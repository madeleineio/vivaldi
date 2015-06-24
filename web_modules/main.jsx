import $ from 'jquery'
import getData from './services/getData.js'
import setup from './3d/setup.js'
import Score from './components/Score.js'

function animate(){
    setup().then( ({scene, camera, renderer}) => {
        renderer.render(scene, camera)
        window.requestAnimationFrame( animate )
    })
}

// first retrieve data from server
$( () =>
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