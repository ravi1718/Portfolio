
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Project } from '@/components/sections/Projects';

interface ProjectUploadFormProps {
  onSubmit: (project: Omit<Project, 'id'>) => void;
}

const ProjectUploadForm: React.FC<ProjectUploadFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [techStackInput, setTechStackInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create tech stack array from comma-separated input
    const techStack = techStackInput
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '');
    
    // Create new project object
    const newProject: Omit<Project, 'id'> = {
      name,
      description,
      techStack,
      featured,
    };
    
    // Add optional fields if they have values
    if (imageUrl) newProject.image = imageUrl;
    if (githubUrl) newProject.githubUrl = githubUrl;
    if (demoUrl) newProject.demoUrl = demoUrl;
    
    // Submit the project and reset the form
    onSubmit(newProject);
    resetForm();
  };
  
  const resetForm = () => {
    setName('');
    setDescription('');
    setImageUrl('');
    setTechStackInput('');
    setGithubUrl('');
    setDemoUrl('');
    setFeatured(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name*</Label>
        <Input 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="bg-navy border-gray-700"
          placeholder="My Awesome Project"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description*</Label>
        <Textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="bg-navy border-gray-700 min-h-[100px]"
          placeholder="Briefly describe your project and its key features..."
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input 
          id="image" 
          value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)} 
          className="bg-navy border-gray-700"
          placeholder="https://example.com/image.jpg"
        />
        <p className="text-xs text-gray-500">
          Leave blank to use a default image. For best results, use a 16:9 aspect ratio.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="techStack">Technologies Used*</Label>
        <Input 
          id="techStack" 
          value={techStackInput} 
          onChange={(e) => setTechStackInput(e.target.value)} 
          className="bg-navy border-gray-700"
          placeholder="React, Node.js, MongoDB (comma-separated)"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input 
            id="githubUrl" 
            value={githubUrl} 
            onChange={(e) => setGithubUrl(e.target.value)} 
            className="bg-navy border-gray-700"
            placeholder="https://github.com/username/repo"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="demoUrl">Demo URL</Label>
          <Input 
            id="demoUrl" 
            value={demoUrl} 
            onChange={(e) => setDemoUrl(e.target.value)} 
            className="bg-navy border-gray-700"
            placeholder="https://my-project.com"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="featured" 
          checked={featured}
          onCheckedChange={(checked) => {
            if (typeof checked === 'boolean') {
              setFeatured(checked);
            }
          }}
        />
        <Label htmlFor="featured" className="text-gray-300">Mark as featured project</Label>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button 
          type="button" 
          variant="outline" 
          className="border-gray-700 text-gray-400" 
          onClick={resetForm}
        >
          Reset
        </Button>
        <Button type="submit" className="btn-primary">
          Add Project
        </Button>
      </div>
    </form>
  );
};

export default ProjectUploadForm;
