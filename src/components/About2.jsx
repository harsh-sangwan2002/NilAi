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
                        if (onTypingComplete) onTypingComplete();
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
            className={`${className}`}
            style={{ whiteSpace: "pre-wrap" }}
        >
            {displayed}
            {!hasTyped && <span className="blinking-cursor">|</span>}
        </div>
    );
};

const About2 = () => {
    const [firstDone, setFirstDone] = useState(false);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Video */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src="/videos/3.mp4"
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Overlay Text Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center sm:px-10 bg-black/40">
                <TypingText
                    text="In recent years, the climate challenge has intensified. But with $2 trillion in infrastructure spending ahead..."
                    className="w-full text-yellow-300 max-w-3xl text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug mb-6"
                    startTyping={true}
                    onTypingComplete={() => setFirstDone(true)}
                />
                <TypingText
                    text="We have an opportunity to redesign the system without rebuilding it!"
                    className="w-full text-yellow-300 max-w-3xl text-lg sm:text-xl md:text-2xl lg:text-4xl leading-snug"
                    startTyping={firstDone}
                    forceStart={true}
                />
            </div>

            {/* Blinking Cursor */}
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

export default About2;
