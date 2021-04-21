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
const roundOfCube = (n, r) => {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshLambertMaterial({ wireframe: true })
    const cubes = []
    for (let i = 1; i <= n; i++) {
        const dig = 360 / n * i
        console.log(dig)
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

const cubes = roundOfCube(12, 3)
cubes.forEach(cube => scene.add(cube))

const animate = function () {
    requestAnimationFrame(animate);
    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    })


    renderer.render(scene, camera);
};

animate();