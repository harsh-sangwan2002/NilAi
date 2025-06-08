const Slider = () => {
    return (
        <div
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
                    style={{
                        display: "inline-block",
                        paddingLeft: "100%",
                        animation: "slide-left 40s linear infinite",
                        fontSize: "6vw",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                        textTransform: "uppercase",
                        textAlign: "center",
                    }}
                >
                    The places we heal shouldn’t harm the planet &nbsp; &nbsp; &nbsp;
                    The places we heal shouldn’t harm the planet &nbsp; &nbsp; &nbsp;
                    The places we heal shouldn’t harm the planet &nbsp; &nbsp; &nbsp;
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
