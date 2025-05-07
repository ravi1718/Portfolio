
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Globe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create globe geometry with a refined appearance
    const globeGeometry = new THREE.SphereGeometry(2, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1A1F2C,             // Darker, more professional blue
      shininess: 25,               // Add some subtle shine
      transparent: true,
      opacity: 0.8,                // More transparency for a sophisticated look
      flatShading: false,          // Smooth shading
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    
    // Create more subtle grid lines for longitude with gradient opacity
    for (let i = 0; i < 18; i++) {
      const torusGeometry = new THREE.TorusGeometry(2, 0.002, 16, 100);
      const torusMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x8E9196,          // Neutral gray for subtle grid
        transparent: true,
        opacity: 0.15            // More transparent
      });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torus.rotation.z = Math.PI / 18 * i;
      scene.add(torus);
    }
    
    // Latitude lines - fewer lines for a cleaner look
    for (let i = 0; i < 6; i++) {
      const torusGeometry = new THREE.TorusGeometry(2, 0.002, 16, 100);
      const torusMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x8E9196,          // Consistent with longitude lines
        transparent: true,
        opacity: 0.15
      });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torus.rotation.x = Math.PI / 6 * i;
      scene.add(torus);
    }
    
    // Tech stack data
    const techStacks = [
      { name: "JavaScript", color: 0xF7DF1E, size: 0.12 },
      { name: "React", color: 0x61DAFB, size: 0.12 },
      { name: "TypeScript", color: 0x3178C6, size: 0.12 },
      { name: "Node.js", color: 0x339933, size: 0.12 },
      { name: "Python", color: 0x3776AB, size: 0.12 },
      { name: "HTML5", color: 0xE34F26, size: 0.10 },
      { name: "CSS3", color: 0x1572B6, size: 0.10 },
      { name: "GraphQL", color: 0xE10098, size: 0.10 },
      { name: "AWS", color: 0xFF9900, size: 0.10 },
      { name: "Docker", color: 0x2496ED, size: 0.10 },
      { name: "MongoDB", color: 0x47A248, size: 0.10 },
      { name: "Git", color: 0xF05032, size: 0.10 }
    ];
    
    // Generate tech stack points on the globe
    const points = [];
    
    for (let i = 0; i < techStacks.length; i++) {
      const tech = techStacks[i];
      const lat = Math.random() * 160 - 80; // Avoid exact poles
      const lng = Math.random() * 360 - 180;
      
      // Convert lat/lng to 3D coordinates
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -2 * Math.sin(phi) * Math.cos(theta);
      const y = 2 * Math.cos(phi);
      const z = 2 * Math.sin(phi) * Math.sin(theta);
      
      // Create a sphere to represent the tech stack
      const pointGeometry = new THREE.SphereGeometry(tech.size, 16, 16);
      const pointMaterial = new THREE.MeshBasicMaterial({ 
        color: tech.color,
        transparent: true,
        opacity: 0.8
      });
      const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
      pointMesh.position.set(x, y, z);
      scene.add(pointMesh);
      
      points.push({ position: new THREE.Vector3(x, y, z), color: tech.color });
    }
    
    // Add connecting lines between tech stacks
    for (let i = 0; i < points.length - 1; i++) {
      // Connect to the next 2 points to create a network effect
      for (let j = 1; j <= 2; j++) {
        if (i + j < points.length) {
          const start = points[i].position;
          const end = points[i + j].position;
          
          // Create a slight curve for the line
          const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
          mid.normalize().multiplyScalar(2.2); // Push slightly outward from globe center
          
          const curve = new THREE.QuadraticBezierCurve3(
            start,
            mid,
            end
          );
          
          const linePoints = curve.getPoints(20);
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
          
          // Use a gradient between the two tech colors
          const lineMaterial = new THREE.LineBasicMaterial({ 
            color: points[i].color,
            transparent: true,
            opacity: 0.3,  // Subtle connections
            linewidth: 1
          });
          
          const line = new THREE.Line(lineGeometry, lineMaterial);
          scene.add(line);
        }
      }
    }
    
    // Improved lighting setup for a more professional look
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Reduced intensity
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Add subtle point lights for a more dynamic appearance
    const pointLight1 = new THREE.PointLight(0x7055CC, 0.5, 10);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x4B55CC, 0.3, 10);
    pointLight2.position.set(-3, -3, 2);
    scene.add(pointLight2);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation with smooth rotation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      globe.rotation.y += 0.001; // Slow, professional rotation
      globe.rotation.x += 0.0002; // Very subtle tilt rotation
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      
      // Dispose of geometries and materials
      globeGeometry.dispose();
      globeMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <div ref={containerRef} className="absolute inset-0 z-0 opacity-80"></div>
  );
};

export default Globe;
