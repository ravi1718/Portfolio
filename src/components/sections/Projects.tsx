import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EyeIcon, GithubIcon, ExternalLinkIcon, PlusIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ProjectUploadForm from '@/components/ProjectUploadForm';

// Define project type
export interface Project {
  id: string;
  name: string;
  description: string;
  image?: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

// Default projects data
const defaultProjects: Project[] = [
  {
    id: '1',
    name: 'Secure Share(Digital file staorage)',
    description: 'A full-stack digital wallet application that enables users to securely upload, organize, and share their personal files and documents with others. It offers category-based storage, robust sharing controls, and integrates modern security practices to ensure privacy and data protection.',
    image: './images/secure-share2.jpg',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB','Clerk','Tailwind CSS'],
    githubUrl: 'https://github.com/ravi1718/secure-share',
    // demoUrl: 'https://example.com/store',
    featured: true,
  },
  {
    id: '2',
    name: 'Career-Guidance',
    description: 'A fully responsive career-guidance platform where students can view their favourite colleges based on their results and can prepare for mock Aptitude Tests and colleges can add Aptitude questions and evaluate them.',
    image: './images/career-guidance.jpg',
    techStack: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    githubUrl: 'https://github.com/ravi1718/career-guidance',
    // demoUrl: 'https://example.com/store',
    featured: true,
  },
  {
    id: '2',
    name: 'Constructive Hives',
    description: 'A MERN stack-based solution tailored for the construction industry, designed to provide users with real-time and accurate pricing of construction materials. The platform also features an engineer portfolio system, allowing clients to view past projects, assess credibility, and make informed decisions. It aims to bring transparency, efficiency, and trust to the construction process through intuitive design and reliable data.',
    image: 'https://images.unsplash.com/photo-1515162305280-7dc8e122f1ee',
    techStack: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    githubUrl: 'https://github.com/ravi1718/career-guidance',
    // demoUrl: 'https://example.com/store',
    featured: false,
  },
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Function to add a new project
  const addProject = (newProject: Omit<Project, 'id'>) => {
    const projectWithId = {
      ...newProject,
      id: `project-${Date.now()}`,
    };

    setProjects([...projects, projectWithId as Project]);
  };

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gradient mb-4 opacity-0 animate-fade-in">Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto opacity-0 animate-fade-in animate-delay-100">
            A selection of my recent work and personal projects that showcase my skills and experience.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="bg-navy-light border border-gray-800 overflow-hidden card-hover opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                {project.featured && (
                  <div className="absolute top-2 right-2 bg-purple text-white px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-gray-400 mb-4 text-sm h-20 overflow-hidden">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-navy rounded-md text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="bg-navy p-4 flex justify-between border-t border-gray-800">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-purple"
                      onClick={() => setActiveProject(project)}
                    >
                      <EyeIcon size={16} className="mr-1" />
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl bg-navy-dark border border-gray-800">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-white">{activeProject?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="relative aspect-video overflow-hidden mb-4">
                      <img
                        src={activeProject?.image || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'}
                        alt={activeProject?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-gray-400 mb-4">{activeProject?.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {activeProject?.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-navy rounded-md text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-4">
                      {activeProject?.githubUrl && (
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline flex items-center gap-2"
                        >
                          <GithubIcon size={16} />
                          <span>View Code</span>
                        </a>
                      )}

                      {activeProject?.demoUrl && (
                        <a
                          href={activeProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary flex items-center gap-2"
                        >
                          <ExternalLinkIcon size={16} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-purple rounded-full hover:bg-navy-dark transition-colors"
                    >
                      <GithubIcon size={18} />
                    </a>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-purple rounded-full hover:bg-navy-dark transition-colors"
                    >
                      <ExternalLinkIcon size={18} />
                    </a>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
