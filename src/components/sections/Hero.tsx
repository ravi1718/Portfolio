
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import FloatingElements from '@/components/FloatingElements';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden py-10">
      {/* Modern floating elements background */}
      <FloatingElements />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 opacity-0 animate-fade-in">
            <span className="inline-block py-1 px-4 rounded-full text-sm border border-purple text-purple mb-4">
              Full Stack Software Engineer
            </span>
          </div>
          
          <h1 className="opacity-0 animate-fade-in animate-delay-100">
            <span className="text-white">Hello, I'm </span>
            <span className="text-gradient">Ravitej C Neeli</span>
          </h1>
          
          <p className="text-gray-400 mt-6 text-xl opacity-0 animate-fade-in animate-delay-200">
            I create exceptional digital experiences with clean, efficient, and accessible code. 
            Specializing in modern web technologies and user-centric applications.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4 justify-center opacity-0 animate-fade-in animate-delay-300">
            <Button 
              className="btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView()}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              className="btn-outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView()}
            >
              Contact Me
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in animate-delay-500">
          <Button 
            variant="ghost" 
            size="icon"
            className="animate-bounce text-gray-400 hover:text-purple"
            onClick={() => document.getElementById('about')?.scrollIntoView()}
          >
            <ArrowDown size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
