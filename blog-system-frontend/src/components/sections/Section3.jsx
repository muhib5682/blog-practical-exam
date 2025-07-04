import React from "react";
import { motion } from "framer-motion";
import { FaPenFancy, FaShareAlt, FaUsers } from "react-icons/fa";

const steps = [
  {
    icon: <FaPenFancy />,
    title: "Write a Post",
    desc: "Share tutorials, stories, and tech insights easily with powerful markdown tools.",
  },
  {
    icon: <FaShareAlt />,
    title: "Engage & React",
    desc: "Get feedback, spark discussions, and grow your ideas with reactions and comments.",
  },
  {
    icon: <FaUsers />,
    title: "Build Your Network",
    desc: "Follow developers, collaborate, and grow your influence in the coding world.",
  },
];

const Section3 = () => {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden transition duration-500">
      {/* Blur blobs */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-blue-300 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 opacity-20 rounded-full filter blur-2xl animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto text-center z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4 leading-tight">
          The Simpler Way to <span className="text-blue-600 dark:text-yellow-400">Blog & Connect</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-16">
          From publishing your first post to connecting with a global tech audience, YegnaBlog helps you get there faster and better.
        </p>

        {/* 3-column Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all rounded-2xl px-6 py-10 text-center max-w-sm"
            >
              <div className="mx-auto mb-5 w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-2xl">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;
