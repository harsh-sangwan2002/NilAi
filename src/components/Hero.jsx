import { useEffect, useState } from "react";

const scratchLines = [
    // Top lines
    { d: "M30 10 L35 12 L32 14 L36 13 L33 15 L37 12 L34 14 L38 11", delay: 0 },
    { d: "M32 12 L37 14 L34 16 L38 15 L35 17 L39 14 L36 16 L40 13", delay: 0.5 },
    { d: "M28 14 L33 16 L30 18 L34 17 L31 19 L35 16 L32 18 L36 15", delay: 1.0 },
    { d: "M34 11 L39 13 L36 15 L40 14 L37 16 L41 13 L38 15 L42 12", delay: 1.5 },
    { d: "M31 13 L36 15 L33 17 L37 16 L34 18 L38 15 L35 17 L39 14", delay: 2.0 },

    // Left side
    { d: "M5 30 L7 35 L9 32 L8 36 L10 33 L7 37 L9 34 L6 38", delay: 0.1 },
    { d: "M7 32 L9 37 L11 34 L10 38 L12 35 L9 39 L11 36 L8 40", delay: 0.4 },
    { d: "M9 28 L11 33 L13 30 L12 34 L14 31 L11 35 L13 32 L10 36", delay: 0.7 },
    { d: "M6 34 L8 39 L10 36 L9 40 L11 37 L8 41 L10 38 L7 42", delay: 1 },
    { d: "M8 31 L10 36 L12 33 L11 37 L13 34 L10 38 L12 35 L9 39", delay: 1.3 },

    // Below text
    { d: "M30 80 L35 82 L32 84 L36 83 L33 85 L37 82 L34 84 L38 81", delay: 0 },
    { d: "M32 82 L37 84 L34 86 L38 85 L35 87 L39 84 L36 86 L40 83", delay: 0.3 },
    { d: "M28 84 L33 86 L30 88 L34 87 L31 89 L35 86 L32 88 L36 85", delay: 0.6 },
    { d: "M34 81 L39 83 L36 85 L40 84 L37 86 L41 83 L38 85 L42 82", delay: 0.9 },
    { d: "M31 83 L36 85 L33 87 L37 86 L34 88 L38 85 L35 87 L39 84", delay: 1.2 },

    // Right side
    { d: "M80 30 L82 35 L84 32 L83 36 L85 33 L82 37 L84 34 L81 38", delay: 0.1 },
    { d: "M82 32 L84 37 L86 34 L85 38 L87 35 L84 39 L86 36 L83 40", delay: 0.4 },
    { d: "M84 28 L86 33 L88 30 L87 34 L89 31 L86 35 L88 32 L85 36", delay: 0.7 },
    { d: "M81 34 L83 39 L85 36 L84 40 L86 37 L83 41 L85 38 L82 42", delay: 1 },
    { d: "M83 31 L85 36 L87 33 L86 37 L88 34 L85 38 L87 35 L84 39", delay: 1.3 },
];

const Hero = () => {
    const [step, setStep] = useState(0);
    const totalImages = 8;

    // State to track which scratch line to display
    const [currentScratchIndex, setCurrentScratchIndex] = useState(null);

    useEffect(() => {
        if (step < totalImages) {
            const interval = setInterval(() => {
                setStep((prev) => prev + 1);
            }, 200);
            return () => clearInterval(interval);
        }
    }, [step]);

    // When video is playing, cycle through scratch lines randomly every 2.5s
    useEffect(() => {
        if (step >= totalImages) {
            // Initially pick a random line
            setCurrentScratchIndex(Math.floor(Math.random() * scratchLines.length));

            const scratchInterval = setInterval(() => {
                setCurrentScratchIndex((prev) => {
                    let next;
                    do {
                        next = Math.floor(Math.random() * scratchLines.length);
                    } while (next === prev);
                    return next;
                });
            }, 2500);

            return () => clearInterval(scratchInterval);
        }
    }, [step]);

    return (
        <div id="hero" className="w-full h-screen relative overflow-hidden flex flex-col items-center justify-center">
            {/* Video Background */}
            {step >= totalImages && (
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    src="/videos/1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            )}

            {/* Overlay Content */}
            <div className="z-20 flex flex-col items-center justify-center">
                {step < totalImages ? (
                    <>
                        <img
                            src={`/images/loading${step + 1}.webp`}
                            alt={`loading${step + 1}`}
                            className="w-48 h-48 object-contain transition-opacity duration-500 opacity-100"
                            key={step}
                        />
                        <div className="flex space-x-2 mt-4">
                            <span
                                className="w-3 h-3 bg-white rounded-full animate-bounce"
                                style={{ animationDelay: "0s" }}
                            />
                            <span
                                className="w-3 h-3 bg-white rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                            />
                            <span
                                className="w-3 h-3 bg-white rounded-full animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                            />
                        </div>
                    </>
                ) : (
                    <h1 className="text-white text-[12vw] font-bold animate-fadeInOut" style={{ textTransform: 'uppercase' }}> Breathe</h1>
                )}
            </div>

            {/* Single random scratch line SVG */}
            {step >= totalImages && currentScratchIndex !== null && (
                <svg
                    className="absolute w-full h-full z-10 pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <path
                        d={scratchLines[currentScratchIndex].d}
                        stroke="white"
                        strokeWidth="0.1"
                        fill="none"
                        className="scratch-line"
                        style={{ animationDelay: `${scratchLines[currentScratchIndex].delay}s` }}
                    />
                </svg>
            )}

            {/* Fallback background during loading */}
            {step < totalImages && <div className="absolute top-0 left-0 w-full h-full bg-black z-0" />}

            {/* CSS for Scratch Animation */}
            <style>
                {`
          .scratch-line {
            stroke-dasharray: 5, 3;
            stroke-dashoffset: 0;
            animation: scratch 2s linear infinite;
          }

          @keyframes scratch {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -20;
            }
          }

          @keyframes fadeInOut {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }

          .animate-fadeInOut {
            animation: fadeInOut 3s infinite;
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .animate-bounce {
            animation: bounce 1s infinite;
          }
        `}
            </style>
        </div>
    );
};

export default Hero;
