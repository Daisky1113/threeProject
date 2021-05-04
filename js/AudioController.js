class AudioController {
    constructor(props) {
        this.ctx = new AudioContext()
        this.source = null
        this.gainNode = null
        this.analyzerNode = null
        this.ffsize = 256
        this.fbc = 0
        this.isPlaying = false
        this.loop = false
        this.volume = 0.5
        this.lowpassVal = 440
        this.highpassVal = 1244
        this.isLowpass = false
        this.isHighepass = false
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

    getVolume() {
        return this.volume
    }

    setVolume(val) {
        this.volume = val
        this.gainNode.gain.value = this.volume
    }

    mute() {
        this.gainNode.gain.value = 0
    }

    toggleLoop() {
        this.loop = !this.loop
        this.source.loop = this.loop
    }

    async loadTrack(file) {
        this.stop()
        const arrayBuffer = await file.arrayBuffer()
        const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer)
        this.audioInit(audioBuffer)
    }

    toggleLowpassState() {
        this.isLowpass = !this.isLowpass
    }

    toggleLowpassFilter() {
        this.isLowpass
            ? this._addLowpassFilter()
            : this._removeLowpassFilter()
    }

    setLowpassVal(val) {
        this.lowpassFilter.frequency.value = val
        console.log(this.lowpassFilter.frequency.value)
    }

    _addLowpassFilter() {
        this.source.disconnect()
        if (this.isHighepass) {
            this.source.connect(this.highpassFilter)
            this.highpassFilter.connect(this.gainNode)
        }
        this.source.connect(this.lowpassFilter)
        this.lowpassFilter.connect(this.gainNode)
        this.gainNode.connect(this.analyzerNode)
        this.analyzerNode.connect(this.ctx.destination)
    }

    _removeLowpassFilter() {
        this.source.disconnect()
        if (this.isHighepass) {
            this.source.connect(this.highpassFilter)
            this.highpassFilter.connect(this.gainNode)
        } else {
            this.source.connect(this.gainNode)
        }
        this.gainNode.connect(this.analyzerNode)
        this.analyzerNode.connect(this.ctx.destination)
    }

    toggleHighpassState() {
        this.isHighepass = !this.isHighepass
    }

    toggleHighpassFilter() {
        this.isHighepass
            ? this._addHighpassFilter()
            : this._removeHighpassFilter()
    }

    setHighpassVal(val) {
        this.highpassFilter.frequency.value = val
    }

    _addHighpassFilter() {
        this.source.disconnect()
        if (this.isLowpass) {
            this.source.connect(this.lowpassFilter)
            this.lowpassFilter.connect(this.gainNode)
        }
        this.source.connect(this.highpassFilter)
        this.highpassFilter.connect(this.gainNode)
        this.gainNode.connect(this.analyzerNode)
        this.analyzerNode.connect(this.ctx.destination)
    }

    _removeHighpassFilter() {
        this.source.disconnect()
        if (this.isLowpass) {
            this.source.connect(this.lowpassFilter)
            this.lowpassFilter.connect(this.gainNode)
        } else {
            this.source.connect(this.gainNode)
        }
        this.gainNode.connect(this.analyzerNode)
        this.analyzerNode.connect(this.ctx.destination)
    }

    audioInit(buffer) {
        this.source = this.ctx.createBufferSource()
        this.source.buffer = buffer
        this.source.loop = this.loop
        this.gainNode = this.ctx.createGain()
        this.setVolume(0.5)
        this.lowpassFilter = this.ctx.createBiquadFilter()
        this.lowpassFilter.type = 'lowpass'
        this.lowpassFilter.frequency.value = this.lowpassVal
        this.highpassFilter = this.ctx.createBiquadFilter()
        this.highpassFilter.type = 'highpass'
        this.highpassFilter.frequency.value = this.highpassVal
        this.analyzerNode = this.ctx.createAnalyser()
        this.analyzerNode.fftSize = this.ffsize
        this.fbc = this.analyzerNode.frequencyBinCount
        this.freqByteData = new Uint8Array(this.fbc);
        this.source.connect(this.gainNode)
        // this.source.connect(this.highpassFilter)
        // this.highpassFilter.connect(this.gainNode)
        // this.source.connect(this.lowpassFilter)
        // this.lowpassFilter.connect(this.gainNode)

        this.gainNode.connect(this.analyzerNode)
        this.analyzerNode.connect(this.ctx.destination)
        this.source.onended = () => {
            console.log('end')
        }
    }

    getFrequencyData() {
        this.analyzerNode.getByteFrequencyData(this.freqByteData)
        return this.freqByteData
    }

    getFrequencyDataAverage() {
        return this.freqByteData.reduce((a, b) => a + b) / this.freqByteData.length
    }
}