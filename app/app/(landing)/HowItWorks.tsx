"use client";

import { Sparkles, Wallet, SendHorizontal, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Connect Wallet",
    description:
      "Sign in with your Web3 wallet to start receiving tips securely and instantly.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Create Your Page",
    description:
      "Set up your Tipper profile with your name, bio, and social links in seconds.",
  },
  {
    icon: <SendHorizontal className="h-6 w-6" />,
    title: "Share Your Link",
    description:
      "Promote your tip page anywhere — on Twitter, Instagram, or your blog.",
  },
  {
    icon: <ThumbsUp className="h-6 w-6" />,
    title: "Receive Tips",
    description:
      "Get tips from fans directly to your wallet with on-chain transparency and no middlemen.",
  },
];

const HowItWorks = () => {
  return (
    <section id="howitworks" className="relative z-10 py-14">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-5xl font-bold mb-12 text-center bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent"
        >
          How Tippa Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-20 text-lg text-gray-300 max-w-2xl mx-auto text-center leading-relaxed"
        >
          Receiving tips on the blockchain is easy, fast, and transparent. Start
          getting support from your fans in just a few steps:
        </motion.p>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-[#8B5A2B]/30 to-[#5A2E00]/10" />

          <div className="grid gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                className="relative pl-24 group"
              >
                <div className="absolute left-0 top-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5A2B] to-[#5A2E00] flex items-center justify-center shadow-lg ring-2 ring-[#8B5A2B]/50 ring-inset">
                  <span className="text-white/90">{step.icon}</span>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-primary bg-[#5A2E00]/50 px-3 py-1 rounded-full">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-300/90 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
