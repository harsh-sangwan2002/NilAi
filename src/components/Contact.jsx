import { useEffect, useRef, useState } from "react";
import NewsletterSignup from "./NewsletterSingnUp";

const Contact = () => {
    const mainText =
        "We’d love to hear from you. Whether you’re interested in learning more about NilAI, collaborating on an initiative, or sharing your insights, reach out! Together, we can amplify the impact and bring these hidden forces of change to the surface.";

    const textArray = mainText.split("");
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);
    const navbarHeight = 60; // Adjust this to match your navbar height

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.5 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => sectionRef.current && observer.unobserve(sectionRef.current);
    }, []);

    return (
        <div
            id="contact"
            ref={sectionRef}
            className="w-full h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden"
        >
            {/* Partition Lines (Below Navbar) */}
            <div className="fixed left-0 right-0 z-30 pointer-events-none">
                {/* Line at 25% */}
                <div
                    className="absolute w-[1px] bg-white"
                    style={{
                        left: "25%",
                        top: `${navbarHeight}px`,
                        height: `calc(100% - ${navbarHeight}px)`,
                    }}
                />
                {/* Line at 50% */}
                <div
                    className="absolute w-[1px] bg-white"
                    style={{
                        left: "50%",
                        top: `${navbarHeight}px`,
                        height: `calc(100% - ${navbarHeight}px)`,
                    }}
                />
                {/* Line at 75% */}
                <div
                    className="absolute w-[1px] bg-white"
                    style={{
                        left: "75%",
                        top: `${navbarHeight}px`,
                        height: `calc(100% - ${navbarHeight}px)`,
                    }}
                />
            </div>

            {/* Animated Heading */}
            <h1 className="relative text-3xl text-gray-500 font-bold text-center max-w-3xl px-4 z-40">
                {textArray.map((char, index) => (
                    <span
                        key={index}
                        className={`inline-block char-animate ${inView ? "animate-char" : ""}`}
                        style={{ animationDelay: `${index * 10}ms` }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}

                {/* Scratch Underline */}
                <svg
                    className="absolute bottom-[-30px] left-0 w-full h-12"
                    viewBox="0 0 300 20"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M10 15 L50 12 L100 18 L150 14 L200 16 L250 13 L290 17"
                        stroke="white"
                        strokeWidth="1"
                        fill="none"
                        className={`scratch-line ${inView ? "animate-scratch" : ""}`}
                    />
                </svg>
            </h1>

            {/* Contact Us Inside Scrambled Oval */}
            <div className="relative mt-16 h-[140px] flex items-center justify-center z-40">
                <p className="text-white text-8xl font-bold text-center z-10">
                    Contact Us
                </p>
            </div>

            <NewsletterSignup />


            {/* Styles */}
            <style>{`
                .char-animate {
                    color: grey;
                    opacity: 0;
                }
                .animate-char {
                    animation: colorChange 0.3s ease forwards;
                }

                @keyframes colorChange {
                    0% { color: grey; opacity: 0; }
                    100% { color: white; opacity: 1; }
                }

                .scratch-line {
                    stroke-dasharray: 300;
                    stroke-dashoffset: 300;
                }
                .animate-scratch {
                    animation: draw 1s ease forwards;
                }
                @keyframes draw {
                    to {
                        stroke-dashoffset: 0;
                    }
                }

                .scratch-oval {
                    stroke-dasharray: 300; /* Approx. perimeter of an ellipse */
                }
                .animate-oval {
                    stroke-dashoffset: 300;
                    animation: drawOval 2s ease forwards;
                }
                .reverse-oval {
                    stroke-dashoffset: 0;
                    animation: eraseOval 1s ease forwards;
                }
                @keyframes drawOval {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                @keyframes eraseOval {
                    to {
                        stroke-dashoffset: 300;
                    }
                }
            `}</style>
        </div>
    );
};

export default Contact;