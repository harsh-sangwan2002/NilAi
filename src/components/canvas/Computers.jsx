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
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [modelY, setModelY] = useState(isMobile ? -3 : -3.25); // Initial Y position

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 500px)");
        setIsMobile(mediaQuery.matches);

        const handleChange = (e) => setIsMobile(e.matches);
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        let lastY = 0;

        const handleMouseDown = (event) => {
            if (event.button === 0) { // Left-click
                setIsDragging(true);
                setStartY(event.clientY);
                lastY = event.clientY;
            }
        };

        const handleMouseMove = (event) => {
            if (isDragging) {
                const deltaY = event.clientY - lastY;
                lastY = event.clientY;
                setModelY((prev) => {
                    const newY = prev - deltaY * 0.01; // Adjust sensitivity
                    return Math.max(-5, Math.min(1, newY)); // Clamp between -5 and 1
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("mouseleave", handleMouseUp); // Stop dragging if mouse leaves canvas

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseup", handleMouseUp);
            canvas.removeEventListener("mouseleave", handleMouseUp);
        };
    }, [isDragging]);

    return (
        <Canvas
            ref={canvasRef}
            frameloop="always"
            shadows
            dpr={[1, 2]}
            camera={{ position: [100, 5, 5], fov: 25, zoom: 1 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    ref={controlsRef}
                    enableZoom={true}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                    enablePan={false}
                    minZoom={0.5}
                    maxZoom={2}
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