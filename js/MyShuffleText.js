class MyShuffleText {
    constructor(props) {
        this.el = null
        this.duration = props?.duration || 1000
        this.hideDuration = props?.duration || 500
        this.fps = 60
        this.isAnimation = false
        this.animationId = 0
        this.startTime = 0
        this.currentTime = 0
        this.step = 0
        this.hideStep = 0
        this.originalChars = ''
        this.originalCharsLength = 0
        this.chars = []
        this.randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        this.init(props.el)
    }

    init(target) {
        this.el = document.querySelector(target)
        this.originalChars = this.el.textContent
        this.originalCharsLength = this.originalChars.length
        this.step = this.duration / this.originalCharsLength
        this.hideStep = this.hideDuration / this.originalCharsLength
        this.el.innerHTML = ''
        this.originalChars.split('').forEach(char => {
            const span = document.createElement('span')
            span.textContent = char
            this.chars.push(span)
            this.el.insertAdjacentElement('beforeend', span)
        })
    }

    setRandomText() {
        this.chars.forEach(char => {
            const randomIndex = Math.floor(Math.random() * this.randomChars.length)
            char.textContent = this.randomChars[randomIndex]
        })
    }

    show() {
        if (this.isAnimation === true) return
        this.isAnimation = true
        this.startTime = new Date().getTime()
        this.animationId = setInterval(() => {
            this.chars.forEach(char => char.style.display = 'inline')
            this.onShowInterval()
        }, this.fps / 1000)
    }


    onShowInterval() {
        this.currentTime = new Date().getTime()
        const pastTime = this.currentTime - this.startTime
        this.chars.forEach((char, i) => {
            let c
            if (pastTime > (this.step * (i + 1))) {
                c = this.originalChars[i]
            } else {
                if (Math.random() > 0.3) {
                    const randomIndex = Math.floor(Math.random() * this.randomChars.length)
                    c = this.randomChars[randomIndex]
                } else {
                    c = '-'
                }
            }
            char.textContent = c
            if (pastTime > this.duration) return this.stop()
        })
    }

    stop() {
        this.isAnimation = false
        clearInterval(this.animationId)
    }

    hide() {
        if (this.isAnimation === true) return
        this.isAnimation = true
        this.startTime = new Date().getTime()
        this.animationId = setInterval(() => {
            this.onHideInterval()
        }, this.fps / 1000)
    }

    onHideInterval() {
        this.currentTime = new Date().getTime()
        const pastTime = this.currentTime - this.startTime
        if (pastTime > this.hideDuration) this.stop()

        this.chars.forEach((char, i, o) => {
            let c
            const index = this.originalCharsLength - (i + 1)
            if (pastTime > (this.hideStep * (i + 1))) {
                o[this.originalCharsLength - (i + 1)].style.display = 'none'
            } else {
                const randomIndex = Math.floor(Math.random() * this.randomChars.length)
                c = this.randomChars[randomIndex]
                if (Math.random() > 0.5) {
                    o[0].textContent = '-'
                } else {
                    o[0].textContent = this.randomChars[Math.floor(Math.random() * this.randomChars.length)]
                }
            }
            char.textContent = c
        })

    }



    step() {

    }

    delete() {

    }
}