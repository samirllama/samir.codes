"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Code,
  Zap,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function DeveloperLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const projects = [
    {
      title: "Neural.Commerce.Stack",
      tech: "Next.js • AI • Stripe",
      description: "AI-powered e-commerce platform with predictive analytics",
      metrics: "↗ 340% conversion",
    },
    {
      title: "Realtime.Data.Engine",
      tech: "WebRTC • Node.js • Redis",
      description: "Ultra-low latency data streaming for trading platforms",
      metrics: "< 5ms latency",
    },
    {
      title: "Cloud.Native.Orchestrator",
      tech: "Kubernetes • Go • GraphQL",
      description: "Microservices deployment automation at enterprise scale",
      metrics: "99.9% uptime",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(600px circle at " +
            mousePosition.x +
            "px " +
            mousePosition.y +
            "px, rgba(59, 130, 246, 0.15), transparent 40%)",
        }}
      ></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Claude.dev
            </div>
            <div className="flex gap-6 items-center">
              <a
                href="#work"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Work
              </a>
              <a
                href="#about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </a>
              <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full transition-all hover:scale-105 flex items-center gap-2">
                <Mail size={16} />
                Contact
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/20 mb-8">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available for new projects
              </div>

              {/* Main headline */}
              <div className="mb-8">
                <h1 className="text-7xl md:text-8xl font-black mb-4 leading-none">
                  <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                    Code. Scale. Ship.™
                  </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                  Full-stack architect building the next generation of web
                  experiences. From concept to global scale, I turn ambitious
                  ideas into reality.
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">50M+</div>
                  <div className="text-gray-500">Users Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">
                    99.9%
                  </div>
                  <div className="text-gray-500">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">100ms</div>
                  <div className="text-gray-500">Load Time</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all hover:scale-105 flex items-center gap-2">
                  View My Work
                  <ArrowRight size={20} />
                </button>
                <button className="border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all hover:scale-105">
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="work" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Featured Work
              </span>
            </h2>

            <div className="grid gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02]"
                >
                  {/* Glassmorphism effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                        <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                          {project.metrics}
                        </div>
                      </div>
                      <p className="text-gray-400 mb-4 text-lg">
                        {project.description}
                      </p>
                      <div className="text-gray-500 font-mono text-sm">
                        {project.tech}
                      </div>
                    </div>

                    <div className="flex gap-3 ml-8">
                      <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110">
                        <Github size={20} />
                      </button>
                      <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110">
                        <ExternalLink size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Core Expertise
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/30 transition-colors">
                  <Code size={32} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  Frontend Architecture
                </h3>
                <p className="text-gray-400">
                  React, Next.js, TypeScript. Building scalable, performant user
                  experiences.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/30 transition-colors">
                  <Layers size={32} className="text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">System Design</h3>
                <p className="text-gray-400">
                  Distributed systems, microservices, cloud-native solutions at
                  enterprise scale.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/30 transition-colors">
                  <Zap size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Performance</h3>
                <p className="text-gray-400">
                  Optimization, monitoring, and data-driven improvements for
                  maximum impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              Let's build something{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                extraordinary
              </span>
            </h2>

            <div className="flex justify-center gap-6 mb-8">
              <a
                href="#"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
              >
                <Mail size={24} />
              </a>
            </div>

            <p className="text-gray-500">
              © 2025 Claude.dev • Crafted with React & Tailwind
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
