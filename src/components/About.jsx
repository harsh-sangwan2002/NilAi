import { useEffect, useState, useRef } from "react";

const TypingText = ({ text, className, startTyping, onTypingComplete, forceStart = false }) => {
    const [displayed, setDisplayed] = useState("");
    const [visible, setVisible] = useState(false);
    const [hasTyped, setHasTyped] = useState(false);
    const containerRef = useRef(null);
    const typingInterval = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.5 }
        );

        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
            clearInterval(typingInterval.current);
        };
    }, []);

    useEffect(() => {
        clearInterval(typingInterval.current);

        if ((visible || forceStart) && startTyping && !hasTyped) {
            let index = 0;
            setDisplayed("");
            typingInterval.current = setInterval(() => {
                setDisplayed((prev) => {
                    if (index >= text.length) {
                        clearInterval(typingInterval.current);
                        setHasTyped(true);
                        onTypingComplete?.();
                        return prev;
                    }
                    const nextText = text.slice(0, index + 1);
                    index++;
                    return nextText;
                });
            }, 50);
        } else if (hasTyped) {
            setDisplayed(text);
        } else {
            setDisplayed("");
        }

        return () => clearInterval(typingInterval.current);
    }, [visible, startTyping, text, hasTyped, onTypingComplete, forceStart]);

    return (
        <div
            ref={containerRef}
            className={`${className} text-white`}
            style={{ whiteSpace: "pre-wrap" }}
        >
            {displayed}
            {!hasTyped && <span className="blinking-cursor">|</span>}
        </div>
    );
};

const About = () => {
    const [firstDone, setFirstDone] = useState(false);

    return (
        <div id="problem" className="relative w-full h-screen overflow-hidden">
            {/* Background Video */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src="/videos/2.mp4"
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Overlay Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center sm:px-8 bg-black/40">
                <TypingText
                    text="The built environment is a testament to human ingenuity... But progress comes at a cost."
                    className="w-full max-w-2xl text-2xl sm:text-3xl md:text-4xl leading-snug mb-8"
                    startTyping={true}
                    onTypingComplete={() => setFirstDone(true)}
                />
                <TypingText
                    text="37% of global energy uses 39% of CO₂ emissions Tied to the built environment."
                    className="w-full max-w-2xl text-xl sm:text-2xl md:text-3xl leading-snug"
                    startTyping={firstDone}
                    forceStart={true}
                />
            </div>

            {/* Blinking Cursor Style */}
            <style>{`
                .blinking-cursor {
                    font-weight: 100;
                    font-size: 24px;
                    color: white;
                    animation: blink 1s infinite;
                    user-select: none;
                }
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default About;
