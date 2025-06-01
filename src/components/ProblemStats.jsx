import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ProblemStats = () => {
  const stats = [
    {
      value: "4%",
      description: "of the UK's total emissions come from NHS operations (HECC report, 2023)",
    },
    {
      value: "£1.4B",
      description: "NHS deficit limiting investment in sustainability (NHS Financial Management Report, 2024)",
    },
    {
      value: "137M MWh & 618M liters",
      description: "Annual NHS energy & water usage, with limited AI optimization (ICS Green Plan Annual Report, 2024)",
    },
    {
      value: "62%",
      description: "Reduction in NHS carbon footprint since 1990, but further action is needed (NHS Carbon Footprint Report, 2024)",
    },
  ];

  return (
    <section id="problem" className="bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <div className="space-y-12">
          {stats.map((stat, index) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: false, margin: "-100px" });

            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                className="flex items-center gap-6"
              >
                {/* Left Side: Value */}
                <div className="flex-shrink-0 w-1/3">
                  <span className="text-white text-3xl md:text-4xl font-bold border-2 border-white rounded-full px-6 py-3 inline-block">
                    {stat.value}
                  </span>
                </div>
                {/* Right Side: Description */}
                <div className="w-2/3">
                  <p className="text-white text-lg md:text-xl leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemStats;
