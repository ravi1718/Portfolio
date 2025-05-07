
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Code, Heart, Star } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="bg-navy-dark py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gradient mb-4 opacity-0 animate-fade-in">About Me</h2>
          <p className="text-gray-400 max-w-2xl mx-auto opacity-0 animate-fade-in animate-delay-100">
            Get to know more about my journey, passion for coding, and what drives me as a software engineer.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Avatar/Image Side */}
          <div className="flex justify-center opacity-0 animate-fade-in-right">
            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-light to-purple overflow-hidden border-4 border-purple/30 shadow-lg shadow-purple/20 animate-float">
                <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
                  {/* Replace with actual image or avatar later */}
                  <img src="/images/portfolio_profile.jpg" alt="profile" />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-12 h-12 glass rounded-full flex items-center justify-center animate-spin-slow">
                <Star size={20} className="text-purple" />
              </div>
              <div className="absolute -top-4 -left-4 w-10 h-10 glass rounded-full flex items-center justify-center animate-float">
                <Heart size={16} className="text-purple-light" />
              </div>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="space-y-6 opacity-0 animate-fade-in-left">
            <h3 className="text-2xl font-bold text-white">
              Hi, I'm <span className="text-gradient">Ravitej C Neeli</span>
            </h3>
            <p className="text-gray-400">
              I'm a passionate software engineer specializing in full-stack development.
              I enjoy building applications that solve real-world problems and provide exceptional user experiences.
            </p>
            <p className="text-gray-400">
              My journey in tech began when I first discovered the joy of turning ideas into functional applications.
              Since then, I've been continuously learning and improving my skills across multiple technologies and frameworks.
            </p>
            
            {/* Key points */}
            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check size={18} className="text-purple" />
                </div>
                <p className="text-gray-400">Strong focus on performance, accessibility, and clean code</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check size={18} className="text-purple" />
                </div>
                <p className="text-gray-400">Experience in building scalable applications with modern frameworks</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check size={18} className="text-purple" />
                </div>
                <p className="text-gray-400">Passionate about continuous learning and staying up-to-date with tech trends</p>
              </div>
            </div>
            
            <div className="pt-4">
              <a href="#contact" className="btn-primary inline-block">Let's Connect</a>
            </div>
          </div>
        </div>
        
        {/* Personal Interests Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <Card className="bg-navy border border-gray-800 overflow-hidden opacity-0 animate-fade-in card-hover">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-white mb-2">Professional Interests</h4>
              <p className="text-gray-400 text-sm">
                Web development, system architecture, cloud computing, DevOps, and performance optimization.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-navy border border-gray-800 overflow-hidden opacity-0 animate-fade-in animate-delay-100 card-hover">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-white mb-2">Current Focus</h4>
              <p className="text-gray-400 text-sm">
                Advanced React patterns, microservices architecture, Artificial Intelligence and Machine Learning.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-navy border border-gray-800 overflow-hidden opacity-0 animate-fade-in animate-delay-200 card-hover">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-white mb-2">When Not Coding</h4>
              <p className="text-gray-400 text-sm">
                Exploring nature, reading tech blogs, contributing to open source, and continuous learning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
