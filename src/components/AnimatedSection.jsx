import { useEffect, useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedSection({ id, title, content, align = 'left' }) {
    const textRef = useRef();

    useEffect(() => {
        gsap.fromTo(
            textRef.current,
            { opacity: 0, x: align === 'left' ? -100 : 100 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top center+=100',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, [align]);

    const isLeft = align === 'left';

    return (
        <section
            id={id}
            className="min-h-screen flex items-center justify-between px-[5vw] relative scroll-mt-16"
        >
            {isLeft && (
                <>
                    <Tilt
                        className="w-[45%]"
                        tiltEnable={true}
                        tiltAngleXInitial={5}
                        tiltAngleYInitial={5}
                    >
                        <h1 ref={textRef} className="text-3xl md:text-4xl leading-relaxed">
                            <span className="text-pink-500 font-bold">{title}</span> {content}
                        </h1>
                    </Tilt>
                    <div className="w-[45%]"></div>
                </>
            )}
            {!isLeft && (
                <>
                    <div className="w-[45%]"></div>
                    <Tilt
                        className="w-[45%]"
                        tiltEnable={true}
                        tiltAngleXInitial={10}
                        tiltAngleYInitial={10}
                    >
                        <h1 ref={textRef} className="text-3xl md:text-4xl leading-relaxed text-right">
                            <span className="text-pink-500 font-bold">{title}</span> {content}
                        </h1>
                    </Tilt>
                </>
            )}
        </section>
    );
}
