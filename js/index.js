const duration = 1000

class TextController {
    constructor(props) {
        this.isAnimation = false
        this.duration = props.duration
        this.items = []
        this.init(props)
    }
    init(props) {
        this.items.push(...props.targets.map(el => new MyShuffleText({ el, duration: this.duration })))
    }

    showSequence() {
        this.items.forEach((el, i) => {
            setTimeout(() => {
                el.show()
            }, i * this.duration)
        })
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, this.duration * this.items.length)
        })
    }

    showSameTime() {
        return new Promise(resolve => {
            this.items.forEach(el => el.show())
            setTimeout(() => {
                resolve()
            }, this.duration)
        })
    }

    hideSequence() {
        this.items.forEach((el, i) => {
            setTimeout(() => {
                el.hide()
            }, i * this.duration)
        })
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, this.duration * this.items.length)
        })
    }

    hideSameTime() {
        return new Promise(resolve => {
            this.items.forEach(el => el.hide())
            setTimeout(() => {
                resolve()
            }, this.duration)
        })
    }

}



const homeTexts = new TextController({
    targets: ['#js-headLine', '#js-paragraph'],
    duration: duration
})


homeTexts.showSequence().then(() => {
    // fileInput.style.display = 'inline'
})

//----------------------------------------
// audio
//----------------------------------------
const audioController = new AudioController({
    fileInput: '#js-fileInput',
    playBtn: '#js-playBtn',
    pauseBtn: '#js-pauseBtn',
    volume: '#js-volumeController',
    trackNameArea: '#js-trackName'
})
console.log(audioController)

//----------------------------------------
// util
//----------------------------------------
let w = window.innerWidth
let h = window.innerHeight

//----------------------------------------
// scene
//----------------------------------------
const scene = new THREE.Scene();

//----------------------------------------
// camera
//----------------------------------------
const fov = 60
const fovRad = (fov / 2) * (Math.PI / 180)
let dist = (h / 2) / Math.tan(fovRad)

const camera = new THREE.PerspectiveCamera(fov, w / h, 1, dist * 2)
camera.position.z = dist

//----------------------------------------
// renderer
//----------------------------------------
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//----------------------------------------
// composer
//----------------------------------------
const composer = new THREE.EffectComposer(renderer)
composer.addPass(new THREE.RenderPass(scene, camera))

const bloomPass = new THREE.BloomPass(1, 25, 4, 256)
composer.addPass(bloomPass)

const filmPass = new THREE.FilmPass(0.35, 0.025, 648, false)
filmPass.renderToScreen = true
composer.addPass(filmPass)

// let glitchPass = new THREE.GlitchPass()
// composer.addPass(glitchPass)
//----------------------------------------
// light
//----------------------------------------
const light = new THREE.PointLight(0x00ffff)
light.position.set(400, 400, 400)

scene.add(light)

// n個のキューブを半径rの円周上に配置する
const getRoundOfCube = (n, r) => {
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshLambertMaterial()
    const cubes = []
    for (let i = 1; i <= n; i++) {
        const dig = 360 / n * i
        const rad = dig * Math.PI / 180
        const x = Math.cos(rad) * r
        const y = Math.sin(rad) * r
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = x
        cube.position.y = y
        cubes.push(cube)
    }
    return cubes
}

const cubes = getRoundOfCube(12, 280)

cubes.forEach(cube => scene.add(cube))

let then = 0

const animate = function (now) {
    if (audioController.isPlaying) console.log(audioController.getFrequencyData())

    now *= 0.001
    const deltatime = now - then
    then = now
    cubes.forEach((cube, i) => {
        const rotationDir = i % 2 == 0 ? -1 : 1
        cube.rotation.z += 0.01 * rotationDir;
        // cube.rotation. += 0.01

    })
    composer.render(deltatime);
    requestAnimationFrame(animate);
};

animate();


// const audioCTX = new AudioContext()
// const source = audioCTX.createBufferSource()
// source.buffer = null;

// const gainNode = audioCTX.createGain()
// source.connect(gainNode)
// gainNode.connect(audioCTX.destination)

// const fileInput = document.querySelector('#js-fileInput')
// const trackNameArea = document.querySelector('#js-trackName')
// const playBtn = document.querySelector('#js-playBtn')
// const pauseBtn = document.querySelector('#js-pauseBtn')
// const volumeController = document.querySelector('#js-volumeController')

// let file = ''
// let fileName = ''
// const audio = new Audio()

// playBtn.onclick = (e) => {
//     pauseBtn.style.display = 'inline'
//     playBtn.style.display = 'none'
//     audio.play()
// }

// pauseBtn.onclick = (e) => {
//     playBtn.style.display = 'inline'
//     pauseBtn.style.display = 'none'
//     audio.pause()
// }
// fileInput.oninput = e => {
//     const file = e.target.files[0]
//     fileName = file.name
//     trackNameArea.textContent = fileName
//     playBtn.style.display = 'inline'
//     pauseBtn.style.display = 'none'
//     audio.src = URL.createObjectURL(file)
//     audio.volume = 0.5
//     // console.log(e.target.value)
// }

// volumeController.oninput = e => {
//     audio.volume = Number(e.target.value) / 100
// }

// event
window.onresize = function (e) {
    w = window.innerWidth
    h = window.innerHeight

    composer.setSize(w, h)

    dist = (h / 2) / Math.tan(fovRad)
    camera.aspect = w / h
    camera.position.z = dist
    camera.updateProjectionMatrix()
}
