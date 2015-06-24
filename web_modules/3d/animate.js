import timeline from '../timeline/timeline.js'
import setup from './setup.js'

export default function animate() {
    setup().then(({scene, camera, renderer}) => {
        renderer.render(scene, camera)
        window.requestAnimationFrame(animate)
    })
}
