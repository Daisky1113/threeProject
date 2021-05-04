//----------------------------------------
// audio
//----------------------------------------
const audioController = new AudioController()
//----------------------------------------
// graphic
//----------------------------------------
const graphicController = new GraphicController()
//----------------------------------------
// dom
//----------------------------------------
const DISABLE_CLASS_NAME = 'inVisible'
const OPACITY_ZERO = 'opacity-zero'
let volume = 50
const h1 = new MyShuffleText({
    el: document.querySelector('#js-headLine'),
    duration: 600,
    hideDuration: 600,
    delay: 300,
    fps: 60
})

const p = new MyShuffleText({
    el: document.querySelector('#js-paragraph'),
    duration: 600,
    hideDuration: 600,
    delay: 300,
    fps: 60
})

const trackNameArea = document.querySelector('.track-name')


const playBtn = document.querySelector('.js-play')
const pauseBtn = document.querySelector('.js-pause')
const loopBtn = document.querySelector('.js-loop')
const volumeBtn = document.querySelector('.js-volumeUp')
const muteBtn = document.querySelector('.js-volumeMute')
const lowpassBtn = document.querySelector('#js-lowpassBtn')
const highpassBtn = document.querySelector('#js-highpassBtn')

const fileInputWrapper = document.querySelector('.fileInput-wrapper')
const titleArea = document.querySelector('#js-titleArea')
const audioControllePanel = document.querySelector('.audio-controlle-panel')

const inputs = {
    file: document.querySelector('#js-fileInput'),
    range: {
        horizonatal: {
            volume: document.querySelector('#js-volumeInput'),
        },
        verticalWrapper: Array.from(document.querySelectorAll('.js-inputVerticalWrapper'))
    }
}


const setInputRangeStyle = (target, val) => {
    target.style.background = `
         linear-gradient(to right, #66BAB7 0%, #66BAB7 ${val}%, #eee ${val}%, #eee 100%)
        `
}

handleBtnEvnts = () => {
    playBtn.addEventListener('click', function () {
        if (audioController.source) {
            playBtn.classList.add(DISABLE_CLASS_NAME)
            pauseBtn.classList.remove(DISABLE_CLASS_NAME)
            titleArea.classList.add('fix')
            fileInputWrapper.classList.add('moveBottom')
            audioController.play()
        }
    })

    pauseBtn.addEventListener('click', function () {
        playBtn.classList.remove(DISABLE_CLASS_NAME)
        pauseBtn.classList.add(DISABLE_CLASS_NAME)
        audioController.pause()
    })

    loopBtn.addEventListener('click', function () {
        loopBtn.classList.contains('active')
            ? loopBtn.classList.remove('active')
            : loopBtn.classList.add('active')
        if (audioController.source) audioController.toggleLoop()
    })

    volumeBtn.addEventListener('click', function () {
        volumeBtn.classList.add(DISABLE_CLASS_NAME)
        muteBtn.classList.remove(DISABLE_CLASS_NAME)
        inputs.range.horizonatal.volume.value = 0
        setInputRangeStyle(inputs.range.horizonatal.volume, 0)
        audioController.mute()
    })

    muteBtn.addEventListener('click', function () {
        const volume = audioController.getVolume()
        volumeBtn.classList.remove(DISABLE_CLASS_NAME)
        muteBtn.classList.add(DISABLE_CLASS_NAME)
        inputs.range.horizonatal.volume.value = volume * 100
        audioController.setVolume(volume)
        setInputRangeStyle(inputs.range.horizonatal.volume, volume * 100)
    })

    lowpassBtn.addEventListener('click', function () {
        lowpassBtn.classList.contains('active')
            ? lowpassBtn.classList.remove('active')
            : lowpassBtn.classList.add('active')
        if (audioController.source) {
            audioController.toggleLowpassState()
            audioController.toggleLowpassFilter()
        }
    })

    highpassBtn.addEventListener('click', function () {
        highpassBtn.classList.contains('active')
            ? highpassBtn.classList.remove('active')
            : highpassBtn.classList.add('active')
        if (audioController.source) {
            audioController.toggleHighpassState()
            audioController.toggleHighpassFilter()
        }
    })
}

