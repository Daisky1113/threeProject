
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