// Grundlæggende Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("renderer-container").appendChild(renderer.domElement);

// Tilføj lys
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Variabel til mannequin
let mannequin;

// Indlæs mannequin-model
const loader = new THREE.GLTFLoader();
loader.load(
  'https://raw.githubusercontent.com/BassoRoger/3d-tryon/main/human_body.glb', // Test-model
  (gltf) => {
    mannequin = gltf.scene;
    mannequin.scale.set(1, 1, 1); // Justér størrelse
    mannequin.position.y = -1; // Placér modellen ved bunden af scenen
    scene.add(mannequin);
    render();
  },
  undefined,
  (error) => {
    console.error('Fejl ved indlæsning af mannequin:', error);
  }
);

// Kamera position
camera.position.z = 5;

// Render-loop
function render() {
  if (mannequin) {
    mannequin.rotation.y += 0.01; // Langsom rotation
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

// Håndter vinduesændringer
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Faneblade
const tabs = document.querySelectorAll(".tab-buttons button");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    panels[index].classList.add("active");
  });
});
