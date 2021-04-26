const homeTexts = new TextController({
    targets: ['#js-headLine', '#js-paragraph'],
    duration: 1000
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
//----------------------------------------
// graphic
//----------------------------------------
const graphicController = new GraphicController()

// scene.add(light)

// // n個のキューブを半径rの円周上に配置する
// const getRoundOfCube = (n, r) => {
//     const geometry = new THREE.BoxGeometry(100, 100, 100);
//     const material = new THREE.MeshLambertMaterial()
//     const cubes = []
//     for (let i = 1; i <= n; i++) {
//         const dig = 360 / n * i
//         const rad = dig * Math.PI / 180
//         const x = Math.cos(rad) * r
//         const y = Math.sin(rad) * r
//         const cube = new THREE.Mesh(geometry, material);
//         cube.position.x = x
//         cube.position.y = y
//         cubes.push(cube)
//     }
//     return cubes
// }

// const cubes = getRoundOfCube(12, 280)

// cubes.forEach(cube => scene.add(cube))
//----------------------------------------
// animation
//----------------------------------------
let then = 0
let frameCount = 0
document.addEventListener('click', () => {

})

const animate = function (now) {
    frameCount++
    requestAnimationFrame(animate);
    graphicController.rendering()
    if (audioController.isPlaying) {
        const data = audioController.getFrequencyData()
        const avrage = data.reduce((a, b) => a + b) / data.length
        // graphicController.updateCenterCubeScale(avrage / 10)
        graphicController.updateLine(data)
        if (avrage > 70) {
            graphicController.createCircle()
        }
        // graphicController.updateLine(data)
    }
    if (graphicController.circleArr.length > 0) {
        graphicController.updateEachCircle(2)
    }

};

animate()