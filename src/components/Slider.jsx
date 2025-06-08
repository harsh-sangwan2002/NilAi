import { useEffect, useRef, useState } from "react";

const Slider = () => {
    const containerRef = useRef(null);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Bump animation key to re-trigger animation
                    setAnimationKey(prev => prev + 1);
                }
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                overflow: "hidden",
                position: "relative",
                backgroundImage: "url('/images/hero.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                color: "white",
                userSelect: "none",
                height: "100vh",
                width: "100%",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    whiteSpace: "nowrap",
                }}
            >
                <div
                    key={animationKey} // <- re-renders when key changes
                    style={{
                        display: "inline-block",
                        paddingLeft: "100%",
                        animation: "slide-left 10s linear infinite",
                        fontSize: "12vw",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                        textTransform: "uppercase",
                        textAlign: "center",
                    }}
                >
                    The places we heal shouldn’t harm the planet &nbsp; &nbsp; &nbsp;
                </div>
            </div>

            <style>
                {`
                    @keyframes slide-left {
                        0% {
                            transform: translateX(0%);
                        }
                        100% {
                            transform: translateX(-100%);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Slider;
