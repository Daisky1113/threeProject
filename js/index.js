
//----------------------------------------
// graphic
//----------------------------------------
const graphicController = new GraphicController()
//----------------------------------------
// dom
//----------------------------------------


// const trackNameArea = document.querySelector('.track-name')


// const playBtn = document.querySelector('.js-play')
// const pauseBtn = document.querySelector('.js-pause')
// const loopBtn = document.querySelector('.js-loop')
// const volumeBtn = document.querySelector('.js-volumeUp')
// const muteBtn = document.querySelector('.js-volumeMute')
// const lowpassBtn = document.querySelector('#js-lowpassBtn')
// const highpassBtn = document.querySelector('#js-highpassBtn')

// const fileInputWrapper = document.querySelector('.fileInput-wrapper')
// const titleArea = document.querySelector('#js-titleArea')
// const audioControllePanel = document.querySelector('.audio-controlle-panel')

// const inputs = {
//     file: document.querySelector('#js-fileInput'),
//     range: {
//         horizonatal: {
//             volume: document.querySelector('#js-volumeInput'),
//         },
//         verticalWrapper: Array.from(document.querySelectorAll('.js-inputVerticalWrapper'))
//     }
// }


// const setInputRangeStyle = (target, val) => {
//     target.style.background = `
//          linear-gradient(to right, #66BAB7 0%, #66BAB7 ${val}%, #eee ${val}%, #eee 100%)
//         `
// }

// handleBtnEvnts = () => {
//     playBtn.addEventListener('click', function () {
//         if (audioController.source) {
//             playBtn.classList.add(DISABLE_CLASS_NAME)
//             pauseBtn.classList.remove(DISABLE_CLASS_NAME)
//             titleArea.classList.add('fix')
//             fileInputWrapper.classList.add('moveBottom')
//             audioController.play()
//             animate()
//         }
//     })

//     pauseBtn.addEventListener('click', function () {
//         playBtn.classList.remove(DISABLE_CLASS_NAME)
//         pauseBtn.classList.add(DISABLE_CLASS_NAME)
//         audioController.pause()
//         cancelAnimationFrame(animationId)
//     })

//     loopBtn.addEventListener('click', function () {
//         loopBtn.classList.contains('active')
//             ? loopBtn.classList.remove('active')
//             : loopBtn.classList.add('active')
//         if (audioController.source) audioController.toggleLoop()
//     })

//     volumeBtn.addEventListener('click', function () {
//         volumeBtn.classList.add(DISABLE_CLASS_NAME)
//         muteBtn.classList.remove(DISABLE_CLASS_NAME)
//         inputs.range.horizonatal.volume.value = 0
//         setInputRangeStyle(inputs.range.horizonatal.volume, 0)
//         audioController.mute()
//     })

//     muteBtn.addEventListener('click', function () {
//         const volume = audioController.getVolume()
//         volumeBtn.classList.remove(DISABLE_CLASS_NAME)
//         muteBtn.classList.add(DISABLE_CLASS_NAME)
//         inputs.range.horizonatal.volume.value = volume * 100
//         audioController.setVolume(volume)
//         setInputRangeStyle(inputs.range.horizonatal.volume, volume * 100)
//     })

//     lowpassBtn.addEventListener('click', function () {
//         lowpassBtn.classList.contains('active')
//             ? lowpassBtn.classList.remove('active')
//             : lowpassBtn.classList.add('active')
//         if (audioController.source) {
//             audioController.toggleLowpassState()
//             audioController.toggleLowpassFilter()
//         }
//     })

//     highpassBtn.addEventListener('click', function () {
//         highpassBtn.classList.contains('active')
//             ? highpassBtn.classList.remove('active')
//             : highpassBtn.classList.add('active')
//         if (audioController.source) {
//             audioController.toggleHighpassState()
//             audioController.toggleHighpassFilter()
//         }
//     })
// }

// const handleInputEvents = () => {

//     inputs.range.horizonatal.volume.addEventListener('input', e => {
//         setInputRangeStyle(e.target, e.target.value)
//         audioController.setVolume(e.target.value / 100)
//         graphicController.setRoundRadius(e.target.value * 10)
//     })

//     inputs.range.verticalWrapper.forEach(el => {
//         const valArea = el.querySelector('.val')
//         const input = el.querySelector('.js-inputRange')

//         input.addEventListener('input', e => {
//             valArea.classList.remove(OPACITY_ZERO)
//             setInputRangeStyle(e.target, e.target.value)
//             if (audioController.source) {
//                 switch (input.id) {
//                     case 'js-lowPassInput':
//                         const lowVal = Math.floor(e.target.value * 4 - 200)
//                         valArea.textContent = audioController.lowpassVal + lowVal
//                         audioController.setLowpassVal(audioController.lowpassVal + lowVal)
//                         break
//                     case 'js-highPassInput':
//                         const highVal = Math.floor(e.target.value * 4 - 200)
//                         valArea.textContent = audioController.highpassVal + highVal
//                         audioController.setHighpassVal(audioController.highpassVal + highVal)
//                         break
//                 }
//             }
//         })

//         input.addEventListener('change', () => {
//             setTimeout(() => {
//                 valArea.classList.add(OPACITY_ZERO)
//             }, 1000)
//         })
//     })
// }

// const handleFileEvent = () => {
//     inputs.file.oninput = async e => {
//         const file = e.target.files[0]
//         const trackInfo = trimTrackInfo(file.name)
//         const trackName = trackInfo?.trackName || foo
//         const creatorName = trackInfo?.creator || bar
//         playBtn.classList.remove(DISABLE_CLASS_NAME)
//         pauseBtn.classList.add(DISABLE_CLASS_NAME)
//         h1.resetAndShow(trackName)
//         p.resetAndShow(creatorName)
//         trackNameArea.textContent = trackName
//         audioControllePanel.classList.contains(OPACITY_ZERO) && audioControllePanel.classList.remove(OPACITY_ZERO)
//         audioController.stop()
//         audioController.loadTrack(file)
//     }
// }

// const handleEvents = () => {
//     handleBtnEvnts()
//     handleInputEvents()
//     handleFileEvent()
// }

// handleEvents()


// const trimTrackInfo = text => {
//     const splitText = text.split(/\.|\-/)
//     return {
//         trackName: splitText[0],
//         creator: splitText[1]
//     }
// }



// h1.show()
//     .then(() => p.show())
//     .then(() => fileInputWrapper.classList.remove(OPACITY_ZERO))



// graphicController.setLine(audioController.spectrumSize)

//----------------------------------------
// fierbase
//----------------------------------------
const firebaseController = new FirebaseController({
    loginElment: new LoginElementController(),
    chatElement: new ChatElementController()
})

//----------------------------------------


//----------------------------------------
// animation
//----------------------------------------
let then = 0
let frameCount = 0
let animationId = 0
const animate = function (now) {
    frameCount++
    animationId = requestAnimationFrame(animate);
    graphicController.rendering()
    graphicController.updateRoundY(frameCount, 2)

};

animate()