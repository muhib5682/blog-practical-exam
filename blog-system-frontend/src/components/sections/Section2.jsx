import { FaUserAlt, FaPenFancy, FaCommentDots } from "react-icons/fa";
import worldmap from "../../assets/images/world_map.jpg";
import { Link } from "react-router-dom";

const Section2 = () => {
  return (
    <section className="relative min-h-[600px] bg-orange-500 dark:bg-gray-900 text-white dark:text-gray-100 py-24 overflow-hidden transition-colors duration-700  flex items-center justify-center ">
      {/* World map background */}
      <img
        src={worldmap}
        alt="World Map"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* Floating icons */}
      <div className="absolute top-20 left-10 text-center text-orange-100 dark:text-gray-400">
        <FaUserAlt className="text-2xl" />
      </div>
      <div className="absolute bottom-32 left-16 text-center text-orange-100 dark:text-gray-400">
        <FaPenFancy className="text-2xl" />
      </div>
      <div className="absolute top-24 right-16 text-center text-orange-100 dark:text-gray-400">
        <FaCommentDots className="text-2xl" />
      </div>
      <div className="absolute bottom-20 right-24 text-center text-orange-100 dark:text-gray-400">
        <FaUserAlt className="text-2xl" />
      </div>

      {/* Center Content */}
      <div className="relative max-w-3xl mx-auto text-center px-4 z-10">
        <h2 className="text-4xl font-bold mb-4">
          Join millions of others
        </h2>
        <p className="text-lg mb-8">
          Whether you're writing tutorials, sharing ideas, or starting discussions.
          <span className="font-semibold text-white dark:text-blue-400"> YegnaBlog </span>
          is where devs and thinkers unite.
          Sign up to share your voice with the world.
        </p>
        <button className="bg-white dark:bg-blue-600 text-orange-600 dark:text-white hover:bg-orange-100 dark:hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold shadow transition">
          <Link to="/register">
             CREATE YOUR BLOG
          </Link>
          
        </button>
      </div>
    </section>
  );
};

export default Section2;
