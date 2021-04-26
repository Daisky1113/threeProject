class AudioController {
    constructor(props) {
        this.ctx = null
        this.source = null
        this.gainNode = null
        this.analyzerNode = null
        this.ffsize = 256
        this.fbc = 0
        // this.freqByteData = new Uint8Array(this.FFTSIZE / 2)
        this.isPlaying = false
        this.init(props)
    }

    init(props) {
        this.ctx = new AudioContext()
        this.fileName = ''
        this.bindElement(props)
        this.handleEvents()
    }

    bindElement(props) {
        this.fileInput = document.querySelector(props.fileInput)
        this.playBtn = document.querySelector(props.playBtn)
        this.pauseBtn = document.querySelector(props.pauseBtn)
        this.volume = document.querySelector(props.volume)
        this.trackNameArea = document.querySelector(props.trackNameArea)
    }

    handleEvents() {
        this.playBtn.onclick = () => {
            this.play()
        }

        this.pauseBtn.onclick = () => {
            this.pause()
        }

        this.fileInput.oninput = async e => {
            this.hidePauseBtn()
            this.showPlayBtn()
            const file = e.target.files[0]
            this.setFileName(file)
            const buffer = await this.loadTrack(file)
            this.setTrack(buffer)
        }

        this.volume.oninput = e => {
            this.volumeControlle(Number(e.target.value) / 100)
        }
    }

    hidePlayBtn() {
        this.playBtn.style.display = 'none'
    }

    showPlayBtn() {
        this.playBtn.style.display = 'inline'
    }

    hidePauseBtn() {
        this.pauseBtn.style.display = 'none'
    }

    showPauseBtn() {
        this.pauseBtn.style.display = 'inline'
    }

    getAudioDataByte() {
        return this.freqByteData
    }

    play() {
        switch (this.isPlaying) {
            case false:
                this.hidePlayBtn()
                this.showPauseBtn()
                this.source.start(0)
                this.isPlaying = true
                break
            case true:
                this.ctx.resume()
                this.hidePlayBtn()
                this.showPauseBtn()
                break
        }
    }

    pause() {
        this.showPlayBtn()
        this.hidePauseBtn()
        this.ctx.suspend()
        console.log('pause')
    }

    stop() {
        if (this.isPlaying == false) return
        this.source.stop();
        this.showPlayBtn()
        this.hidePauseBtn()
        this.isPlaying = false
    }

    volumeControlle(val) {
        this.gainNode.gain.value = val
    }

    setFileName(file) {
        this.fileName = file.name
        this.trackNameArea.textContent = this.fileName
    }

    async loadTrack(file) {
        this.stop()
        const arrayBuffer = await file.arrayBuffer()
        const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer)
        return audioBuffer
    }

    async setTrack(audioBuffer) {
        this.audioInit(audioBuffer)
    }

    audioInit(buffer) {
        this.source = this.ctx.createBufferSource()
        this.source.buffer = buffer
        this.gainNode = this.ctx.createGain()
        this.gainNode.gain.value = 0.5
        this.analyzerNode = this.ctx.createAnalyser()
        this.analyzerNode.fftSize = this.ffsize
        this.fbc = this.analyzerNode.frequencyBinCount
        this.freqByteData = new Uint8Array(this.fbc);
        this.source.connect(this.gainNode)
        this.gainNode.connect(this.analyzerNode)
        this.analyzerNode.connect(this.ctx.destination)
    }

    getFrequencyData() {
        this.analyzerNode.getByteTimeDomainData(this.freqByteData)
        return this.freqByteData
    }


}