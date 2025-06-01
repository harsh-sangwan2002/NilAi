import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Problem = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="problem" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[20px] text-white">
          Welcome to NilAi
        </p>

        <AnimatedTitle
          title="The Problem"
          containerClass="mt-5 !text-lime-400 text-center"
        />

        <div className="about-subtext mt-30">
          <p className="text-lime-400 mt-30">A Sustainability Challenge in HealthCare </p>
          <p className="text-white">
            - NHS hospitals face rising operational costs, inefficient resource use, and increasing sustainability pressures.Despite ambitious net-zero targets, challenges in data fragmentation, waste management, and energy inefficiences persis, leading to
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/7.png"
            alt="Background"
            className="absolute left-0 top--8 size-full object-cover mb-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Problem;
