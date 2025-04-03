import * as THREE from 'three';
import * as Tone from 'tone';

let analyser, frequencyData, trigger;

export function initAudioAnalysis() {
  analyser = new Tone.Analyser('fft', 128);
  Tone.getDestination().connect(analyser);
  frequencyData = analyser.getValue();
}

export function getFrequencyData() {
  if (analyser) {
    frequencyData = analyser.getValue();
    return frequencyData;
  }
  return null;
}

export function triggerVisualEvent() {
  trigger = true
}

export function initVisual() {
  initAudioAnalysis();

  const canvas = document.querySelector('.glslCanvas');
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 8;

  const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const cubes = [];
  const cubeCountX = 5;
  const cubeCountY = 5;
  const cubeCountZ = 6;
  const cubeSpacing = 2;

  for (let x = 0; x < cubeCountX; x++) {
    for (let y = 0; y < cubeCountY; y++) {
      for (let z = 0; z < cubeCountZ; z++) {
        const cubeClone = new THREE.Mesh(geometry, material);
        cubeClone.position.x = (x - cubeCountX / 2) * cubeSpacing;
        cubeClone.position.y = (y - cubeCountY / 2) * cubeSpacing;
        cubeClone.position.z = (z - cubeCountZ / 2) * cubeSpacing;
        scene.add(cubeClone);
        cubes.push(cubeClone);
      }
    }
  }

  const light = new THREE.PointLight(0xc1a3d5, 50);
  light.position.set(2, 2, 2);
  light.castShadow = true;
  scene.add(light);

  const light2 = new THREE.PointLight(0xdf7676, 50);
  light2.position.set(-2, -2, 2);
  light.castShadow = true;
  scene.add(light2);

  const ambientLight = new THREE.AmbientLight(0x004040, 1);
  scene.add(ambientLight);


  const colors = [
    0x00ff00,
    0xff0000,
    0x0000ff,
    0xffff00,
    0xff00ff,
    0x00ffff,
    0xffffff,
  ];

  let firstTrigger = true
  function animate() {
    requestAnimationFrame(animate);

    if (trigger) {
      cubes.forEach((cube) => {
        const scale = Math.random() * 0.5 + 0.5;
        cube.scale.set(scale, scale, scale);
        cube.material.color.set(colors[Math.floor(Math.random() * colors.length)]);
        if (firstTrigger) {
          cube.position.y += (Math.random()/4) - 0.125;
          cube.position.x += (Math.random()/4) - 0.125;
        }
        setTimeout(() => {
          cube.scale.set(1, 1, 1);
          cube.material.color.set(0xffffff);
          trigger = false
          firstTrigger = true
        }, 100);
      });
      firstTrigger = false
    }

    cubes.forEach((cube) => {
      cube.rotation.x += 0.001;
      cube.rotation.y += 0.001;
      cube.rotation.z += 0.001;
      cube.position.y += Math.cos(cube.rotation.y) * 0.001;
    });

    renderer.render(scene, camera);
  }

  animate();
}