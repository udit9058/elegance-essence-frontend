import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import SHOPS from "./ShopData";

const ROOM_SIZE = { width: 12, depth: 16, height: 5 };

const WalkRoom = () => {
  const mountRef = useRef(null);
  const cameraRef = useRef(); // Persist camera
  const move = useRef({ forward: false, backward: false, left: false, right: false });
  const yaw = useRef(0);
  const pitch = useRef(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (mountRef.current) {
      mountRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f8ff);

    // Camera (persisted)
    let camera = cameraRef.current;
    if (!camera) {
      camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 2, 6);
      cameraRef.current = camera;
    } else {
      // Update aspect ratio if needed
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
    }

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(ROOM_SIZE.width, ROOM_SIZE.depth);
    const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xf7e9c6 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Walls
    const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xcce3f7, side: THREE.DoubleSide });
    // Back wall
    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(ROOM_SIZE.width, ROOM_SIZE.height),
      wallMaterial
    );
    backWall.position.set(0, ROOM_SIZE.height / 2, -ROOM_SIZE.depth / 2);
    scene.add(backWall);
    // Left wall
    const leftWall = new THREE.Mesh(
      new THREE.PlaneGeometry(ROOM_SIZE.depth, ROOM_SIZE.height),
      wallMaterial
    );
    leftWall.position.set(-ROOM_SIZE.width / 2, ROOM_SIZE.height / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    scene.add(leftWall);
    // Right wall
    const rightWall = new THREE.Mesh(
      new THREE.PlaneGeometry(ROOM_SIZE.depth, ROOM_SIZE.height),
      wallMaterial
    );
    rightWall.position.set(ROOM_SIZE.width / 2, ROOM_SIZE.height / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    scene.add(rightWall);
    // Front wall
    const frontWall = new THREE.Mesh(
      new THREE.PlaneGeometry(ROOM_SIZE.width, ROOM_SIZE.height),
      wallMaterial
    );
    frontWall.position.set(0, ROOM_SIZE.height / 2, ROOM_SIZE.depth / 2);
    frontWall.rotation.y = Math.PI;
    scene.add(frontWall);
    // Ceiling
    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(ROOM_SIZE.width, ROOM_SIZE.depth),
      new THREE.MeshPhongMaterial({ color: 0xfbeee6 })
    );
    ceiling.position.set(0, ROOM_SIZE.height, 0);
    ceiling.rotation.x = Math.PI / 2;
    scene.add(ceiling);

    // Add clothes images to the back wall
    const shop = SHOPS[0];
    const items = shop.demoItems;
    const spacing = ROOM_SIZE.width / (items.length + 1);
    items.forEach((item, idx) => {
      // Image panel
      const imgTexture = new THREE.TextureLoader().load(item.image);
      const panelGeo = new THREE.PlaneGeometry(1.5, 2);
      const panelMat = new THREE.MeshPhongMaterial({ map: imgTexture });
      const panel = new THREE.Mesh(panelGeo, panelMat);
      panel.position.set(-ROOM_SIZE.width / 2 + spacing * (idx + 1), 2.5, -ROOM_SIZE.depth / 2 + 0.05);
      scene.add(panel);
      // Label under image
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, 128, 32);
      ctx.fillStyle = "#222";
      ctx.font = "bold 16px Arial";
      ctx.fillText(item.name, 8, 22);
      const labelTexture = new THREE.CanvasTexture(canvas);
      const labelMat = new THREE.SpriteMaterial({ map: labelTexture });
      const label = new THREE.Sprite(labelMat);
      label.scale.set(1.2, 0.3, 1);
      label.position.set(panel.position.x, 1.2, panel.position.z + 0.01);
      scene.add(label);
    });

    // Animation loop
    let animationId;
    const speed = 0.2;
    const animate = () => {
      // WASD/arrow movement
      let moved = false;
      const direction = new THREE.Vector3();
      if (move.current.forward) {
        direction.z -= 1;
        moved = true;
      }
      if (move.current.backward) {
        direction.z += 1;
        moved = true;
      }
      if (move.current.left) {
        direction.x -= 1;
        moved = true;
      }
      if (move.current.right) {
        direction.x += 1;
        moved = true;
      }
      if (moved) {
        direction.normalize();
        // Move relative to camera yaw
        const moveYaw = yaw.current;
        const forward = new THREE.Vector3(-Math.sin(moveYaw), 0, -Math.cos(moveYaw));
        const right = new THREE.Vector3(-forward.z, 0, forward.x);
        let moveVec = new THREE.Vector3();
        moveVec.addScaledVector(forward, direction.z);
        moveVec.addScaledVector(right, direction.x);
        moveVec.normalize();
        let nextX = camera.position.x + moveVec.x * speed;
        let nextZ = camera.position.z + moveVec.z * speed;
        // Room boundary
        if (
          nextX > -ROOM_SIZE.width / 2 + 0.5 &&
          nextX < ROOM_SIZE.width / 2 - 0.5 &&
          nextZ > -ROOM_SIZE.depth / 2 + 0.5 &&
          nextZ < ROOM_SIZE.depth / 2 - 0.5
        ) {
          camera.position.x = nextX;
          camera.position.z = nextZ;
        }
      }
      // Mouse look
      camera.rotation.order = "YXZ";
      camera.rotation.y = yaw.current;
      camera.rotation.x = pitch.current;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Keyboard controls
    const handleKeyDown = (e) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowDown":
          move.current.backward = true;
          break;
        case "KeyS":
        case "ArrowUp":
          move.current.forward = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          move.current.left = true;
          break;
        case "KeyD":
        case "ArrowRight":
          move.current.right = true;
          break;
        default:
          break;
      }
    };
    const handleKeyUp = (e) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowDown":
          move.current.backward = false;
          break;
        case "KeyS":
        case "ArrowUp":
          move.current.forward = false;
          break;
        case "KeyA":
        case "ArrowLeft":
          move.current.left = false;
          break;
        case "KeyD":
        case "ArrowRight":
          move.current.right = false;
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Mouse look controls
    const handleMouseDown = (e) => {
      setMouseDown(true);
      setLastMouse({ x: e.clientX, y: e.clientY });
    };
    const handleMouseUp = () => setMouseDown(false);
    const handleMouseMove = (e) => {
      if (!mouseDown) return;
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      yaw.current -= dx * 0.005;
      pitch.current -= dy * 0.003;
      pitch.current = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, pitch.current));
      setLastMouse({ x: e.clientX, y: e.clientY });
    };
    const dom = mountRef.current;
    dom.addEventListener("mousedown", handleMouseDown);
    dom.addEventListener("mouseup", handleMouseUp);
    dom.addEventListener("mouseleave", handleMouseUp);
    dom.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      dom.removeEventListener("mousedown", handleMouseDown);
      dom.removeEventListener("mouseup", handleMouseUp);
      dom.removeEventListener("mouseleave", handleMouseUp);
      dom.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [mouseDown, lastMouse]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100vw", height: "100vh", display: "block", position: "relative", outline: "none" }}
      tabIndex={0}
    >
      <div style={{ position: "absolute", top: 10, left: 10, color: "#333", background: "#fff8", padding: 8, borderRadius: 8, zIndex: 2 }}>
        <b>Controls:</b> WASD or Arrow keys to move, Mouse drag to look around
      </div>
    </div>
  );
};

export default WalkRoom;