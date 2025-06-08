const Slider = () => {
    return (
        <div
            style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                padding: "2rem 0",
                position: "relative",
                backgroundImage: "url('/images/hero.jpg')",
                backgroundSize: "cover",
                fontWeight: 'lighter',
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                color: "white", // text color on image
                userSelect: "none",
            }}
        >
            <div
                style={{
                    display: "inline-block",
                    paddingLeft: "100%",
                    animation: "slide-left 30s linear infinite",
                    fontSize: "5rem",
                    whiteSpace: "nowrap",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.7)", // improve text readability on bg
                }}
            >
                The places we heal shouldn’t harm the planet &nbsp; &nbsp; &nbsp;
                The places we heal shouldn’t harm the planet &nbsp; &nbsp; &nbsp;
                The places we heal shouldn’t harm the planet &nbsp; &nbsp; &nbsp;
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
