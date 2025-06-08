import { useEffect, useRef, useState } from "react";

const cards = [
    {
        image: "/images/about1.jpg",
        title: "Carbon Reduction",
        desc: "Track and minimize emissions with actionable AI insights.",
    },
    {
        image: "/images/about2.jpg",
        title: "Cost Optimization",
        desc: "Slash energy bills through smart real-time analysis.",
    },
    {
        image: "/images/about3.jpg",
        title: "Non-Disruptive",
        desc: "Sustainability without interrupting critical care.",
    },
    {
        image: "/images/cover1.jpg",
        title: "Actionable Insights",
        desc: "Make smart decisions from your existing data systems.",
    },
];

const TRANSITION_DURATION = 500;

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(null);
    const [direction, setDirection] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const onWheel = (e) => {
            if (isAnimating) return;

            if (e.deltaY > 10) {
                setDirection("left");
                setNextIndex((currentIndex + 1) % cards.length);
                setIsAnimating(true);
            } else if (e.deltaY < -10) {
                setDirection("right");
                setNextIndex((currentIndex - 1 + cards.length) % cards.length);
                setIsAnimating(true);
            }
        };

        const el = containerRef.current;
        el?.addEventListener("wheel", onWheel, { passive: true });

        return () => el?.removeEventListener("wheel", onWheel);
    }, [currentIndex, isAnimating]);

    useEffect(() => {
        if (isAnimating && nextIndex !== null) {
            const timeout = setTimeout(() => {
                setCurrentIndex(nextIndex);
                setNextIndex(null);
                setIsAnimating(false);
                setDirection(null);
            }, TRANSITION_DURATION);
            return () => clearTimeout(timeout);
        }
    }, [isAnimating, nextIndex]);

    return (
        <div
            id="works"
            className="relative w-full min-h-screen bg-gray-900 text-white overflow-hidden"
        >
            {/* Background Image */}
            <img
                src="/images/projects.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Foreground Description */}
            <div
                className="absolute z-10 px-4 sm:px-8 md:px-20 top-10 sm:top-20 w-full text-center sm:text-left max-w-3xl text-lg sm:text-2xl leading-relaxed"
                style={{
                    transform:
                        isAnimating && direction === "left"
                            ? "translateX(-100vw)"
                            : isAnimating && direction === "right"
                                ? "translateX(100vw)"
                                : "translateX(0)",
                    opacity: isAnimating ? 0 : 1,
                    transition: `all ${TRANSITION_DURATION}ms ease`,
                }}
            >
                We help hospitals optimize energy use, reduce carbon emissions, and lower costs — without
                disrupting critical care. By unlocking real-time insights from existing systems, we make
                sustainability simple, secure, and actionable.
            </div>

            {/* Card Carousel */}
            <div
                ref={containerRef}
                className="relative z-20 mt-[30vh] flex flex-col items-center"
            >
                <div className="relative w-[90%] max-w-md h-[480px]">
                    {/* Current Card */}
                    <div
                        key={`current-${currentIndex}`}
                        className="absolute top-0 left-0 w-full h-full bg-orange-500 text-white rounded-lg shadow-lg flex flex-col items-center transition-all duration-500 ease-in-out"
                        style={{
                            transform:
                                isAnimating && direction === "left"
                                    ? "translateX(-100vw)"
                                    : isAnimating && direction === "right"
                                        ? "translateX(100vw)"
                                        : "translateX(0)",
                            opacity: isAnimating ? 0 : 1,
                            zIndex: 10,
                        }}
                    >
                        <img
                            src={cards[currentIndex].image}
                            alt={cards[currentIndex].title}
                            className="w-full h-80 object-cover rounded-t-lg"
                        />
                        <h2 className="text-2xl font-semibold mt-4 px-4">{cards[currentIndex].title}</h2>
                        <p className="text-center mt-2 px-6 text-base">{cards[currentIndex].desc}</p>
                    </div>

                    {/* Next Card */}
                    {isAnimating && nextIndex !== null && (
                        <div
                            key={`next-${nextIndex}`}
                            className="absolute top-0 left-0 w-full h-full bg-orange-400 text-white rounded-lg shadow-lg flex flex-col items-center transition-all duration-500 ease-in-out"
                            style={{
                                transform:
                                    direction === "left"
                                        ? "translateX(100vw)"
                                        : "translateX(-100vw)",
                                opacity: 0.5,
                                zIndex: 20,
                            }}
                            ref={(el) => {
                                if (el) {
                                    requestAnimationFrame(() => {
                                        el.style.transform = "translateX(0)";
                                        el.style.opacity = "1";
                                    });
                                }
                            }}
                        >
                            <img
                                src={cards[nextIndex].image}
                                alt={cards[nextIndex].title}
                                className="w-full h-80 object-cover rounded-t-lg"
                            />
                            <h2 className="text-2xl font-semibold mt-4 px-4">{cards[nextIndex].title}</h2>
                            <p className="text-center mt-2 px-6 text-base">{cards[nextIndex].desc}</p>
                        </div>
                    )}
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center space-x-3 mt-6">
                    {cards.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                if (isAnimating || idx === currentIndex) return;
                                setDirection(idx > currentIndex ? "left" : "right");
                                setNextIndex(idx);
                                setIsAnimating(true);
                            }}
                            className={`w-4 h-4 rounded-full transition duration-300 ${idx === currentIndex
                                ? "bg-orange-400"
                                : "bg-gray-400"
                                }`}
                            aria-label={`Go to card ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
