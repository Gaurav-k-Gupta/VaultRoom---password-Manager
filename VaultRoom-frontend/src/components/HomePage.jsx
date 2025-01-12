import React from 'react';
import { FaLock, FaShieldAlt, FaUserPlus } from 'react-icons/fa';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#081229] flex flex-col">
      {/* Header */}
      <header className="bg-[#191d3a] text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            {/* Logo */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="40" height="40" className="mr-2">
              <circle cx="100" cy="100" r="90" fill="#ec5990" stroke="#ffffff" stroke-width="14" />
              <circle cx="100" cy="100" r="70" fill="white" stroke="#ec5990" stroke-width="8" />
              <circle cx="100" cy="50" r="8" fill="#ec5990" />
              <circle cx="100" cy="150" r="8" fill="#ec5990" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="#ec5990" stroke-width="8" />
              <line x1="100" y1="100" x2="100" y2="50" stroke="#ec5990" stroke-width="6" />
              <line x1="100" y1="100" x2="50" y2="100" stroke="#ec5990" stroke-width="6" />
              <line x1="100" y1="100" x2="150" y2="100" stroke="#ec5990" stroke-width="6" />
              <line x1="100" y1="100" x2="100" y2="150" stroke="#ec5990" stroke-width="6" />
            </svg>

            {/* Title */}
            <h1 className="text-2xl font-bold text-[#ec5990]">VaultRoom</h1>
          </div>
          <nav className="space-x-4">
            <a href="#features" className="hover:text-[#ec5990]">Features</a>
            <a href="#about" className="hover:text-[#ec5990]">About</a>
            <a href="#contact" className="hover:text-[#ec5990]">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#081229] py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-4">Secure Your Digital Life</h2>
          <p className="text-white mb-6 text-lg">
            Manage your passwords with confidence using VaultRoom. Simple, secure, and reliable.
          </p>
          <div className="space-x-4">
            <Link className="bg-[#0e101c] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#ec5990]" style={{border:"1px solid white"}} to='/login'>Get Started</Link>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md shadow-md hover:bg-gray-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-[#081229]">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-white mb-8">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaLock className="text-[#ec5990] text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Top-Notch Security</h4>
              <p className="text-gray-600">Your data is encrypted and stored securely, ensuring complete protection.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaShieldAlt className="text-[#ec5990] text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Easy Access</h4>
              <p className="text-gray-600">Access your passwords anytime, anywhere with ease.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaUserPlus className="text-[#ec5990] text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">User-Friendly</h4>
              <p className="text-gray-600">Designed with simplicity in mind for a seamless experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-[#081229]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">About VaultRoom</h3>
          <p className="text-white text-lg">
            VaultRoom is your trusted companion for managing passwords securely. Our mission is to make security
            accessible and straightforward for everyone.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#191d3a] text-white py-12" id='contact'>
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Column 1: About VaultRoom */}
      <div>
        <h4 className="text-xl font-bold mb-4">About VaultRoom</h4>
        <p className="text-sm">
          VaultRoom is your trusted companion for managing passwords securely. We strive to make security accessible and straightforward for everyone, with a user-friendly interface and robust encryption.
        </p>
      </div>

      {/* Column 2: Useful Links */}
      <div>
        <h4 className="text-xl font-bold mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><a href="#features" className="text-sm hover:text-[#ec5990]">Features</a></li>
          <li><a href="#about" className="text-sm hover:text-[#ec5990]">About Us</a></li>
          <li><a href="#contact" className="text-sm hover:text-[#ec5990]">Contact Support</a></li>
          <li><a href="#terms" className="text-sm hover:text-[#ec5990]">Terms of Service</a></li>
          <li><a href="#privacy" className="text-sm hover:text-[#ec5990]">Privacy Policy</a></li>
        </ul>
      </div>

      {/* Column 3: Contact Information */}
      <div>
        <h4 className="text-xl font-bold mb-4">Contact Us</h4>
        <p className="text-sm mb-4">Have questions or need help? Reach out to us:</p>
        <ul className="space-y-2">
          <li><a href="mailto:support@vaultroom.com" className="text-sm hover:text-[#ec5990]">support@vaultroom.com</a></li>
          <li><a href="tel:+1234567890" className="text-sm hover:text-[#ec5990]">+1 (234) 567-890</a></li>
          <li><p className="text-sm">123 Vault Street, Security City, SC 12345</p></li>
        </ul>
      </div>
    </div>

    {/* Social Media Links */}
    <div className="flex justify-center space-x-6 my-6">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebookF className="text-xl hover:text-[#ec5990]" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter className="text-xl hover:text-[#ec5990]" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedinIn className="text-xl hover:text-[#ec5990]" />
      </a>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <FaGithub className="text-xl hover:text-[#ec5990]" />
      </a>
    </div>

    {/* Copyright */}
    <div className="text-center mt-6">
      <p className="text-sm">&copy; {new Date().getFullYear()} VaultRoom. All rights reserved.</p>
    </div>
  </div>
</footer>

    </div>
  );
};

export default HomePage;
