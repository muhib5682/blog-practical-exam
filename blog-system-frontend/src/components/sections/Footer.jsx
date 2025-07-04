import { FaFacebookF, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-lg text-green-500 text- textfont-bold mb-2">YegnaBlog</h2>
          <p className="text-sm leading-relaxed">
            YegnaBlog is your platform to share ideas, stories, and knowledge. Join a growing
            community of passionate writers and tech learners.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/login" className="hover:text-blue-500">Login</Link></li>
            <li><Link to="/register" className="hover:text-blue-500">Register</Link></li>          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-blue-500 text-xl"><FaFacebookF /></a>
            <a href="#" className="text-gray-500 hover:text-blue-400 text-xl"><FaTwitter /></a>
            <a href="#" className="text-gray-500 hover:text-blue-600 text-xl"><FaLinkedin /></a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-xl"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/*  Copyright */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} YegnaBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
