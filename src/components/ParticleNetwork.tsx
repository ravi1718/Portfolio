
import React, { useRef, useEffect } from 'react';

const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Particle system
    type Particle = {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      connections: number[];
    };
    
    // Colors from tech stacks - Using valid 6-character hex codes
    const techColors = [
      '#61DAFB', // React
      '#3178C6', // TypeScript - Fixed: was '#3178C61'
      '#F7DF1E', // JavaScript
      '#339933', // Node.js
      '#E34F26', // HTML
      '#1572B6', // CSS
      '#764ABC', // Redux
      '#FF9900', // AWS
      '#2496ED', // Docker
      '#2A42D0', // Figma design
      '#7055CC', // Similar to your purple theme
    ];
    
    const particles: Particle[] = [];
    const particleCount = Math.min(100, Math.floor(window.innerWidth * 0.05)); // Responsive particle count
    const connectionDistance = Math.min(150, window.innerWidth * 0.15);
    const interactionRadius = 100;
    
    let mouseX = 0;
    let mouseY = 0;
    let animationSpeed = 0.3;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 3 + 1;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedX: (Math.random() - 0.5) * animationSpeed,
        speedY: (Math.random() - 0.5) * animationSpeed,
        color: techColors[Math.floor(Math.random() * techColors.length)],
        opacity: Math.random() * 0.5 + 0.2,
        connections: [],
      });
    }
    
    // Track mouse for interactivity
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Apply mouse interaction - particles move away from cursor
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < interactionRadius) {
          const forceFactor = (interactionRadius - distance) / interactionRadius;
          p.speedX -= dx * forceFactor * 0.02;
          p.speedY -= dy * forceFactor * 0.02;
        }
        
        // Apply speed limits
        p.speedX = Math.max(-1, Math.min(1, p.speedX));
        p.speedY = Math.max(-1, Math.min(1, p.speedY));
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Boundary checks with bounce effect
        if (p.x < 0 || p.x > canvas.width) {
          p.speedX *= -1;
        }
        
        if (p.y < 0 || p.y > canvas.height) {
          p.speedY *= -1;
        }
        
        // Clear previous connections
        p.connections = [];
      }
      
      // Calculate connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            particles[i].connections.push(j);
            particles[j].connections.push(i);
          }
        }
      }
      
      // Draw connections first (behind particles)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        for (const connectionIdx of p.connections) {
          const p2 = particles[connectionIdx];
          
          // Only draw each connection once
          if (i < connectionIdx) {
            const opacity = (1 - (Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2) / connectionDistance)) * 0.8;
            
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Use gradient for connections - Fixed hex code format for opacity
            const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            gradient.addColorStop(0, `${p.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${p2.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Draw particles on top of connections
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      }
      
      // Tech stack text effects
      const techStacks = ['React', 'TypeScript', 'JavaScript', 'Node.js', 'HTML/CSS', 'Redux'];
      const visibleStacks = Math.min(3, Math.floor(Math.random() * 4) + 1); // Show 1-3 tech names
      
      for (let i = 0; i < visibleStacks; i++) {
        const tech = techStacks[Math.floor(Math.random() * techStacks.length)];
        const x = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1; // Keep away from edges
        const y = Math.random() * (canvas.height * 0.8) + canvas.height * 0.1;
        
        ctx.font = `${Math.floor(Math.random() * 14) + 10}px 'Inter', sans-serif`;
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.2 + 0.05})`;
        ctx.fillText(tech, x, y);
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 opacity-80"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleNetwork;
