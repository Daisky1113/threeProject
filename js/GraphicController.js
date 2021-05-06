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
        this.round = []
        this.fixMesh = []
        this.roundRadius = 500
        this.init()
    }

    init() {
        this.cameraInit()
        this.rendererInit()
        this.lightInit()
        // this.setCube()
        this.circleArr = []
        // this.setTestCube()
        // this.resizeHandler()
        this.createRound(64, this.roundRadius)
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
        this.light = new THREE.PointLight('#FFF')
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

    setLine(lineLength) {
        this.lines = []
        const geometry = new THREE.BoxGeometry(8, 8, 8);
        const material = new THREE.MeshLambertMaterial()
        for (let i = 0; i < lineLength; i++) {
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.x = (i * 10) - (lineLength / 2 * 10)
            this.lines.push(mesh)
            this.scene.add(mesh)
        }
    }

    updateLine(data) {
        for (let i = 0; i < this.lines.length; i++) {
            // this.lines[i].scale.x = data[i] / 10
            const mesh = this.lines[i]
            mesh.scale.y = data[i] / 5
            // this.lines[i].scale.z = data[i] / 10
        }
    }

    createRound(length, r) {
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const baseDig = 360 / length
        const baseColor = 1 / length
        for (let i = 0; i < length; i++) {
            const dig = baseDig * (i + 1)
            const rad = dig * Math.PI / 180
            const color = baseColor * i
            const material = new THREE.MeshBasicMaterial()
            material.color.setHSL(color, 0.98, 0.98)
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.x = Math.cos(rad) * this.roundRadius
            mesh.position.z = Math.sin(rad) * this.roundRadius
            this.round.push(mesh)
            this.scene.add(mesh)
        }
    }

    updateRoundY(deg, r) {
        const baseDig = 360 / this.round.length
        this.round.forEach((mesh, i) => {
            if (i % 2 == 0) {
                mesh.position.y += Math.sin((baseDig * i + deg) * Math.PI / 180) * r
            } else {
                mesh.position.y += Math.sin((baseDig * i + deg) * Math.PI / 180) * r * -1
            }
            mesh.position.x = Math.sin((baseDig * i + deg) * Math.PI / 180) * this.roundRadius / 2
            mesh.position.z = Math.sin((baseDig * i + deg) * Math.PI / 180) * this.roundRadius / 2
        })
    }

    setRoundRadius(val) {
        this.roundRadius = val
    }

    updateRoundScale(prevData, data) {
        this.round.forEach((mesh, i) => {
            if (data[i] > 126 && data[i] > prevData[i] * 1.2) {
                const geometry = new THREE.SphereGeometry(5, 32, 32);
                const material = new THREE.MeshBasicMaterial()
                const meshHSL = mesh.material.color.getHSL({})
                material.color.setHSL(meshHSL.h, data[i] / 256, meshHSL.l - Math.random() * Math.random() * Math.random() * Math.random())
                const copyMesh = new THREE.Mesh(geometry, material)
                copyMesh.position.x = mesh.position.x * Math.random() * Math.random()
                copyMesh.position.y = mesh.position.y * Math.random() * Math.random()
                copyMesh.position.z = mesh.position.z * Math.random() * Math.random()

                this.scene.add(copyMesh)
                setTimeout(() => {
                    this.scene.remove(copyMesh)
                }, 1000)
            }
        })
        // this.prevFrequencyData = data
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