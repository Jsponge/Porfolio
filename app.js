// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
camera.position.set(0, 10, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, 500);
document.getElementById('viewer-container').appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// GLB Model Loader
const loader = new THREE.GLTFLoader();
loader.load(
  'models/body3.glb', // Ensure this matches the file and path
  function (gltf) {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error('Error loading model:', error);
  }
);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Responsive Viewer
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / 500;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, 500);
});
