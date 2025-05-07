
import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-dark py-10 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gradient">DevPortfolio</h3>
            <p className="text-gray-400 text-sm">
              A showcase of my projects, skills and professional experience as a software engineer.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-purple text-sm transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-purple text-sm transition-colors">About</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-purple text-sm transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-purple text-sm transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/ravi1718" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-purple transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/ravitej-neeli-612877266/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-purple transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://x.com/ravitej_neeli" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="mailto:example@email.com" className="text-gray-400 hover:text-purple transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} DevPortfolio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
