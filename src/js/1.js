const THREE = require('three');
const Stats = require('stats-js');
const datGui = require('dat.gui');
export default function f() {
    const stats = initStats();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setClearColor("#fff",1.0);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const axes = new THREE.AxesHelper(20);
    // scene.add(axes);

    const planeGeometry = new THREE.PlaneGeometry(60,20);
    const planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});

    const plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(4,4,4);
    const cubeMaterial = new THREE.MeshLambertMaterial({
        color:'#ff0004',
    });

    const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.castShadow = true;
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    scene.add(cube);

    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshLambertMaterial({
        color: '#0025ff',
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;

    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    scene.add(sphere);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    const spotLight = new THREE.SpotLight('#ebfab7');
    spotLight.position.set(-40,60,-10);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    scene.add(spotLight);

    const controls = new function(){
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.02;
    };
    const gui = new datGui.GUI();
    gui.add(controls,'rotationSpeed',0,0.5);
    gui.add(controls,'bouncingSpeed',0,0.5);

    let step = 0;
    function renderScene(){
        stats.update();
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        step += controls.bouncingSpeed;
        sphere.position.y = 2 + (10*Math.abs(Math.sin(step)));
        cube.position.y = 2 + (10*Math.abs(Math.sin(step)));

        requestAnimationFrame(renderScene);
        renderer.render(scene,camera)
    }
    function initStats(){
        const stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        stats.domElement.style.left = '0px';
        document.getElementById('stats').append(stats.domElement);
        return stats;
    }
    document.getElementById("root").appendChild(renderer.domElement);
    renderScene();
}
