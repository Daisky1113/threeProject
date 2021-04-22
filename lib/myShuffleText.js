

class ShuffleText {
    constructor(props){
        this.el = null
        this.duration = 600
        this.animationId = 0
        this.startTime = 0
        this.currentTime = 0
        this.step = 0
        this.originalChars = ''
        this.originalCharsLength = 0
        this.chars = []
        this.randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        this.init(props.el)
    }
    init(target){
        this.el = document.querySelector(target)
        this.originalChars = this.el.textContent
        this.originalCharsLength = this.originalChars.length
        this.step = this.duration / this.originalCharsLength
        this.el.innerHTML = ''
        this.originalChars.split('').forEach(char => {
            const span = document.createElement('span')
            span.textContent = char
            this.chars.push(span)
            this.el.insertAdjacentElement('beforeend', span)
        })
    }
    setRandomText(){
        this.chars.forEach(char => {
            const randomIndex = Math.floor(Math.random() * this.randomChars.length)
            char.textContent = this.randomChars[randomIndex]
        })
    }

    start(){
        this.startTime = new Date().getTime()
        this.animationId = setInterval(()=> {
            this.onStartInterval()
        }, 45)
    }


    onStartInterval(){
        this.currentTime = new Date().getTime()
        const pastTime = this.currentTime - this.startTime
        if(pastTime > this.duration) this.stop()
        this.chars.forEach(char => char.style.display = 'inline')
        this.chars.forEach((char, i) => {
            let c
            if(pastTime > (this.step * (i + 1 ))){
                c = this.originalChars[i]
            }else{
                if(Math.random() > 0.2){   
                    const randomIndex = Math.floor(Math.random() * this.randomChars.length)
                    c = this.randomChars[randomIndex]
                }else{
                    c = '-'
                }
            }
            char.textContent = c
        })
        // const pastTime = this.startTime - this.currentTime
    }

    stop(){
        clearInterval(this.animationId)
    }

    end(){
        this.startTime = new Date().getTime()
        this.animationId = setInterval(() => {
            this.onEndInterval()
        }, 45)
    }

    onEndInterval(){
        this.currentTime = new Date().getTime()
        const pastTime = this.currentTime - this.startTime
        if (pastTime > this.duration) this.stop()

        this.chars.forEach((char, i, o) => {
            let c
            const index = this.originalCharsLength - (i + 1)
            if (pastTime > (this.step * (i + 1))) {
                o[this.originalCharsLength - (i + 1)].style.display = 'none'
            } else {
                const randomIndex = Math.floor(Math.random() * this.randomChars.length)
                c = this.randomChars[randomIndex]
                if(Math.random() * 2 > 1){
                    o[0].textContent = '-'
                }else{
                    o[0].textContent = this.randomChars[Math.floor(Math.random() * this.randomChars.length)]
                }
            }
            char.textContent = c
        })

    }



    step(){

    }

    delete(){
        
    }
}