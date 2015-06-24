import $ from 'jquery'
import THREE from 'three'
import timeline from '../timeline/timeline2.js'
import setup from './setup.js'

let
    // flag to launch camera move
    isCameraMoving = false,
    // timeline position : correspond to the begin
    // ie : timelinePosition = 0 means that timeline[0], timeline[1] are the extremities of a quadratic bezier curve
    timelinePostion = 0,
    // total steps for the current move
    totalStep = 0,
    // current step in the move's interpolation
    currentStep = 0,
    // list of all computed steps for the camera position
    cameraPositionSteps = [],
    // list of all computed steps for the camera lookingAt
    cameraLookAtSteps = []

$(()=> {

    $(document).on('mousewheel DOMMouseScroll', (e) => {
        e.preventDefault()
        if(!isCameraMoving) {
            launchCamera()
        }
    })
})

// launch a new camera move
// comute all steps of the interpolation
function launchCamera(){

    totalStep = timeline[ timelinePostion+1 ].steps
    currentStep = 0

    let p1Position = new THREE.Vector3(...timeline[timelinePostion].position)
    let p2Position = new THREE.Vector3(...timeline[timelinePostion+1].position)
    let linePosition = new THREE.Line3(p1Position, p2Position)
    let centerPosition = linePosition.center()

    // let's compute the 2 possible control points
    // the 2 points belong to the mediatrice
    // and have the same y than centerPosition
    // we're trying to resolve an equation like z = ax + b
    // with an invert gradient than the [p1, p2] segment
    let zGradient = (p2Position.z - p1Position.z) / (p2Position.x - p1Position.x)
    // and with centerPosition resolving this equation

    cameraPositionSteps = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(...timeline[timelinePostion+0].position),
        new THREE.Vector3(...timeline[timelinePostion+1].position),
        new THREE.Vector3(...timeline[timelinePostion+2].position)
    ).getPoints(totalStep)
    cameraLookAtSteps = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(...timeline[timelinePostion+0].lookAt),
        new THREE.Vector3(...timeline[timelinePostion+1].lookAt),
        new THREE.Vector3(...timeline[timelinePostion+2].lookAt)
    ).getPoints(totalStep)

    isCameraMoving = true

    animate()
}

function stopCamera(){
    // increment timeline position
    timelinePostion+=1
    // set flag to false
    isCameraMoving = false
}

function moveCamera(camera){
    camera.lookAt( cameraLookAtSteps[currentStep] )
    let cameraPosition = cameraPositionSteps[currentStep]
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z )
    currentStep++
}

export default function animate() {
    setup().then(({scene, camera, renderer}) => {

        if(isCameraMoving){
            if(currentStep < totalStep) {
                moveCamera(camera)
            }else {
                stopCamera()
            }
            window.requestAnimationFrame(animate)
        }
        renderer.render(scene, camera)

    })
}
