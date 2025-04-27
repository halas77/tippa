"use client";

import { Sparkles, Wallet, SendHorizontal, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <Wallet className="h-5 w-5" />,
    title: "Connect Wallet",
    description:
      "Sign in with your Web3 wallet to start receiving tips securely and instantly.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Create Your Page",
    description:
      "Set up your Tipper profile with your name, bio, and social links in seconds.",
  },
  {
    icon: <SendHorizontal className="h-5 w-5" />,
    title: "Share Your Link",
    description:
      "Promote your tip page anywhere — on Twitter, Instagram, or your blog.",
  },
  {
    icon: <ThumbsUp className="h-5 w-5" />,
    title: "Receive Tips",
    description:
      "Get tips from fans directly to your wallet with on-chain transparency and no middlemen.",
  },
];

const HowItWorks = () => {
  return (
    <section id="howitworks" className="relative z-10 py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8 text-primary"
        >
          How Typpr Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16 text-xl text-gray-300 max-w-3xl mx-auto"
        >
          Receiving tips on the blockchain is easy, fast, and transparent. Start
          getting support from your fans in just a few steps:
        </motion.p>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group px-4 py-8  bg-gradient-to-b from-white/5 to-transparent rounded-3xl border border-[#8B5A2B]/30 hover:border-[#D7A36D]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#8B5A2B]/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B5A2B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#8B5A2B] to-[#5A2E00] shadow-lg text-white">
                  {step.icon}
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#D7A36D] to-[#8B5A2B] bg-clip-text text-transparent">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-white">
                {step.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
