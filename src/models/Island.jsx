import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import islandScene from "../../public/models/model.glb";

export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  ...props
}) {
  const islandRef = useRef();
  const { gl, viewport, camera } = useThree();
  const { scene } = useGLTF(islandScene);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  useEffect(() => {
    camera.position.set(0, 3, 5);
  }, [camera]);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
    lastX.current = e.clientX || e.touches?.[0]?.clientX || 0;
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (e) => {
    if (!isRotating) return;
    e.stopPropagation();
    e.preventDefault();
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const delta = (clientX - lastX.current) / viewport.width;

    islandRef.current.rotation.y += delta * 0.01 * Math.PI;
    rotationSpeed.current = delta * 0.01 * Math.PI;
    lastX.current = clientX;
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, [gl, isRotating]);

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) rotationSpeed.current = 0;
      islandRef.current.rotation.y += rotationSpeed.current;
    }

    const rotation = islandRef.current.rotation.y;
    const normalized = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    switch (true) {
      case normalized >= 0 && normalized < 1:
        setCurrentStage(1);
        break;
      case normalized >= 1 && normalized < 2:
        setCurrentStage(2);
        break;
      case normalized >= 2 && normalized < 3:
        setCurrentStage(3);
        break;
      case normalized >= 3 && normalized < 4:
        setCurrentStage(4);
        break;
      case normalized >= 4 && normalized < 5:
        setCurrentStage(5);
        break;
      case normalized >= 5 && normalized <= 6.3:
        setCurrentStage(6);
        break;
      default:
        setCurrentStage(null);
    }
  });


  return (
    <a.group ref={islandRef} {...props} dispose={null}>
      <primitive object={scene} />
    </a.group>
  );
}

useGLTF.preload(islandScene);
