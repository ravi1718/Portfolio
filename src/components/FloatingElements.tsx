
import React, { useRef, useEffect } from 'react';

const FloatingElements = () => {
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
    
    // Define tech-themed shapes
    const shapes = [
      { type: 'circle', color: '#8B5CF6', size: 15 }, // Purple circle
      { type: 'square', color: '#EC4899', size: 12 }, // Pink square
      { type: 'triangle', color: '#3B82F6', size: 18 }, // Blue triangle
      { type: 'diamond', color: '#10B981', size: 14 }, // Green diamond
      { type: 'code', color: '#6366F1', text: '<>' }, // Code brackets
      { type: 'code', color: '#F59E0B', text: '{}' }, // Curly braces
      { type: 'code', color: '#EF4444', text: '()' }, // Parentheses
      { type: 'code', color: '#8B5CF6', text: '[]' }, // Square brackets
    ];
    
    // Create floating elements
    const elements: any[] = [];
    const elementCount = Math.min(25, Math.floor(window.innerWidth * 0.02));
    
    for (let i = 0; i < elementCount; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = shape.size * (Math.random() * 0.5 + 0.8);
      const speed = Math.random() * 0.5 + 0.2;
      const directionX = Math.random() > 0.5 ? 1 : -1;
      const directionY = Math.random() > 0.5 ? 1 : -1;
      const rotation = Math.random() * 360;
      const rotationSpeed = (Math.random() - 0.5) * 0.5;
      const opacity = Math.random() * 0.3 + 0.1;
      
      elements.push({
        ...shape,
        x,
        y,
        size,
        speedX: speed * directionX,
        speedY: speed * directionY,
        rotation,
        rotationSpeed,
        opacity
      });
    }
    
    // Draw a shape based on its type
    const drawShape = (element: any) => {
      ctx.save();
      ctx.translate(element.x, element.y);
      ctx.rotate((element.rotation * Math.PI) / 180);
      ctx.globalAlpha = element.opacity;
      
      if (element.type === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, element.size, 0, Math.PI * 2);
        ctx.fillStyle = element.color;
        ctx.fill();
      } else if (element.type === 'square') {
        ctx.fillStyle = element.color;
        ctx.fillRect(-element.size / 2, -element.size / 2, element.size, element.size);
      } else if (element.type === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(0, -element.size);
        ctx.lineTo(element.size, element.size);
        ctx.lineTo(-element.size, element.size);
        ctx.closePath();
        ctx.fillStyle = element.color;
        ctx.fill();
      } else if (element.type === 'diamond') {
        ctx.beginPath();
        ctx.moveTo(0, -element.size);
        ctx.lineTo(element.size, 0);
        ctx.lineTo(0, element.size);
        ctx.lineTo(-element.size, 0);
        ctx.closePath();
        ctx.fillStyle = element.color;
        ctx.fill();
      } else if (element.type === 'code') {
        ctx.font = `${element.size}px 'Courier New', monospace`;
        ctx.fillStyle = element.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(element.text, 0, 0);
      }
      
      ctx.restore();
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw elements
      for (const element of elements) {
        // Update position
        element.x += element.speedX;
        element.y += element.speedY;
        element.rotation += element.rotationSpeed;
        
        // Boundary checks with bounce effect
        if (element.x < 0 || element.x > canvas.width) {
          element.speedX *= -1;
        }
        
        if (element.y < 0 || element.y > canvas.height) {
          element.speedY *= -1;
        }
        
        // Draw the element
        drawShape(element);
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
      className="absolute inset-0 z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default FloatingElements;
