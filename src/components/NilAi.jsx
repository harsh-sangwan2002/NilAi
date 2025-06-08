import { useEffect, useRef, useState } from "react";

const NilAi = () => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                }
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, [hasAnimated]);

    return (
        <div
            id="about"
            ref={containerRef}
            className="w-full h-screen relative overflow-hidden flex flex-col items-center justify-center"
        >
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src="/videos/7.mp4"
                autoPlay
                muted
                loop
                playsInline
            />

            {/* Overlay Content */}
            <div className="z-20 flex flex-col items-center justify-center text-center px-4">
                <h1
                    className={`text-white text-[3.8vw] font-bold leading-snug transition-opacity duration-[1000ms] ease-in ${hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                        }`}
                >
                    NilAi — the world’s first <br />
                    virtual energy auditor for healthcare.
                    <br />
                    <span className="text-[3vw] font-medium mt-2 block">Powered by AI!</span>
                </h1>
            </div>
        </div>
    );
};

export default NilAi;
