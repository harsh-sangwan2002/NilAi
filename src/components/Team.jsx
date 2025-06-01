import gsap from "gsap";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TeamProfiles = () => {
  const profileRefs = [useRef(null), useRef(null)];

  const teamMembers = [
    {
      name: "JEBARSON RAVIKUMAR",
      title: "Chief Executive Officer / Co-Founder",
      description:
        "• MSc Business Management, University of London (2024-2025).\n" +
        "• Founding Partner at Zentry, focusing on strategic growth and innovation.\n" +
        "• Passionate about leveraging technology to empower communities.\n" +
        "• Driven by a vision to create impactful solutions.",
      imageSrc: "/img/ravi.jpeg",
    },
    {
      name: "JAGATHEESWARI MANIVASAKAN",
      title: "Chief Technology & Innovation Officer / Co-Founder",
      description:
        "• MSc Computer Science, University of London (2024-2025).\n" +
        "• Founding Partner at Zentry, speaheaded the tech development.\n" +
        "• Enthusiast in AI, ML, Data Science, blockchain, and immersive tech.\n" +
        "• Committed to transforming ideas into reality.",
      imageSrc: "/img/manvi.jpeg",
    },
  ];

  const handleMouseMove = (e, index) => {
    const { clientX, clientY } = e;
    const element = profileRefs[index].current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = (index) => {
    const element = profileRefs[index].current;
    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="team" className="min-h-screen w-full bg-gray-900 text-blue-50 py-20 px-4 md:px-20">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl md:text-3xl font-extrabold text-green-400 mb-16 text-center">
          The Team - NilAI
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0 justify-center items-center">
          {teamMembers.map((member, index) => {
            const ref = profileRefs[index];
            const isInView = useInView(ref, { once: false, margin: "-100px" });

            return (
              <motion.div
                key={index}
                ref={ref}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full md:w-[45%] bg-black p-8 rounded-3xl shadow-xl cursor-pointer min-h-[480px] transform-style-preserve-3d will-change-transform"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  perspective: "1000px", // optional enhancement
                }}
              >
                <div className="flex items-center space-x-6 mb-6">
                  <img
                    src={member.imageSrc}
                    alt={member.name}
                    className="w-24 h-24 object-cover rounded-full border-4 border-green-400"
                  />
                  <div>
                    <h3 className="text-xl md:text-4xl font-bold">{member.name}</h3>
                    <p className="text-md md:text-lg text-gray-300">{member.title}</p>
                  </div>
                </div>
                <p className="text-2xl whitespace-pre-line leading-relaxed text-gray-200">
                  {member.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamProfiles;
