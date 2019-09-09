function createMaterial() {
	return new THREE.MeshStandardMaterial({color: `hsl(${Math.random() * 360}, 60%, 50%)`});
}

function createBox(s=1) {
	const box = new THREE.Mesh(
		new THREE.BoxBufferGeometry(s, s, s),
		createMaterial()
	)
	box.castShadow = true;
	box.receiveShadow = true;
	return box;
}

const scene = new THREE.Scene();
const box = createBox();
box.position.z = -3;
scene.add(box);

const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 10), createMaterial());
floor.receiveShadow = true;
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const light = new THREE.DirectionalLight();
light.position.set(5, 10, 5);
light.castShadow = true;
light.shadow.mapSize.setScalar(1024);
scene.add(light);
scene.add(new THREE.AmbientLight());

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.vr.enabled = true;
scene.add(renderer.vr.getController(0).add(createBox(0.1)));
scene.add(renderer.vr.getController(1).add(createBox(0.1)));

document.body.append(renderer.domElement);
document.body.style.margin = 0;
document.body.style.lineHeight = 0;

document.body.append(THREE.WEBVR.createButton(renderer));

const camera = new THREE.PerspectiveCamera();

renderer.setAnimationLoop(() => {
	renderer.render(scene, camera);
});

function resize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}
resize();
window.addEventListener("resize", resize);
