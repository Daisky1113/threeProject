
const headLine = new ShuffleText({
    el: '#js-headLine',
    duration: 1000,
})
const headLineAbout = new ShuffleText({
    el: '#js-headLine-about',
    duration: 1000,
})

const paragraph = new ShuffleText({
    el: '#js-paragraph',
    duration: 1000,
})

const paragraphAbout1 = new ShuffleText({
    el: '#js-paragraph-about1',
    duration: 1000
})

const paragraphAbout2 = new ShuffleText({
    el: '#js-paragraph-about2',
    duration: 1000
})
const paragraphAbout3 = new ShuffleText({
    el: '#js-paragraph-about3',
    duration: 1000
})
const paragraphAbout4 = new ShuffleText({
    el: '#js-paragraph-about4',
    duration: 1000
})

headLine.start()
setTimeout(function(){
    paragraph.start()
},1000)


const homeLinkBtn = document.querySelector('#js-linkHome')
const aboutLinkBtn = document.querySelector('#js-linkAbout')
homeLinkBtn.onclick = function(){
    paragraphAbout4.end()
    setTimeout(function(){
        paragraphAbout3.end()
    },1000)

    setTimeout(function () {
        paragraphAbout2.end()
    }, 2000)

    setTimeout(function () {
        paragraphAbout1.end()
    }, 3000)

    setTimeout(function(){
        headLineAbout.end()
    },4000)

    setTimeout(function(){
        headLine.start()
    },5000)

    setTimeout(function(){
        paragraph.start()
    },6000)
}
aboutLinkBtn.onclick = function(){
    paragraph.end()
    setTimeout(function(){
        headLine.end()
    },1000)

    setTimeout(function(){
        headLineAbout.start()
    },2000)

    setTimeout(function () {
        paragraphAbout1.start()
    }, 3000)

    setTimeout(function () {
        paragraphAbout2.start()
    }, 4000)

    setTimeout(function () {
        paragraphAbout3.start()
    }, 5000)

    setTimeout(function () {
        paragraphAbout4.start()
    }, 6000)
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


camera.position.z = 5;

// const light = new THREE.PointLight(0x00ffff)
// light.position.set(2, 2, 2)

// scene.add(light)

// n個のキューブを半径rの円周上に配置する
const getRoundOfCube = (n, r) => {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshLambertMaterial({ wireframe: true })
    const cubes = []
    for (let i = 1; i <= n; i++) {
        const dig = 360 / n * i
        const rad = dig * Math.PI / 180
        const x = Math.cos(rad) * r
        const y = Math.sin(rad) * r
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = x
        cube.position.y = y
        cubes.push(cube)
    }
    return cubes
}

const cubes = getRoundOfCube(12, 3)
cubes.push(...getRoundOfCube(4, 1))
cubes.forEach(cube => scene.add(cube))

const animate = function () {
    requestAnimationFrame(animate);
    cubes.forEach(cube => {
        // cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    })
    renderer.render(scene, camera);
};

animate();