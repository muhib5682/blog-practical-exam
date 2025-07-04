
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gray-100 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/*  Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80"
          alt="Blog background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/50 to-transparent dark:from-gray-900 dark:via-gray-800"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
          Share Your Voice with the World
        </h1>
        <p className="text-lg text-black-600 dark:text-gray-300 mb-8">
          Welcome to <span className="font-semibold text-blue-600 dark:text-blue-400">YegnaBLog</span>  platform for developers and thinkers to write, explore, and connect through powerful blog posts and thoughtful comments.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
             className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold px-6 py-3 rounded-lg shadow"
          >
            Explore Posts
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
