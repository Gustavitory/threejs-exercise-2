import "./App.css";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

function App() {
  useEffect(() => {
    const canvas = document.getElementById("container");
    if (!canvas) return;
    const { clientHeight: height, clientWidth: width } = canvas;
    const sizesRelation = width / height;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffe4e4); // color de BG de la escena

    //2. Camera
    const camera = new THREE.PerspectiveCamera(75, sizesRelation, 0.1, 1000);
    camera.position.z = 5;

    //3. Object
    const geometry = new THREE.IcosahedronGeometry();
    const material = new THREE.MeshLambertMaterial({
      color: "#468585",
      emissive: "#468585",
    });
    const dodecahedron = new THREE.Mesh(geometry, material);
    dodecahedron.position.x = -1;

    const boxGeometry = new THREE.DodecahedronGeometry();
    const material2 = new THREE.MeshStandardMaterial({
      color: "#468585",
      shadowSide: THREE.DoubleSide,
      emissive: "#468585",
    });
    const box = new THREE.Mesh(boxGeometry, material2);
    box.position.x = 1;

    scene.add(dodecahedron);
    scene.add(box);

    //4. Add Lights
    const light = new THREE.SpotLight(0x006769, 100, 5, 90);
    light.position.set(1, 1, 1);
    scene.add(light);

    //5. Render
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    //6 NEW: Add orbit controls if require
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Cuando rotas el modelo no se para de golpe
    controls.dampingFactor = 0.05; // El factor de cuanto desplaza adicional
    controls.enableZoom = true; // Es obvio no?
    controls.enablePan = true; // Moverse lateral con el click derecho para explorar la escena

    //7. Add animations or only controls
    function animate() {
      requestAnimationFrame(animate);
      dodecahedron.rotation.x += 0.01;
      dodecahedron.rotation.y += 0.01;

      box.rotation.x += 0.01;
      box.rotation.y += 0.01;

      controls.update();
      renderer.render(scene, camera);
    }
    //8. handle windows resizing
    function resizeAction(): void {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", resizeAction);

    animate();

    return () => {
      window.removeEventListener("resize", resizeAction);
    };
  }, []);
  return (
    <canvas
      id="container"
      style={{
        width: "100%",
        height: "100%",
        padding: 0,
        margin: 0,
      }}
    />
  );
}

export default App;
