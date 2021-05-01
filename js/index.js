//----------------------------------------
// dom
//----------------------------------------
const DISABLE_CLASS_NAME = 'inVisible'
const OPACITY_ZERO = 'opacity-zero'

const playBtn = document.querySelector('.js-play')
const pauseBtn = document.querySelector('.js-pause')
const volumeBtn = document.querySelector('.js-volumeUp')
const muteBtn = document.querySelector('.js-volumeMute')
const inputs = {
    volume: document.querySelector('#js-volumeInput'),
    lowpath: document.querySelector('#js-lowPathInput'),
    lowpath: document.querySelector('#js-midPathInput'),
    lowpath: document.querySelector('#js-highPathInput'),
    lowpath: document.querySelector('#js-bpmInput'),
}

let volume = 50

console.log(muteBtn)

playBtn.addEventListener('click', function () {
    playBtn.classList.add(DISABLE_CLASS_NAME)
    pauseBtn.classList.remove(DISABLE_CLASS_NAME)
})

pauseBtn.addEventListener('click', function () {
    playBtn.classList.remove(DISABLE_CLASS_NAME)
    pauseBtn.classList.add(DISABLE_CLASS_NAME)
})

volumeBtn.addEventListener('click', function () {
    volumeBtn.classList.add(DISABLE_CLASS_NAME)
    muteBtn.classList.remove(DISABLE_CLASS_NAME)
    inputs.volume.value = 0
    inputs.volume.style.background = `
         linear-gradient(to right, #eee 0%, #eee 100%)
         `
})

muteBtn.addEventListener('click', function () {
    volumeBtn.classList.remove(DISABLE_CLASS_NAME)
    muteBtn.classList.add(DISABLE_CLASS_NAME)
    inputs.volume.value = volume
    inputs.volume.style.background = `
         linear-gradient(to right, #66BAB7 0%, #66BAB7 ${volume}%, #eee ${volume}%, #eee 100%)
        `
})

const inputRange = Array.from(document.querySelectorAll('.js-inputRange')).forEach(el => {
    el.addEventListener('input', function (e) {
        e.target.style.background = `
         linear-gradient(to right, #66BAB7 0%, #66BAB7 ${el.value}%, #eee ${el.value}%, #eee 100%)
         `
        // console.log(e.target.value)
    })
})

const inputVertical = Array.from(document.querySelectorAll('.js-inputVerticalWrapper')).forEach(el => {
    const input = el.querySelector('.js-inputRange')
    const inputValArea = el.querySelector('.val')
    input.addEventListener('input', function (e) {
        inputValArea.classList.remove(OPACITY_ZERO)
        inputValArea.textContent = e.target.value
    })
    input.addEventListener('change', function () {
        setTimeout(() => {
            inputValArea.classList.add(OPACITY_ZERO)
        }, 1000)
    })

})

const h1 = new MyShuffleText({
    el: document.querySelector('#js-headLine'),
    duration: 1000,
    hideDuration: 1000,
    delay: 300,
    fps: 60
})


const fileInputWrapper = document.querySelector('.fileInput-wrapper')

h1.show()
    .then(() => fileInputWrapper.classList.remove('inVisible'))


// const lorem = 'Hello MyshuffleText The World'
// h1.resetAndShow(lorem)
//     .then(() => h1.hide())
//     .then(() => h1.show())
//     .then(() => h1.show())
//     .then(() => h1.hide())
//     .then(() => h1.resetAndShow('lorem ipsum lorem ipsum'))

    // .then(() => h1.resetAndShow('bar'))
    // .then(() => h1.resetAndShow('hoge'))
    // .then(() => h1.resetAndShow('Hello MyShuffleText'))
    // .then(() => {
    //     fileInputWrapper.classList.remove('inVisible')
    //     // fileInputWrapper.classList.add('visible')
    // })
// .then(() => h1.hide())
// .then(() => h1.resetAndShow('Hello'))

//----------------------------------------
// audio
//----------------------------------------
// const audioController = new AudioController({
//     fileInput: '#js-fileInput',
//     playBtn: '#js-playBtn',
//     pauseBtn: '#js-pauseBtn',
//     volume: '#js-volumeController',
//     trackNameArea: '#js-trackName'
// })
//----------------------------------------
// graphic
//----------------------------------------
// const graphicController = new GraphicController()

//----------------------------------------
// animation
//----------------------------------------
// let then = 0
// let frameCount = 0

// const animate = function (now) {
//     frameCount++
//     requestAnimationFrame(animate);
//     graphicController.rendering()
//     if (audioController.isPlaying) {
//         const data = audioController.getFrequencyData()
//         const avrage = data.reduce((a, b) => a + b) / data.length
//         // graphicController.updateCenterCubeScale(avrage / 10)
//         graphicController.updateLine(data)
//         if (avrage > 70) {
//             graphicController.createCircle()
//         }
//         // graphicController.updateLine(data)
//     }
//     if (graphicController.circleArr.length > 0) {
//         graphicController.updateEachCircle(2)
//     }

// };

// animate()