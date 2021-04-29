(() => {

    class RandomText {
        constructor() {
            this.randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        }
        _getRandomChar() {
            return this.randomChars[Math.floor(Math.random() * this.randomChars.length)]
        }
    }

    class MyShuffleText extends RandomText {
        constructor(props) {
            super()
            this.el = null
            this.duration = props?.duration || 1000
            this.hideDuration = props?.hideDuration || 1000
            this.delay = props?.delay || 100
            this.fps = props?.fps || 60
            this._init(props)
        }

        _init(props) {
            this.originalChars = ''
            this.step = 0
            this.isAnimation = false
            this.animationId = 0
            this.startTime = 0
            this.currentTime = 0
            this.el = props.el
            this._setUp(props.el.textContent)
            this.hideInstantly()
        }

        show() {
            return this._effectStart('start')
        }

        showInstantly() {
            this.el.textContent = this.originalChars
            return new Promise(resolve => resolve(this))
        }

        hide() {
            return this._effectStart('hide')
        }

        hideInstantly() {
            this.el.textContent = ' '
            return new Promise(resolve => resolve(this))
        }

        reset(text) {
            this._setUp(text)
            return this.showInstantly()
        }

        resetAndShow(text) {
            this._setUp(text)
            return this.show()
        }

        _stop() {
            this.isAnimation = false
            clearInterval(this.animationId)
            this.animationId = 0
        }

        _effectStart(process) {
            if (this.isAnimation) return
            this.isAnimation = true
            this.startTime = new Date().getTime()
            const duration = process === 'start' ? this.duration : this.hideDuration

            this.animationId = setInterval(() => {
                process === 'start' ? this._onShowInterval() : this._onHideInterval()
            }, 1000 / this.fps)

            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(this)
                }, duration + this.delay)
            })
        }

        // _getRandomChar() {
        //     return this.randomChars[Math.floor(Math.random() * this.randomChars.length)]
        // }

        _onShowInterval() {
            this.currentTime = new Date().getTime()
            const pastTime = this.currentTime - this.startTime
            let text = this.originalChars.split('').map((char, i) => {
                if (pastTime < this.duration / 2) {
                    if (pastTime < this.step * i) {
                        return ' '
                    } else {
                        return this._getRandomChar()
                    }
                } else {
                    if (pastTime > this.duration / 2 + this.step * i) {
                        return char
                    } else {
                        return Math.random() > 0.8 ? '-' : this._getRandomChar()
                    }
                }
            })
            pastTime > this.duration && this._stop()
            this.el.textContent = text.join('')
        }

        _onHideInterval() {
            this.currentTime = new Date().getTime()
            const pastTime = this.currentTime - this.startTime
            let text = this.originalChars.split('').map((char, i) => {
                if (pastTime < this.hideDuration / 2) {
                    if (pastTime > this.hideDuration / 2 - this.hideStep * i) {
                        return Math.random() > 0.9 ? '-' : this._getRandomChar()
                    } else {
                        return char
                    }
                } else {
                    if (pastTime > this.hideDuration - this.hideStep * i) {
                        return ' '
                    } else {
                        return Math.random() > 0.9 ? '-' : this._getRandomChar()
                    }
                }
            })

            pastTime > this.hideDuration && this._stop()
            this.el.textContent = text.join('')
        }

        _setUp(text) {
            this._setText(text)
            this._setStep()
        }

        _setText(text) {
            this.originalChars = text
            this.el.textContent = this.originalChars
        }

        _setStep() {
            this.step = Math.floor(this.duration / 2 / this.originalChars.length)
            this.hideStep = Math.floor(this.hideDuration / 2 / this.originalChars.length)
        }
    }

    class TextController {
        constructor(props) {
            this.texts = []
            this._init(props)
        }

        _init(props) {
            props.targets.forEach(selector => {
                switch (selector[0]) {
                    case '#':
                        props.el = document.querySelector(selector)
                        this.texts.push(new MyShuffleText(props))
                        break
                    default:
                        Array.from(document.querySelectorAll(selector))
                            .forEach(el => {
                                props.el = el
                                this.texts.push(new MyShuffleText(props))
                            })
                        break
                }
            })
        }

        async repeat(type) {
            for (let i = 0; i < this.texts.length; i++) {
                if (i != this.texts.length - 1) {
                    type === 'show'
                        ? await this.texts[i].show()
                        : await this.texts[this.texts.length - 1 - i].hide()
                    continue
                } else {
                    return type === 'show'
                        ? await this.texts[i].show()
                        : await this.texts[this.texts.length - 1 - i].hide()
                }

            }
        }

        sync(type) {
            console.log(type)
            for (let i = 0; i < this.texts.length; i++) {
                if (i !== this.texts.length - 1) {
                    type === 'show' ? this.texts[i].show() : this.texts[i].hide()
                } else {
                    return type === 'show' ? this.texts[i].show() : this.texts[i].hide()
                }
            }
        }
    }
    window.MyShuffleText = window.MyShuffleText || MyShuffleText
    window.TextController = window.TextController || TextController
})()