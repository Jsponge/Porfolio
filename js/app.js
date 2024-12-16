// Scene, Camera, and Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222); // Dark background for contrast

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20); // Adjust the camera position

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, 500); // Match the viewer height
document.getElementById('viewer-container').appendChild(renderer.domElement);

// Add Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth interaction
controls.dampingFactor = 0.1;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Add Grid Helper (optional for reference)
const gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);

// Load GLTF Model
const loader = new THREE.GLTFLoader();
loader.load(
  './models/Body3.glb', // Path to your 3D model file
  function (gltf) {
    const model = gltf.scene;
    model.position.set(0, 0, 0); // Center the model
    model.scale.set(1, 1, 1); // Adjust scale if needed
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error('Error loading GLB model:', error);
  }
);

// Responsive Canvas on Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / 500;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, 500);
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update controls
  renderer.render(scene, camera);
}
animate();
