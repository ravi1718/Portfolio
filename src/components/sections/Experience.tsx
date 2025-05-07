
import React from 'react';
import { Briefcase, Calendar,ExternalLink } from 'lucide-react';

const Experience = () => {
  // Define the single experience
  const experienceData = {
    role: 'Open-Source Contributor',
    company: 'Wikimedia Foundation',
    duration: 'September 2024 - Present',
    description: 'Contributed to couple of open-source projects under wikimedia foundation. Focusing mainly on the MediaWiki software and its extensions. My contributions include bug fixes and documentation improvements.',
    achievements: [
      'Fix incorrect ucfirst/lcfirst transformations for Karakalpak alphabet',
      'Fix admin-description-item to replace item number with item ID',
      'Certified as Top-performer in the Road-to-Wiki program',
      'Successfully merged two pull requests into the main repository',
    ],
  };

  return (
    <section id="experience" className="bg-navy-dark py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gradient mb-4 opacity-0 animate-fade-in">Professional Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto opacity-0 animate-fade-in animate-delay-100">
            My most recent professional role and key accomplishments.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-navy-light rounded-lg p-8 border border-gray-800 animate-fade-in opacity-0 shadow-lg shadow-purple/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">{experienceData.role}</h3>
              <div className="flex items-center text-purple mt-2 sm:mt-0">
                <Calendar size={16} className="mr-1" />
                <span className="text-sm">{experienceData.duration}</span>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <div className="bg-purple/10 p-3 rounded-full mr-3">
                <Briefcase size={18} className="text-purple" />
              </div>
              <span className="text-gray-200 text-lg font-medium">{experienceData.company}</span>
            </div>
            
            <div className="bg-navy-dark/40 p-6 rounded-lg mb-8">
              <p className="text-gray-300">{experienceData.description}</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-white font-semibold text-lg mb-4">Key Achievements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experienceData.achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className="text-gray-300 flex items-start gap-3 p-4 bg-navy-dark/30 rounded-lg hover:bg-purple/5 transition-colors"
                  >
                    <div className="bg-purple/10 h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-purple text-sm">✓</span>
                    </div>
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
               <a 
                                        href={'https://gerrit.wikimedia.org/r/q/owner:neeliravitej@gmail.com'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary flex items-center gap-2"
                                      >
                                        <ExternalLink size={16} />
                                        <span>Contribution Link</span>
                                      </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
