import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>,
  character: THREE.Object3D
) {
  if (!canvasDiv.current) return;
  let canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = canvas3d.width;
  const height = canvas3d.height;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  
  if (window.innerWidth <= 480) {
    camera.position.set(2.5, 10, 45);
    camera.zoom = 0.75;
  } else if (window.innerWidth <= 768) {
    camera.position.set(2, 11, 38);
    camera.zoom = 0.85;
  } else if (window.innerWidth <= 1024) {
    camera.position.set(0, 13.1, 35);
    camera.zoom = 1;
  } else {
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
  }
  
  camera.updateProjectionMatrix();
  const workTrigger = ScrollTrigger.getById("work");
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger != workTrigger) {
      trigger.kill();
    }
  });
  setCharTimeline(character, camera);
  setAllTimeline();
}
