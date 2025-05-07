import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

// Define skills data
const skillsData = [
  { name: 'JavaScript', level: 80, category: 'frontend', icon: '⚡' },
  { name: 'TypeScript', level: 85, category: 'frontend', icon: '📘' },
  { name: 'React', level: 80, category: 'frontend', icon: '⚛️' },
  { name: 'Node.js', level: 80, category: 'backend', icon: '🟢' },
  { name: 'HTML/CSS', level: 95, category: 'frontend', icon: '🎨' },
  { name: 'Python', level: 70, category: 'backend', icon: '🐍' },
  { name: 'SQL', level: 70, category: 'backend', icon: '🗄️' },
  { name: 'Java', level: 70, category: 'backend', icon: '☕' },
  { name: 'Docker', level: 70, category: 'devops', icon: '🐳' },
  { name: 'Git', level: 85, category: 'devops', icon: '📋' },
  { name: 'GCP', level: 65, category: 'devops', icon: '☁️' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend', icon: '🌊' },
];

// Define categories
const categories = ['all', 'frontend', 'backend', 'devops'];

const Skills = () => {
  const [filter, setFilter] = useState('all');
  const [animate, setAnimate] = useState<boolean>(false);
  
  const filteredSkills = filter === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === filter);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('skills');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setAnimate(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="skills" className="bg-navy py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gradient mb-4 opacity-0 animate-fade-in">Skills & Tech Stack</h2>
          <p className="text-gray-400 max-w-2xl mx-auto opacity-0 animate-fade-in animate-delay-100">
            A comprehensive overview of my technical skills, programming languages, and tools I've mastered throughout my career.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 opacity-0 animate-fade-in animate-delay-200">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === category 
                  ? 'bg-purple text-white' 
                  : 'bg-navy-light text-gray-400 hover:bg-purple/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill, index) => (
            <div 
              key={skill.name}
              className={`bg-navy-light p-4 rounded-lg border border-gray-800 opacity-0 ${animate ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: `${(index * 100) + 300}ms` }}
            >
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{skill.icon}</span>
                <h4 className="text-white font-medium">{skill.name}</h4>
                <span className="ml-auto text-purple">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-2 bg-navy">
                <div className="bg-gradient-to-r from-purple to-purple-light h-full rounded-full" />
              </Progress>
            </div>
          ))}
        </div>
        
        {/* Other Tools Section */}
        <div className="mt-16 opacity-0 animate-fade-in animate-delay-300">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Other Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Supabase', 'Redux', 'Next.js', 'MongoDB', 'Firebase', 'Figma', 'GitHub ', 'VS Code', 'Webpack', 'Nginx'].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full bg-navy-light text-gray-300 text-sm border border-gray-800"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