const handleInputEvents = () => {

    inputs.range.horizonatal.volume.addEventListener('input', e => {
        setInputRangeStyle(e.target, e.target.value)
        audioController.setVolume(e.target.value / 100)
        volume = e.target.value
    })

    inputs.range.verticalWrapper.forEach(el => {
        const valArea = el.querySelector('.val')
        const input = el.querySelector('.js-inputRange')
        input.addEventListener('input', e => {
            valArea.classList.remove(OPACITY_ZERO)
            setInputRangeStyle(e.target, e.target.value)
            if (audioController.source) {
                switch (input.id) {
                    case 'js-lowPassInput':
                        const lowVal = Math.floor(e.target.value * 8.8)
                        valArea.textContent = lowVal
                        audioController.setLowpassVal(lowVal)
                        break
                    case 'js-highPassInput':
                        const highVal = Math.floor(e.target.value * 8.8)
                        valArea.textContent = 1440 + highVal
                        console.log(valArea.textContent)
                        audioController.setHighpassVal(1440 + highVal)
                        break
                }
            }
        })

        input.addEventListener('change', () => {
            setTimeout(() => {
                valArea.classList.add(OPACITY_ZERO)
            }, 1000)
        })
    })


}

const handleFileEvent = () => {
    inputs.file.oninput = async e => {
        const file = e.target.files[0]
        const trackInfo = trimTrackInfo(file.name)
        const trackName = trackInfo?.trackName || foo
        const creatorName = trackInfo?.creator || bar
        playBtn.classList.remove(DISABLE_CLASS_NAME)
        pauseBtn.classList.add(DISABLE_CLASS_NAME)
        h1.resetAndShow(trackName)
        p.resetAndShow(creatorName)
        trackNameArea.textContent = trackName
        // audioControllePanel.classList.contains(OPACITY_ZERO) && audioControllePanel.classList.remove(OPACITY_ZERO)
        audioController.stop()
        audioController.loadTrack(file)
    }
}

const handleEvents = () => {
    handleBtnEvnts()
    handleInputEvents()
    handleFileEvent()
}

handleEvents()


const trimTrackInfo = text => {
    const splitText = text.split(/\.|\-/)
    return {
        trackName: splitText[0],
        creator: splitText[1]
    }
}



h1.show()
    .then(() => p.show())
// .then(() => fileInputWrapper.classList.remove(OPACITY_ZERO))




//----------------------------------------
// animation
//----------------------------------------
let then = 0
let frameCount = 0

const animate = function (now) {
    frameCount++
    requestAnimationFrame(animate);
    graphicController.rendering()
    if (audioController.isPlaying) {
        const data = audioController.getFrequencyData()
        const lowData = data.slice(0, data.length / 3)
        const midData = data.slice(data.length / 3, data.length / 3 * 2)
        const higheData = data.slice(data.length - 30)
        const lowVal = lowData.reduce((a, b) => a + b) / lowData.length
        const midVal = midData.reduce((a, b) => a + b) / midData.length
        const higheVal = higheData.reduce((a, b) => a + b) / higheData.length
        // const avrage = data.reduce((a, b) => a + b) / data.length
        // graphicController.updateCenterCubeScale(avrage / 10)
        graphicController.updateLine(data)

        graphicController.updateTestCube(lowVal / 100, midVal / 100, higheVal / 80)
        // falseからtrueになった時だけ
        if (midVal > 70) {
            graphicController.isCircleTiming = true
        } else {
            graphicController.isCircleTiming = false
        }

        if (graphicController.isCircleTiming) {
            graphicController.createCircle()
        }
        // graphicController.updateLine(data)
    }
    if (graphicController.circleArr.length > 0) {
        graphicController.updateEachCircle(2)
    }

};

animate()