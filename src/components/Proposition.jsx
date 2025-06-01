import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaChartPie, FaCog, FaNetworkWired, FaSearchLocation } from "react-icons/fa";

const propositions = [
    {
        icon: <FaChartPie size={60} className="text-lime-400 mb-6" />,
        title: "Predictive Analytics",
        description:
            "AI-powered predictive analytics to analyze real-time NHS hospital data, identifying inefficiencies in energy, water, and operational workflows.",
    },
    {
        icon: <FaCog size={60} className="text-lime-400 mb-1" />,
        title: "Anomaly Detection & Optimization",
        description:
            "Automated anomaly detection and prescriptive insights reduce energy waste by cutting HVAC loads and inefficient equipment usage.",
    },
    {
        icon: <FaNetworkWired size={60} className="text-lime-400 mb-6" />,
        title: "API Integration",
        description:
            "Seamless API integration with NHS Building Management Systems enables real-time resource monitoring, automated adjustments, and operational dashboards.",
    },
    {
        icon: <FaSearchLocation size={60} className="text-lime-400 mb-6" />,
        title: "Sustainability Tracking",
        description:
            "AI-enhanced sustainability tracking uses digital twins, carbon modeling, and forecasting to help NHS trusts achieve net-zero emissions.",
    },
];

const Proposition = () => {
    return (
        <section id="proposition" className="w-full bg-gray-900 py-24 px-6">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-lime-400 text-2xl md:text-3xl uppercase tracking-wider"
                >
                    Our Value Proposition
                </motion.h2>
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white text-4xl md:text-5xl font-bold mt-4"
                >
                    Empowering AI for Sustainable Healthcare
                </motion.h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
                {propositions.map((prop, index) => (
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
                            className="bg-[#1c1c1e] rounded-2xl p-10 flex flex-col items-center text-center shadow-2xl hover:shadow-lime-400/30 transition duration-300 min-h-[440px]"
                        >
                            {prop.icon}
                            <h4 className="text-lime-400 text-xl md:text-2xl font-bold mb-4">
                                {prop.title}
                            </h4>
                            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                                {prop.description}
                            </p>
                        </Tilt>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Proposition;
