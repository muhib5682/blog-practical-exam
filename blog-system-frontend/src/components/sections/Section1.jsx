import { motion } from "framer-motion";
import { FaPenNib, FaComments, FaUsers, FaLock, FaCheckCircle } from "react-icons/fa";
import peoples from '../../assets/images/peoples.jpg'

const Section1 = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Image with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src={peoples}
            alt="Blog writers"
            className="rounded-lg shadow-lg w-full object-cover transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
          />
        </motion.div>

        {/* Right Content with Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6">
            Why Choose <span className="text-blue-400 dark:text-blue-400">YegnaBlog?</span>
          </h2>

     <ul className=" text-black-600 mb-2  dark:text-gray-300 space-y-3 mt-4">
        <p className="mb-2 text-base">
          YegnaBlog is a modern platform where you can:
        </p>

        <li className="flex px-4 items-center gap-2">
          <FaCheckCircle className="text-green-500"/> Share your ideas
        </li>
        <li className="flex px-4 items-center gap-2">
          <FaCheckCircle/>  Start discussions
        </li>
        <li className="flex px-4 items-center gap-2">
          <FaCheckCircle/>  Post securely
        </li>
        <li className="flex px-4 items-center gap-2">
          <FaCheckCircle/>  Connect with the community
        </li>
      </ul>


          
          

          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <FaPenNib className="text-blue-500 text-xl mt-1" />
              <span className="text-gray-700 dark:text-gray-200">
                <strong>Write Articles:</strong> Easily publish blog posts with clean formatting.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <FaComments className="text-green-500 text-xl mt-1" />
              <span className="text-gray-700 dark:text-gray-200">
                <strong>Join Discussions:</strong> Comment and engage with posts.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <FaUsers className="text-purple-500 text-xl mt-1" />
              <span className="text-gray-700 dark:text-gray-200">
                <strong>Connect with Others:</strong> Be part of an active blog community.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <FaLock className="text-red-500 text-xl mt-1" />
              <span className="text-gray-700 dark:text-gray-200">
                <strong>Secure & Simple:</strong> Register and manage your content with confidence.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Section1;
