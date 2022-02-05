import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import './css/main.css'
import './index.html'
import './js/lib/fontawesome.js'
import mmap from '../src/assets/images/NormalMap.png'
//import Pictures
const navToggle = document.querySelector('.nav-toggle')
const navLinks = document.querySelectorAll('.nav__link') // Create list with all the nav_link elements

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open')
})

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open')
    })
})

/* Start with:

    npm run dev
*/
//Import // Loading
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load(mmap)
// 'http://localhost:8000/src/assets/static/textures/NormalMap.png'

alert(mmap)
// Debug'
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/* Create Geometry 
-> Create Material
-> Mesh both together
-> Spawn in the Scene */ 
// Objects
const SphereGeometry = new THREE.SphereGeometry( .5, 64,64 );
// Materials



const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;
material.color = new THREE.Color(0x36010c)

// Mesh
const sphere = new THREE.Mesh(SphereGeometry,material)
scene.add(sphere)

// Lights
/*******/
/* GUI */
/*******/


// /********** */
// const light2 = gui.addFolder('Light 2')

// light2.add(pointLight2.position, 'x').min(-3).max(3).step(0.01)
// light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
// light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
// light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)
// // const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 0.5)
// // scene.add (pointLightHelper2)

// const light3 = gui.addFolder('Light 3')

// /********** */
// light3.add(pointLight3.position, 'x').min(-3).max(3).step(0.01)
// light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
// light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
// light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01)
// // const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 0.5)
// // scene.add (pointLightHelper3)

// const light3Color = {
//     color:0xff0000
// }

// light3.addColor(light3Color, 'color')
//     .onChange(() => {
//         pointLight3.color.set(light3Color.color)
//     })

//      Light1
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4

scene.add(pointLight)

//      Light2

const pointLight2 = new THREE.PointLight(0xa80337, 2)
pointLight2.position.set(-1.86,1,-1.65)
pointLight2.intensity = 10

scene.add(pointLight2)



//      Light3

const pointLight3 = new THREE.PointLight(0x04fbff, 2)
pointLight3.position.set(1.6,-1.12,-1.6)
pointLight3.intensity = 2

scene.add(pointLight3)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event){
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

//parallax-effect
const onWindowScroll = (event) => {
    sphere.position.y = window.scrollY * 0.001
}
window.addEventListener('scroll', onWindowScroll)


const clock = new THREE.Clock()

const tick = () =>
{
   
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime


    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .15 * (targetY - sphere.rotation.x)
    sphere.position.z += -.15 * (targetY - sphere.rotation.x)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()