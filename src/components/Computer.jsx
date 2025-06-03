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

    // Transition ComputersCanvas from full width to half width
    const canvasWidth = useTransform(
        scrollYProgress,
        [0, 0.5],
        ["100%", "50%"]
    );

    // Move canvas to right once it reaches 50% scroll
    const canvasLeft = useTransform(
        scrollYProgress,
        [0, 0.5],
        ["0%", "50%"]
    );

    const showText = useTransform(
        scrollYProgress,
        [0.45, 0.5],
        [0, 1]
    );

    return (
        <section
            ref={ref}
            className="relative w-full h-[600vh] mx-auto bg-gray-900"
        >
            <div className="sticky top-0 h-screen w-full">
                {/* Canvas with animated position and width */}
                <motion.div
                    className="absolute top-0 h-full"
                    style={{
                        width: canvasWidth,
                        left: canvasLeft,
                        transition: "width 0.3s ease, left 0.3s ease",
                    }}
                >
                    <ComputersCanvas scrollProgress={scrollYProgress} />
                </motion.div>

                {/* Text container */}
                <motion.div
                    className="absolute top-0 left-0 h-full w-1/2 flex items-center justify-center"
                    style={{
                        opacity: showText,
                        pointerEvents: "none", // avoids blocking canvas before it shows
                    }}
                >
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

                        return (
                            <motion.div
                                key={section.id}
                                className="absolute text-center px-4"
                                style={{ opacity, y: translateY }}
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
                </motion.div>
            </div>
        </section>
    );
};

export default Computer;
