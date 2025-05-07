import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const Resume = () => {
  const defaultResume = '/resume.pdf'; 
  const [isUploaded, setIsUploaded] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string>(defaultResume);


  return (
    <section id="resume" className="py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gradient mb-4 opacity-0 animate-fade-in">Resume</h2>
          <p className="text-gray-400 max-w-2xl mx-auto opacity-0 animate-fade-in animate-delay-100">
            Download my resume to learn more about my education, work experience, and qualifications.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-navy-light rounded-lg border border-gray-800 overflow-hidden opacity-0 animate-fade-in animate-delay-200">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center">
                <div className="bg-purple/10 p-4 rounded-full mr-4">
                  <FileText size={28} className="text-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">My Professional Resume</h3>
                  <p className="text-gray-400 text-sm">
                    {isUploaded ? 'Resume uploaded and ready to download' : 'Default resume available for download and preview'}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <>
                  <Button 
                    className="btn-primary flex items-center gap-2"
                    onClick={() => resumeUrl && window.open(resumeUrl, '_blank')}
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="btn-outline flex items-center gap-2">
                        <Eye size={16} />
                        <span>Preview</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[80vh]">
                      {resumeUrl && (
                        <iframe
                          src={resumeUrl}
                          className="w-full h-full"
                          title="Resume Preview"
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </>
              </div>
            </div>
            
          </div>
        </div>
        
        <div className="mt-12 text-center opacity-0 animate-fade-in animate-delay-300">
          <p className="text-gray-400">
            Want to discuss how my experience can benefit your company? <a href="#contact" className="text-purple hover:underline">Contact me</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Resume;
