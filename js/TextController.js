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