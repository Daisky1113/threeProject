class MyShuffleText {
    constructor(props) {
        this.el = null
        this.animationId = 0
        this.duration = props?.duration || 1000
        this.originalChars = ''
        this.originalCharLength = 0
        this.step = 0
        this.chars = []
        this.randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        this.isShuffleing = false
        this.startTime = 0
        this.init(props)
    }

    init(props) {
        this.el = document.querySelector(props.el)
        this.originalChars = this.el.textContent
        this.originalCharLength = this.originalChars.length
        this.step = this.duration / this.originalCharLength
        this.chars.push(...this.originalChars.split('').map(el => {
            const span = document.createElement('span')
            span.textContent = el
            return span
        }))
        this.el.innerHTML = ''
        this.chars.forEach(el => this.el.insertAdjacentElement('beforeend', el))
    }

    getRandomText() {
        return this.randomChars[Math.floor(Math.random() * this.randomChars.length)]
    }

    setText(i, c) {
        this.chars[i].textContent = c
    }

    setRandomText() {
        this.chars.forEach(el => {
            const randomIndex = Math.floor(Math.random() * this.randomChars.length)
            el.textContent = this.randomChars[randomIndex]
        })
    }

    start() {
        this.startTime = new Date().getTime()
        this.startProcessHandller()
    }

    startProcessHandller() {
        this.animationId = requestAnimationFrame(() => {
            this.startProcessHandller()
        })
        const pastTime = new Date().getTime() - this.startTime
        if (pastTime < this.duration) {
            // 文字数によって速度を変化させない
            for (let i = 0; i < this.originalCharLength; i++) {
                if (this.duration - this.step * i < pastTime) {
                    if (Math.random() > 0.6) {
                        this.setText(i, '-')
                    } else {
                        this.setText(i, this.getRandomText())
                    }
                } else {
                    this.setText(i, this.originalChars[i])
                }
            }
        } else {
            this.chars.forEach((el, i) => el.textContent = this.originalChars[i])
            console.log(this.chars.map(el => el.textContent).join(''))
            cancelAnimationFrame(this.animationId)
        }
    }

}


const mst1 = new MyShuffleText({ el: '#js-headLine' })
console.log(mst1)





const homeBtn = document.querySelector('#js-linkHome')
const aboutBtn = document.querySelector('#js-linkAbout')
const courseBtn = document.querySelector('#js-linkCourse')
const newsBtn = document.querySelector('#js-linkNews')

const headLine = document.querySelector('#js-headLine')
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
let animationId = ''




function anima() {
    headLine.textContent = headLine.textContent.split('').map((el, i, o) => {
        return chars[Math.floor(Math.random() * chars.length)]
    }).join('')
    animationId = requestAnimationFrame(anima)
}

homeBtn.addEventListener('click', function () {
    mst1.start()
})

aboutBtn.addEventListener('click', function () {
    cancelAnimationFrame(animationId)
})

courseBtn.addEventListener('click', function () {
    console.log('course')
})

newsBtn.addEventListener('click', function () {
    console.log('news')
})