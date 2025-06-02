import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const sections = [
    {
        id: '1',
        title: 'Enclosure',
        content:
            'A singular piece of three-dimensionally formed laminated glass flows into an aluminum alloy frame that curves to wrap around your face.',
        bgImage: '/img/img1.png',
    },
    {
        id: '2',
        title: 'Light Seal.',
        content:
            'The Light Seal gently flexes to conform to your face, delivering a precise fit while blocking out stray light.',
        bgImage: '/img/img2.png',
    },
    {
        id: '3',
        title: 'Head Band.',
        content:
            'The Head Band provides cushioning, breathability, and stretch. The Fit Dial lets you adjust Vision Pro precisely to your head.',
        bgImage: '/img/img3.png',
    },
    {
        id: '4',
        title: 'Power.',
        content:
            'The external battery supports up to 2 hours of use, and all‑day use when plugged in.',
        bgImage: '/img/img4.png',
    },
    {
        id: '5',
        title: 'Sound.',
        content:
            'Speakers positioned close to your ears deliver rich Spatial Audio while keeping you aware of your surroundings.',
        bgImage: '/img/1.webp',
    },
    {
        id: '6',
        title: 'EyeSight.',
        content:
            'An outward display reveals your eyes while wearing Vision Pro, letting others know when you are using apps or fully immersed.',
        bgImage: '/img/2.webp',
    },
];

export default function Strategies() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, -100]);

    const [currentBg, setCurrentBg] = useState(sections[0].bgImage);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((entry) => entry.isIntersecting);
                if (visible) {
                    const matchedSection = sections.find(
                        (sec) => sec.id === visible.target.getAttribute('data-id')
                    );
                    if (matchedSection) setCurrentBg(matchedSection.bgImage);
                }
            },
            { threshold: 0.6 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="app-container" style={{ position: 'relative', overflow: 'hidden' }}>
            <motion.div
                className="background-image"
                style={{
                    y,
                    position: 'fixed',
                    top: 100,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundImage: `url(${currentBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    objectFit: 'contain',
                    backgroundRepeat: 'no-repeat',
                    zIndex: -1,
                    pointerEvents: 'none',
                    transition: 'background-image 0.5s ease-in-out',
                }}
            />

            <main className="content">
                {sections.map((sec, index) => (
                    <div
                        key={sec.id}
                        ref={(el) => (sectionRefs.current[index] = el)}
                        data-id={sec.id}
                    >
                        <AnimatedSection
                            id={sec.id}
                            title={sec.title}
                            content={sec.content}
                            align={index % 2 === 0 ? 'left' : 'right'}
                        />
                    </div>
                ))}
            </main>
        </div>
    );
}
