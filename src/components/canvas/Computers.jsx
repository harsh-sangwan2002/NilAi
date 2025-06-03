import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { useSpring } from "framer-motion";

const ComputersModel = ({ isMobile, scrollProgress, position }) => {
    const ref = useRef();
    const computer = useGLTF("./models/model.glb");

    const spring = useSpring(scrollProgress, { stiffness: 80, damping: 20 });

    useFrame(() => {
        const progress = spring.get();

        if (ref.current) {
            ref.current.rotation.y = progress * Math.PI * 2;
            ref.current.rotation.x = 0;
            ref.current.rotation.z = 0;
        }
    });

    return (
        <mesh ref={ref}>
            <hemisphereLight intensity={0.15} groundColor="black" />
            <spotLight
                position={[-20, 50, 10]}
                angle={0.12}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize={1024}
            />
            <pointLight intensity={1} />
            <primitive
                object={computer.scene}
                scale={isMobile ? 0.7 : 0.75}
                position={position} // ← ✅ Use dynamic Y position
            />
        </mesh>
    );
};


const ComputersCanvas = ({ scrollProgress }) => {
    const [isMobile, setIsMobile] = useState(false);
    const controlsRef = useRef();
    const canvasRef = useRef();
    const cameraRef = useRef();
    const [isDragging, setIsDragging] = useState(false);
    const [modelY, setModelY] = useState(-3.25);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 500px)");
        setIsMobile(mediaQuery.matches);

        const handleChange = (e) => setIsMobile(e.matches);
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    // Drag-to-move Y-axis interaction
    useEffect(() => {
        const canvas = canvasRef.current;
        let lastY = 0;

        const handleMouseDown = (e) => {
            if (e.button === 0) {
                setIsDragging(true);
                lastY = e.clientY;
            }
        };

        const handleMouseMove = (e) => {
            if (isDragging) {
                const deltaY = e.clientY - lastY;
                lastY = e.clientY;
                setModelY((prev) => Math.max(-5, Math.min(1, prev - deltaY * 0.01)));
            }
        };

        const stopDragging = () => setIsDragging(false);

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", stopDragging);
        canvas.addEventListener("mouseleave", stopDragging);

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseup", stopDragging);
            canvas.removeEventListener("mouseleave", stopDragging);
        };
    }, [isDragging]);

    // Manual zoom control
    useEffect(() => {
        const canvas = canvasRef.current;
        const handleWheel = (e) => {
            if (!(e.ctrlKey || e.metaKey)) return;

            e.preventDefault(); // prevent default scroll
            const zoomSpeed = 0.05;
            if (cameraRef.current) {
                const newZoom = cameraRef.current.zoom + (e.deltaY > 0 ? -zoomSpeed : zoomSpeed);
                cameraRef.current.zoom = Math.min(2, Math.max(0.5, newZoom));
                cameraRef.current.updateProjectionMatrix();
            }
        };

        canvas.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            canvas.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <Canvas
            ref={canvasRef}
            frameloop="always"
            shadows
            dpr={[1, 2]}
            camera={{ position: [100, 5, 5], fov: 25, zoom: 1 }}
            onCreated={({ camera }) => {
                cameraRef.current = camera;
            }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    ref={controlsRef}
                    enableZoom={false} // Disable default zoom
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                    enablePan={false}
                />
                <ComputersModel
                    isMobile={isMobile}
                    scrollProgress={scrollProgress}
                    position={[0, modelY, isMobile ? -2.2 : -1.5]}
                />
            </Suspense>
            <Preload all />
        </Canvas>
    );
};


export default ComputersCanvas;