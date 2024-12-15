// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222); // Dark background for better visibility

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 150);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('viewer-container').appendChild(renderer.domElement);

// Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth controls
controls.dampingFactor = 0.05;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(50, 100, 50);
scene.add(directionalLight);

// Test Cube (for debugging)
const geometry = new THREE.BoxGeometry(10, 10, 10); // Size: 10x10x10
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red color
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0); // Center the cube in the scene
scene.add(cube);


// Grid Helper for Reference
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

// Load GLB Model
const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load(
  './models/Body 3.glb',
  function (gltf) {
    const model = gltf.scene;
    model.position.set(0, 0, 0); // Center the model
    model.scale.set(1, 1, 1); // Adjust scale as needed
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error('Error loading GLB file:', error);
  }
);

// Responsive Resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Smooth interaction
  renderer.render(scene, camera);
}
animate();
