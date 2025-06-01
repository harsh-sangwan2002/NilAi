import { motion } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import Tilt from "react-parallax-tilt";

const features = [
    {
        title: "Smart Hospital Resource Management",
        description:
            "AI-driven optimization of hospital energy and resource usage to minimize waste and cut costs",
        image: "/img/hospital.jpeg",
    },
    {
        title: "Sustainable Healthcare Operations",
        description:
            "Automated efficiency insights to help NHS hospitals achieve net-zero sustainability goals",
        image: "/img/healthcare.jpeg",
    },
    {
        title: "Real-Time Monitoring & Reporting",
        description:
            "AI-powered dashboards provide live analytics on energy, water, and operational efficiencies for informed decision-making",
        image: "/img/monitoring.jpeg",
    },
];

const City = () => {
    return (
        <section id="solution" className="w-full bg-gray-900 py-24 px-6">
            <div className="text-center mb-16">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-green-400 uppercase tracking-widest text-xl md:text-2xl"
                >
                    NilAi's Approach
                </motion.p>
                <AnimatedTitle
                    title="The Solution"
                    containerClass="mt-4 !text-white text-center text-4xl md:text-5xl"
                />
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-gray-300 text-xl md:text-2xl mt-6 max-w-4xl mx-auto"
                >
                    AI-Powered Sustainability for Healthcare
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: false, amount: 0.4 }}
                    >
                        <Tilt
                            glareEnable={true}
                            glareMaxOpacity={0.15}
                            glareColor="#00FF94"
                            tiltMaxAngleX={10}
                            tiltMaxAngleY={10}
                            transitionSpeed={250}
                            className="bg-[#1c1c1e] rounded-2xl p-10 flex flex-col items-center text-center shadow-2xl hover:shadow-green-400/30 transition duration-300 min-h-[480px]"
                        >
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="w-70 h-70 object-contain mb-8"
                            />
                            <h3 className="text-lime-400 font-bold uppercase text-xl md:text-2xl mb-4 leading-snug">
                                {feature.title}
                            </h3>
                            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                                {feature.description}
                            </p>
                        </Tilt>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default City;