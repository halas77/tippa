"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { ConnectAndSIWE } from "@/components/shared/ConnectAndSIWE";

// Animation variants
const badgeVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const headlineVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-20">
      {/* Animated Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="bg-gradient-to-tl blur-[50px] md:blur-[100px] w-[80vw] h-[70vh] rounded-full from-primary/5 via-primary/5 to-primary/5" />
        </motion.div>
      </motion.div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#aaaaaa1e_1px,transparent_1px),linear-gradient(to_bottom,#aaaaaa1e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_110%)]">
        <motion.div
          className="absolute inset-0 bg-grid-white/[0.02]"
          animate={{
            opacity: [0.3, 0.4, 0.3],
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          variants={badgeVariants}
          initial="initial"
          animate="animate"
        >
          <Badge
            variant="outline"
            className="mb-4 border-primary rounded-xl px-4 text-sm sm:text-base md:text-lg text-primary"
          >
            Powered by blockchain
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="mx-auto max-w-3xl sm:max-w-4xl md:max-w-6xl text-4xl sm:text-4xl md:text-7xl font-extrabold leading-snug sm:leading-tight text-white"
          variants={headlineVariants}
          initial="initial"
          animate="animate"
        >
          {["Tipping Layer for Social Networks"].map((text, idx) => (
            <motion.span
              key={idx}
              className="block"
              variants={{
                initial: { opacity: 0, x: idx === 0 ? -50 : 50 },
                animate: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  },
                },
              }}
            >
              {idx === 1 ? (
                <motion.span
                  className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                  }}
                >
                  {text}
                </motion.span>
              ) : (
                text
              )}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-4 sm:mt-6 max-w-md sm:max-w-xl md:max-w-2xl text-base sm:text-lg md:text-xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Tippa lets creators receive global tips and support with
          blockchain-powered security and transparency—anywhere, anytime, with
          seamless withdrawals.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-4"
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div variants={buttonVariants}>
            <ConnectAndSIWE />
          </motion.div>

          <motion.div variants={buttonVariants}>
            <Link href="#howitworks">
              <Button
                size="lg"
                variant="outline"
                className="z-20 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl border-white/20 hover:border-white/40 backdrop-blur-sm hover:bg-gray-200 cursor-pointer"
              >
                How It Works
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
