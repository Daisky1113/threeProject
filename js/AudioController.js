class AudioController {
    constructor(props) {
        this.ctx = new AudioContext()
        this.source = null
        this.gainNode = null
        this.analyzerNode = null
        this.ffsize = 256
        this.fbc = 0
        this.isPlaying = false
    }

    play() {
        switch (this.isPlaying) {
            case false:
                this.source.start(0)
                this.isPlaying = true
                break
            case true:
                this.ctx.resume()
                break
        }
    }

    pause() {
        this.ctx.suspend()
    }

    stop() {
        if (this.isPlaying) this.source.stop()
        this.isPlaying = false
    }

    setVolume(val) {
        this.gainNode.gain.value = val
    }

    async loadTrack(file) {
        this.stop()
        const arrayBuffer = await file.arrayBuffer()
        const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer)
        this.audioInit(audioBuffer)
    }

    audioInit(buffer) {
        this.source = this.ctx.createBufferSource()
        this.source.buffer = buffer
        this.gainNode = this.ctx.createGain()
        this.setVolume(0.5)
        this.analyzerNode = this.ctx.createAnalyser()
        this.analyzerNode.fftSize = this.ffsize
        this.fbc = this.analyzerNode.frequencyBinCount
        this.freqByteData = new Uint8Array(this.fbc);
        this.source.connect(this.gainNode)
        this.gainNode.connect(this.analyzerNode)
        this.analyzerNode.connect(this.ctx.destination)
    }

    getFrequencyData() {
        this.analyzerNode.getByteFrequencyData(this.freqByteData)
        return this.freqByteData
    }

    getFrequencyDataAverage() {
        return this.freqByteData.reduce((a, b) => a + b) / this.freqByteData.length
    }
}