import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import GUI from 'lil-gui'
// import { RGBMLoader } from 'three/examples/jsm/Addons.js'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

let sc = new THREE.Scene()
sc.background = new THREE.Color('#30302f')
let on = null;
let off = null;
let global = false
let gltf = new GLTFLoader()
let draco = new DRACOLoader()
draco.setDecoderPath("/draco/")
gltf.setDRACOLoader(draco)
gltf.load("/models/off/off.gltf", (mon) => {
    sc.add(mon.scene)
    off = mon.scene
    off.rotation.y = Math.PI
})
gltf.load("/models/on/on.gltf", (mon) => {
    sc.add(mon.scene)
    on=mon.scene
    on.rotation.y = Math.PI
    on.visible = false
})
let aml = new THREE.AmbientLight('#FFFFFF', 1)
let dir = new THREE.DirectionalLight("#FFFFFFF",1)
dir.position.set(0,1,0)
let dir1 = new THREE.DirectionalLight("#FFFFFFF",1)
dir1.position.set(0,-1,0)
let dir2 = new THREE.DirectionalLight("#FFFFFFF",1)
dir2.position.set(1,0,0)
let dir3 = new THREE.DirectionalLight("#FFFFFFF",1)
dir3.position.set(-1,0,0)
let dir4 = new THREE.DirectionalLight("#FFFFFFF",1)
dir4.position.set(0,0,-1)

sc.add(aml,dir,dir1,dir2,dir3,dir4 )
const btn = document.getElementById("btn")
window.addEventListener("click",()=>{
    if(global){
        btn.classList.remove("buttonOn");
        btn.innerHTML = "OFF"
        global = false
        off.children[26].visible = false
        on.visible = true
        btn.classList.add("buttonOff");

    }else{
        btn.classList.remove("buttonOff");
        btn.innerHTML = "ON"
        global = true
        off.children[26].visible = true
        on.visible = false
        btn.classList.add("buttonOn");

    }
})
// let mouse = {
//     x: 0,
//     y: 0
// }
// window.addEventListener('mousemove', (event) => {
//     mouse.x = event.clientX / size.width * 2 - 1
//     mouse.y = - (event.clientY) / size.height * 2 + 1
// })
let size = {
    width: window.innerWidth,
    height: window.innerHeight
}

let camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 1.5
sc.add(camera)

window.addEventListener('resize', () => {
    size.width = window.innerWidth
    size.height = window.innerHeight
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width, size.height)
})

let canvas = document.querySelector('.web')

let renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
})



renderer.setSize(size.width, size.height)

let orbit = new OrbitControls(camera, canvas)
orbit.enableDamping = true
orbit.minDistance = 1
orbit.maxDistance = 5

const clock = new THREE.Clock()
let animation = () => {
    orbit.update()
    const elapstime = clock.getElapsedTime()
    renderer.render(sc, camera)
    window.requestAnimationFrame(animation)
}
animation()