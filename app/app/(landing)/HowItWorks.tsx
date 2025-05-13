"use client";

import { motion } from "framer-motion";
import MyTimeline from "./Timeline";

const HowItWorks = () => {
  return (
    <section id="howitworks" className="relative z-10 py-14">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-50 mb-4"
        >
          How Tippa Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-secondary max-w-2xl mx-auto md:text-lg"
        >
          Receiving tips on the blockchain is easy, fast, and transparent. Start
          getting support from your fans in just a few steps:
        </motion.p>

        <div className="relative max-w-5xl mx-auto mt-10">
          <MyTimeline />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
