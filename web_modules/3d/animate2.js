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
    // current step in the move's interpolation
    currentStep = 0,
    // list of all computed steps for the camera position
    cameraPositionSteps = [],
    // list of all computed steps for the camera lookingAt
    cameraLookAtSteps = []

const animationTotalSteps = 60

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

    currentStep = 0

    let p1Position = new THREE.Vector3(...timeline[timelinePostion].position)
    let p2Position = new THREE.Vector3(...timeline[timelinePostion+1].position)
    let linePosition = new THREE.Line3(p1Position, p2Position)
    let centerPosition = linePosition.center()

    let p1LookAt = new THREE.Vector3(...timeline[timelinePostion].lookAt)
    let p2LookAt = new THREE.Vector3(...timeline[timelinePostion+1].lookAt)
    let lineLookAt = new THREE.Line3(p1LookAt, p2LookAt)
    let centerLookAt = lineLookAt.center()

    // we're trying to find the control point for the position's quadratic curve formed by p1Position and p2Position
    // it will be on the extension of the line formed by the centerLookAt point and the centerLookAt
    // the control point will be at sqrt(dist(p1Position, p2Position)/2)
    let lineNormal = new THREE.Line3(centerLookAt, centerPosition)
    let controlPosition = lineNormal.at( 2/*Math.sqrt( linePosition.distance()/2 )*/ )

    // for the camera's position, we use a quadratic curve
    cameraPositionSteps = new THREE.QuadraticBezierCurve3(
        p1Position,
        controlPosition,
        p2Position
    ).getPoints(animationTotalSteps)
    // but a simple line for the camera's look at
    cameraLookAtSteps = new THREE.LineCurve3(
        p1LookAt,
        p2LookAt
    ).getPoints(animationTotalSteps)

    // let's animate !
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

    console.log('move')

    // camera look at needs a Vector3
    camera.lookAt( cameraLookAtSteps[currentStep] )

    // camera position is already set, we need to decompose the Vector3 (...)
    let cameraPosition = cameraPositionSteps[currentStep]
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z )
    currentStep+=1
}

export default function animate() {
    setup().then(({scene, camera, renderer}) => {

        if(isCameraMoving){
            if(currentStep < animationTotalSteps) {
                moveCamera(camera)
            }else {
                stopCamera()
            }
            window.requestAnimationFrame(animate)
        }
        renderer.render(scene, camera)

    })
}
