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

const About3 = () => {
    const [firstDone, setFirstDone] = useState(false);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Video */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src="/videos/4.mp4"
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 sm:px-8 text-center bg-black/40">
                {/* First TypingText */}
                <TypingText
                    text="Healthcare alone contributes 4.4% of global emissions, more than the entire aviation industry."
                    className="w-full max-w-3xl text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-snug mb-6"
                    startTyping={true}
                    onTypingComplete={() => setFirstDone(true)}
                />

                {/* Second TypingText */}
                <TypingText
                    text="Hospitals run 24/7. Critical equipment never sleeps. Audits today?"
                    className="w-full max-w-3xl text-lg sm:text-xl md:text-2xl lg:text-4xl leading-snug text-white"
                    startTyping={firstDone}
                    forceStart={true}
                />
            </div>

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

export default About3;
