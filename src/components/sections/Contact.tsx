import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Github, Twitter, Linkedin, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

// Form validation type
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { toast } = useToast();

  // Initialize EmailJS service
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  // Validate form
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Prepare template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_email: 'ravitejneeli474@gmail.com',
    };
    
    try {
      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      setSuccess(true);
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      
      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
      
      // Reset success state after a delay
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Email sending failed:', error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-navy-dark py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gradient mb-4 opacity-0 animate-fade-in">Get In Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto opacity-0 animate-fade-in animate-delay-100">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out using the form below.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-navy-light rounded-lg p-8 border border-gray-800 opacity-0 animate-fade-in-right">
            <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-navy border-gray-700"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-navy border-gray-700"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-navy border-gray-700 min-h-[120px]"
                  placeholder="Your message..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>
              
              <Button 
                type="submit" 
                className="w-full btn-primary relative overflow-hidden group"
                disabled={loading || success}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : success ? (
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Sent!
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="opacity-0 animate-fade-in-left">
            <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple/10 p-3 rounded-full">
                  <Mail className="text-purple h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:ravitejneeli474@gmail.com" className="text-white hover:text-purple transition-colors">
                    ravitejneeli474@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple/10 p-3 rounded-full">
                  <Phone className="text-purple h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a href="tel:+11234567890" className="text-white hover:text-purple transition-colors">
                    +91 9353163880
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple/10 p-3 rounded-full">
                  <MapPin className="text-purple h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">Hubli, Karnataka</p>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="mt-10">
              <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
              
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/ravi1718" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-navy p-3 rounded-full text-gray-400 hover:text-purple transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/ravitej-neeli-612877266/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-navy p-3 rounded-full text-gray-400 hover:text-purple transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://x.com/ravitej_neeli" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-navy p-3 rounded-full text-gray-400 hover:text-purple transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            {/* Availability Info */}
            <div className="mt-10 bg-navy rounded-lg p-6 border border-gray-800">
              <h4 className="text-lg font-semibold text-white mb-2">Current Availability</h4>
              <p className="text-gray-400">
                I'm currently available for freelance projects, Internships, and full-time positions.
              </p>
              <div className="mt-3 flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-green-400 ml-2 text-sm">Available for hire</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
