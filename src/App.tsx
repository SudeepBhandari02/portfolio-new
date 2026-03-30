/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Github, Linkedin, Twitter, ChevronDown, ArrowRight, Mail, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sections = [
    { id: 'home', label: 'Home', chapter: 'Prologue' },
    { id: 'projects', label: 'Works', chapter: 'Chapter I' },
    { id: 'about', label: 'About', chapter: 'Chapter II' },
    { id: 'stack', label: 'Stack', chapter: 'Chapter III' },
    { id: 'contact', label: 'Reach Us', chapter: 'The End' },
  ];

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    viewport: { once: false, amount: 0.3 }
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-y-auto snap-y snap-mandatory bg-background text-foreground selection:bg-white/20 scroll-smooth"
    >
      {/* Google Fonts Import */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap');
      `}} />

      {/* Fixed Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 z-0 h-full w-full object-cover opacity-80 pointer-events-none"
      >
        <source 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* Navigation - Fixed at top */}
      <nav className="fixed top-0 left-0 right-0 z-50 mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <div 
          className="text-3xl tracking-tight text-foreground cursor-pointer" 
          style={{ fontFamily: "'Instrument Serif', serif" }}
          onClick={() => scrollToSection('home')}
        >
          Sudeep<sup className="text-xs ml-0.5">®</sup>
        </div>
        
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
          {sections.map((section) => (
            <button 
              key={section.id}
              onClick={() => scrollToSection(section.id)} 
              className={`transition-colors ${activeSection === section.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {section.label}
            </button>
          ))}
        </div>

        <button 
          onClick={() => scrollToSection('about')}
          className="liquid-glass rounded-full px-6 py-2.5 text-xs font-medium text-foreground transition-transform hover:scale-[1.03] cursor-pointer"
        >
          Begin Journey
        </button>
      </nav>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: activeSection !== 'home' ? 1 : 0,
          scale: activeSection !== 'home' ? 1 : 0.8,
          pointerEvents: activeSection !== 'home' ? 'auto' : 'none'
        }}
        onClick={() => scrollToSection('home')}
        className="fixed bottom-8 right-8 z-50 liquid-glass p-4 rounded-full transition-transform hover:scale-110"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={20} className="rotate-180" />
        </motion.div>
      </motion.button>

      {/* Chapter Progress Indicator - Right Side */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center space-y-6">
        <div className="h-48 w-[1px] bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-foreground origin-top"
            style={{ scaleY }}
          />
        </div>
        <div className="flex flex-col space-y-4">
          {sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex items-center justify-end"
            >
              <span className={`mr-4 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 ${activeSection === section.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                {section.chapter}
              </span>
              <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${activeSection === section.id ? 'bg-foreground scale-150' : 'bg-white/20 group-hover:bg-white/40'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative z-10 snap-start h-screen w-full flex flex-col items-center justify-start pt-[20vh] px-6 text-center">
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={fadeVariants.viewport}
          variants={fadeVariants}
          className="max-w-5xl"
        >
          <h1 
            className="text-3xl font-normal leading-tight tracking-tight sm:text-5xl md:text-6xl text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Where dreams <em className="not-italic text-muted-foreground italic">rise</em> through the silence.
          </h1>

          <p className="mt-4 mx-auto max-w-lg text-[10px] leading-relaxed text-muted-foreground/60 sm:text-xs uppercase tracking-widest">
            Designing tools for deep thinkers, bold creators, and quiet rebels. <br className="hidden sm:block" />
            Amid the chaos, we build digital spaces for sharp focus and inspired work.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => scrollToSection('about')}
              className="liquid-glass cursor-pointer rounded-full px-10 py-3.5 text-xs font-medium text-foreground transition-transform hover:scale-[1.03] group flex items-center gap-2"
            >
              Begin Journey
              <motion.span 
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight size={14} />
              </motion.span>
            </button>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                <Github size={16} /> Github
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                <Twitter size={16} /> X
              </a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/50">Scroll to unfold</span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 snap-start h-screen w-full flex flex-col items-center justify-center px-8">
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={fadeVariants.viewport}
          variants={fadeVariants}
          className="max-w-4xl w-full"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground/50 mb-4 block">
            {sections.find(s => s.id === 'about')?.chapter}
          </span>
          <h2 className="text-4xl md:text-6xl mb-8 font-normal tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            About <em className="not-italic text-muted-foreground">me</em>
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>
              I am a Computer Science undergraduate at Acharya Institute of Technology, Bengaluru (Batch of 2022–2026), 
              with a strong foundation in full-stack development using the MERN stack and cross-platform mobile applications with React Native.
            </p>
            <p>
              My interests extend to Machine Learning, Artificial Intelligence, and Data Structures & Algorithms, 
              with practical experience in Retrieval-Augmented Generation (RAG) systems.
            </p>
            <p className="text-foreground italic font-serif">
              "First, solve the problem. Then, write the code." — John Johnson
            </p>
          </div>
          <button 
            onClick={() => scrollToSection('experience')}
            className="mt-12 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
          >
            Next Chapter 
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </button>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 snap-start h-screen w-full flex flex-col items-center justify-center px-8">
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={fadeVariants.viewport}
          variants={fadeVariants}
          className="max-w-7xl w-full"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground/50 mb-4 block">
            {sections.find(s => s.id === 'experience')?.chapter}
          </span>
          <h2 className="text-4xl md:text-6xl mb-12 font-normal tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Experience
          </h2>
          <div className="space-y-12">
            <div className="group relative pl-8 border-l border-border/50 hover:border-foreground transition-colors">
              <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-border group-hover:bg-foreground transition-colors" />
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-2xl font-medium">Full Stack Developer Intern</h3>
                <span className="text-muted-foreground font-mono text-sm uppercase tracking-wider">Jun 2025 – Present</span>
              </div>
              <p className="text-xl text-foreground/90 mb-4">StackPro Technologies</p>
              <ul className="space-y-3 text-muted-foreground max-w-3xl">
                <li>• Architected a multi-college survey platform for institutional data collection.</li>
                <li>• Migrated AWS infrastructure to GCP with zero data loss.</li>
                <li>• Refactored Snowflake-based query engines using Factory and Adapter patterns.</li>
                <li>• Implemented AI agents for automated metadata mapping across ERP systems.</li>
              </ul>
            </div>
          </div>
          <button 
            onClick={() => scrollToSection('projects')}
            className="mt-12 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
          >
            Next Chapter 
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </button>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 snap-start h-screen w-full flex flex-col items-center justify-center px-8">
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={fadeVariants.viewport}
          variants={fadeVariants}
          className="max-w-7xl w-full"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground/50 mb-4 block">
            {sections.find(s => s.id === 'projects')?.chapter}
          </span>
          <h2 className="text-4xl md:text-6xl mb-8 font-normal tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Selected Works
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Highlighting full-stack MERN applications, cross-platform React Native apps, and advanced RAG-powered agents.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Frnd Tracker",
                tech: "React Native, Expo, FastAPI",
                desc: "Social platform for real-time location sharing, chat, and emergency contact reaching.",
                link: "https://github.com"
              },
              {
                title: "Financial Stock Analyser",
                tech: "PhiData, Grok, AI Agents",
                desc: "Multi-agent stock analyzer leveraging AI agents for real-time market analysis.",
                link: "https://github.com"
              },
              {
                title: "Snapport",
                tech: "Automation, Mobile Camera",
                desc: "Automation tool to clip text and objects from a mobile camera feed directly to the desktop.",
                link: "https://github.com"
              },
              {
                title: "Bus Tracker App",
                tech: "React Native, Expo",
                desc: "Real-time bus discovery application improving last-mile commute visibility for travelers.",
                link: "https://github.com"
              },
              {
                title: "DineTime",
                tech: "React Native, Firebase",
                desc: "Restaurant booking app with real-time reservation management and live availability updates.",
                link: "https://github.com"
              },
              {
                title: "Notes Taker",
                tech: "MERN, React Native",
                desc: "Cross-platform note-taking application with live sync between web and mobile devices.",
                link: "https://github.com"
              },
              {
                title: "Portfolio Site",
                tech: "React, Vite, GSAP",
                desc: "High-performance personal portfolio featuring advanced GSAP animations and CI/CD.",
                link: "https://github.com"
              },
              {
                title: "ToDesktop Clone",
                tech: "Tailwind CSS",
                desc: "Pixel-accurate replica of the ToDesktop landing page showcasing advanced responsive design.",
                link: "https://github.com"
              },
              {
                title: "Multi-College Survey",
                tech: "Full Stack, AI/ML",
                desc: "Architected and shipped a full-stack platform for institutional data collection and analysis.",
                link: "https://github.com"
              }
            ].map((project, i) => (
              <div key={i} className="liquid-glass group p-6 rounded-3xl transition-all hover:scale-[1.01]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium tracking-tight uppercase">{project.title}</h3>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.desc}</p>
                <div className="text-[10px] font-mono uppercase tracking-widest text-foreground/50">
                  {project.tech}
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => scrollToSection('stack')}
            className="mt-12 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
          >
            Next Chapter 
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </button>
        </motion.div>
      </section>

      {/* Tech Stack Section */}
      <section id="stack" className="relative z-10 snap-start h-screen w-full flex flex-col items-center justify-center px-8">
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={fadeVariants.viewport}
          variants={fadeVariants}
          className="max-w-7xl w-full"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground/50 mb-4 block">
            {sections.find(s => s.id === 'stack')?.chapter}
          </span>
          <h2 className="text-4xl md:text-6xl mb-12 font-normal tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[
              { category: "Languages & Tools", skills: ["JavaScript", "C++", "Python", "Java", "Git", "Kafka", "Postman", "VS Code"] },
              { category: "Web & Mobile", skills: ["HTML/CSS", "React", "React Native", "Node.js", "Express", "Next.js", "Tailwind", "GSAP", "ShadCDN"] },
              { category: "AI & RAG", skills: ["Vector Embeddings", "Indexing", "Chunking", "RAG Pipelines", "LlamaIndex", "LangChain", "Vector DBs", "LangGraph", "CrewAI"] },
              { category: "Cloud & DevOps", skills: ["MongoDB", "Firebase", "MySQL", "PostgreSQL", "Docker", "AWS", "Hugging Face", "CI/CD", "FastAPI"] }
            ].map((item, i) => (
              <div key={i}>
                <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-6">{item.category}</h3>
                <ul className="grid grid-cols-1 gap-2">
                  {item.skills.map((skill, j) => (
                    <li key={j} className="text-sm md:text-base font-medium hover:text-muted-foreground transition-colors cursor-default">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button 
            onClick={() => scrollToSection('contact')}
            className="mt-12 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
          >
            Final Chapter 
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </button>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 snap-start h-screen w-full flex flex-col items-center justify-center px-8">
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={fadeVariants.viewport}
          variants={fadeVariants}
          className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground/50 mb-4 block">
              {sections.find(s => s.id === 'contact')?.chapter}
            </span>
            <h2 className="text-4xl md:text-6xl mb-8 font-normal tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Join <em className="not-italic text-muted-foreground">Me</em>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's build a new era of technology together. I am eager to contribute to innovative projects and continuously enhance my skill set.
            </p>
            <div className="space-y-4">
              <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Contact Details</p>
              <a href="mailto:sudeepbhandariwork@gmail.com" className="text-xl hover:text-muted-foreground transition-colors flex items-center gap-3">
                <Mail size={20} className="text-muted-foreground" />
                sudeepbhandariwork@gmail.com
              </a>
              <div className="flex space-x-6 pt-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Github size={18} /> GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Linkedin size={18} /> LinkedIn
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Twitter size={18} /> X
                </a>
              </div>
            </div>
          </div>

          <div className="liquid-glass p-8 rounded-3xl">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 block">Your Name</label>
                <input type="text" placeholder="Enter your name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 block">Your Email</label>
                <input type="email" placeholder="Enter your email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 block">Your Message</label>
                <textarea placeholder="Enter your message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none" />
              </div>
              <button className="w-full liquid-glass py-4 rounded-xl text-sm font-medium hover:scale-[1.02] transition-transform">
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
        
        <div className="absolute bottom-10 left-0 right-0 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/30">
            © Sudeep Bhandari 2026. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}
