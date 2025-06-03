import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ComputersCanvas from "./canvas/Computers";

const sections = [
    {
        id: '1',
        title: 'Enclosure',
        content:
            'A singular piece of three-dimensionally formed laminated glass flows into an aluminum alloy frame that curves to wrap around your face.',
    },
    {
        id: '2',
        title: 'Light Seal.',
        content:
            'The Light Seal gently flexes to conform to your face, delivering a precise fit while blocking out stray light.',
    },
    {
        id: '3',
        title: 'Head Band.',
        content:
            'The Head Band provides cushioning, breathability, and stretch. The Fit Dial lets you adjust Vision Pro precisely to your head.',
    },
    {
        id: '4',
        title: 'Power.',
        content:
            'The external battery supports up to 2 hours of use, and all‑day use when plugged in.',
    },
    {
        id: '5',
        title: 'Sound.',
        content:
            'Speakers positioned close to your ears deliver rich Spatial Audio while keeping you aware of your surroundings.',
    },
    {
        id: '6',
        title: 'EyeSight.',
        content:
            'An outward display reveals your eyes while wearing Vision Pro, letting others know when you are using apps or fully immersed.',
    },
];

const Computer = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    const sectionCount = sections.length;
    const progressPerSection = 1 / sectionCount;

    return (
        <section
            ref={ref}
            className="relative w-full h-[600vh] mx-auto bg-gray-900"
        >
            <div className="sticky top-0 h-screen w-full flex">
                {/* Left 50% - Text Content */}
                <div className="w-1/2 h-full flex items-center justify-center relative">
                    {sections.map((section, i) => {
                        const start = i * progressPerSection;
                        const end = start + progressPerSection;

                        const opacity = useTransform(
                            scrollYProgress,
                            [start, start + 0.1, end - 0.1, end],
                            [0, 1, 1, 0]
                        );

                        const translateY = useTransform(
                            scrollYProgress,
                            [start, start + 0.1, end - 0.1, end],
                            [50, 0, 0, -50]
                        );

                        const rotate = useTransform(
                            scrollYProgress,
                            [start, end],
                            [-10, 10]
                        );

                        return (
                            <motion.div
                                key={section.id}
                                className="absolute text-center px-4"
                                style={{
                                    opacity,
                                    y: translateY,
                                    rotateY: -10, // Initial tilt in Y-direction
                                    transformStyle: "preserve-3d", // Ensures 3D effect
                                }}
                                whileHover={{
                                    rotateY: 0,         // Animate to face front
                                    rotateX: 5,         // Slight upward tilt
                                    scale: 1.05,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 10,
                                    },
                                }}
                            >
                                <motion.h1 className="text-lime-400 text-6xl font-bold mb-4">
                                    {section.title}
                                </motion.h1>
                                <motion.p className="text-white text-2xl max-w-md mx-auto">
                                    {section.content}
                                </motion.p>
                            </motion.div>

                        );
                    })}
                </div>

                {/* Right 50% - ComputersCanvas */}
                <div className="w-1/2 h-full">
                    <ComputersCanvas scrollProgress={scrollYProgress} />
                </div>
            </div>
        </section>
    );
};

export default Computer;