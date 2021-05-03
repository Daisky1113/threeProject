class GraphicController {
    constructor(props) {
        this.scene = new THREE.Scene()
        this.camera = null
        this.fov = 60
        this.fovRad = (this.fov / 2) * (Math.PI / 180)
        this.renderer = null
        this.composer = null
        this.bloomPass = null
        this.filmPass = null
        this.light = null
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.isCircleTiming = false
        this.init()
    }

    init() {
        this.cameraInit()
        this.rendererInit()
        this.lightInit()
        // this.setCube()
        this.circleArr = []
        this.setLine()
        this.setTestCube()
        this.resizeHandler()
    }

    cameraInit() {
        const dist = (this.height / 2) / Math.tan(this.fovRad)
        this.camera = new THREE.PerspectiveCamera(this.fov, this.width / this.height, 1, dist * 2)
        this.camera.position.z = dist
    }

    rendererInit() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.width, this.height);
        document.body.appendChild(this.renderer.domElement);
    }

    composerInit() {
        this.composer = new THREE.EffectComposer(this.renderer)
        this.composer.addPass(new THREE.RenderPass(this.scene, this.camera))
    }

    bloomPassInit() {
        this.bloomPass = new THREE.BloomPass(1, 25, 4, 256)
        this.composer.addPass(this.bloomPass)
    }

    filmPassInit() {
        this.filmPass = new THREE.FilmPass(0.35, 0.025, 648, false)
        this.filmPass.renderToScreen = true
        this.composer.addPass(this.filmPass)
    }

    lightInit() {
        this.light = new THREE.PointLight('#FEDFE1')
        this.light.position.set(0, 0, 200)

        this.scene.add(this.light)
    }

    setCube() {
        const geometry = new THREE.BoxGeometry(50, 50, 50)
        const material = new THREE.MeshLambertMaterial()
        this.centerCube = new THREE.Mesh(geometry, material)
        this.scene.add(this.centerCube)
    }

    setTestCube() {
        const geometry = new THREE.BoxGeometry(50, 50, 50)
        const material = new THREE.MeshLambertMaterial()
        this.lowCube = new THREE.Mesh(geometry, material)
        this.midCube = new THREE.Mesh(geometry, material)
        this.highCube = new THREE.Mesh(geometry, material)
        this.lowCube.position.x = -300
        this.midCube.position.x = 0
        this.highCube.position.x = 300
        this.scene.add(this.lowCube)
        this.scene.add(this.midCube)
        this.scene.add(this.highCube)
    }

    updateTestCube(val1, val2, val3) {
        this.lowCube.scale.x = val1
        this.lowCube.scale.y = val1
        this.lowCube.scale.z = val1
        this.lowCube.rotation.z += 0.01

        this.midCube.scale.x = val2
        this.midCube.scale.y = val2
        this.midCube.scale.z = val2
        this.midCube.rotation.z += 0.01

        this.highCube.scale.z = val3
        this.highCube.scale.z = val3
        this.highCube.scale.z = val3
        this.highCube.rotation.z += 0.01
    }

    setLine() {
        this.lines = []
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshLambertMaterial()
        for (let i = 0; i < 256; i++) {
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.x = i * 10 - 126 * 10
            this.lines.push(mesh)
            this.scene.add(mesh)
        }
    }

    updateLine(data) {
        for (let i = 0; i < this.lines.length; i++) {
            // this.lines[i].scale.x = data[i] / 10
            const mesh = this.lines[i]
            mesh.scale.y = data[i] / 10
            // this.lines[i].scale.z = data[i] / 10
        }
    }

    createCircle() {
        const arr = []
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshLambertMaterial()
        const baseDig = 360 / 126
        const r = this.height / 2
        for (let i = 0; i < 126; i++) {
            const mesh = new THREE.Mesh(geometry, material)
            const dig = baseDig * (i + 1)
            const rad = dig * Math.PI / 180
            const x = Math.cos(rad) * r
            const y = Math.sin(rad) * r
            mesh.position.x = x
            mesh.position.y = y
            mesh.rotation.z = rad
            mesh.rad = rad
            mesh.r = r
            arr.push(mesh)
            this.scene.add(mesh)
        }
        this.circleArr.push(arr)
    }

    updateEachCircle(speed) {
        this.circleArr.forEach((circle, i) => {
            circle.forEach((mesh, i) => {
                mesh.r -= speed
                if (Math.abs(mesh.r) > 4) {
                    mesh.position.x = Math.cos(mesh.rad) * mesh.r
                    mesh.position.y = Math.sin(mesh.rad) * mesh.r
                } else {
                    this.scene.remove(mesh)
                    circle.splice(i, 1)
                }
            })
            if (circle.length == 0) {
                this.circleArr.splice(i, 1)
            }
        })
    }

    updateCenterCubeScale(props) {
        this.centerCube.scale.x = props
        this.centerCube.scale.y = props
        // this.centerCube.scale.z = props
    }

    updateCenterCubeRotation(val) {
        this.centerCube.rotation.z += val
    }

    rendering() {
        // console.log('rendering')
        this.renderer.render(this.scene, this.camera)
    }

    composerRendering(deltatime) {
        this.composer.render(deltatime)
    }

    resizeHandler() {
        window.onresize = function (e) {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.composer == null
                ? this.renderer.setSize(this.width, this.height)
                : this.composer.setSize(this.width, this.height)
            const dist = (this.height / 2) / Math.tan(this.fovRad)
            camera.aspect = this.width / this.height
            camera.position.z = dist
            camera.updateProjectionMatrix()
        }
    }
}