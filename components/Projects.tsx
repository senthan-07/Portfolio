'use client'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaRobot, FaUsers, FaShieldAlt, FaBuilding } from 'react-icons/fa'

export default function Projects() {
  const projects = [
    {
       title: "Route Your Travel",
       description: "AI-Powered Travel Platform with a production-ready marketing site. Designed and deployed a responsive static frontend using Next.js and Tailwind CSS. Currently developing AI features including blog generation from user content via Gemini Vision.",
       tech: ["Next.js", "FastAPI", "Postgres", "Tailwind CSS" ,"GenAi"],
       github: "https://github.com/company/route-your-travel",
       live: "https://routeyourtravel.com",
       category: "AI Platform",
       gradient: "from-indigo-500 to-purple-500",
       icon: FaRobot,
       features: ["Production Marketing Site", "Responsive UI", "Blog Generator (WIP)"],
       isCompanyProject: true
      }
      ,
    {
      title: "TeamFlow",
      description: "A Real-Time Collaboration Suite integrating whiteboard, real-time chat, and file sharing. Features live canvas with cursor synchronization, persistent state management using Prisma, and seamless peer-to-peer video/audio communication using WebRTC.",
      tech: ["Next.js", "WebSockets", "WebRTC", "PostgreSQL", "Prisma", "Turborepo"],
      github: "https://github.com/senthan-07/teamflow",
      live: null, // No live deployment
      category: "Collaboration",
      gradient: "from-blue-500 to-cyan-500",
      icon: FaUsers,
      features: ["Real-time Whiteboard", "Video/Audio Chat", "File Sharing"],
      isCompanyProject: false
    },
    {
      title: "CyberHive",
      description: "A Cybersecurity Toolkit Platform with modular microservices for intrusion detection, port scanning, and Trivy-based vulnerability analysis. Features real-time dashboards using WebSockets for streaming and monitoring threat logs.",
      tech: ["Express.js", "MongoDB", "WebSockets", "Docker", "Trivy", "Microservices"],
      github: "https://github.com/senthan-07/cyberhive",
      live: null, // No live deployment
      category: "Security",
      gradient: "from-red-500 to-orange-500",
      icon: FaShieldAlt,
      features: ["Intrusion Detection", "Port Scanning", "Vulnerability Analysis"],
      isCompanyProject: false
    }
  ]

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-indigo-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse delay-75"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-500/2 rounded-full blur-3xl animate-pulse delay-150"></div>
        
        {/* Floating particles */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-2 h-2 bg-indigo-400/40 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-blue-400/40 rounded-full"
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          
          <h2 className="font-elegant text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            My <span className="gradient-text">Projects</span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full shadow-lg"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Main Card */}
              <div className="relative glass rounded-3xl overflow-hidden hover:bg-slate-800/60 transition-all duration-500 hover:border-slate-600/60 hover:shadow-2xl hover:shadow-slate-500/20 h-full flex flex-col">
                
                {/* Header Section with Icon */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.gradient} shadow-lg relative`}>
                      <project.icon className="w-6 h-6 text-white" />
                      {project.isCompanyProject && (
                        <div className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full p-1">
                          <FaBuilding size={8} />
                        </div>
                      )}
                    </div>
                    
                    {/* Category Badge */}
                    <div className="flex items-center gap-2">
                      {project.isCompanyProject && (
                        <span className="bg-orange-500/20 text-orange-400 text-xs font-medium px-2 py-1 rounded-full border border-orange-500/30 font-elegant">
                          Internship
                        </span>
                      )}
                      <span className="glass text-slate-200 text-xs font-medium px-3 py-1.5 rounded-full font-elegant">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-elegant text-xl font-bold text-white mb-3 group-hover:text-slate-100 transition-colors tracking-wide">
                    {project.title}
                  </h3>
                  
                  <p className="font-elegant text-slate-300 mb-6 leading-relaxed text-sm font-light tracking-wide">
                    {project.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.features.map((feature, i) => (
                        <span
                          key={i}
                          className="glass text-slate-300 text-xs px-2 py-1 rounded-lg font-elegant"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="px-6 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * i, duration: 0.4 }}
                        className="glass text-slate-200 text-xs font-medium px-3 py-1.5 rounded-full font-elegant tracking-wide hover:bg-slate-700/80 hover:border-slate-500/60 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons - Consistent styling for single buttons */}
                <div className="px-6 pb-6 mt-auto">
                  <div className="flex justify-center">
                    {project.live ? (
                      <motion.a
                        href={project.live}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 text-white transition-colors bg-gradient-to-r ${project.gradient} px-8 py-3 mb-8.5 rounded-2xl hover:opacity-90 font-elegant text-sm font-medium tracking-wide justify-center shadow-lg group/btn w-full max-w-48 glow`}
                      >
                        <FaExternalLinkAlt size={16} className="group-hover/btn:-rotate-12 transition-transform" />
                        Live Demo
                      </motion.a>
                    ) : (
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors glass px-8 py-3 rounded-2xl hover:bg-slate-700/80 font-elegant text-sm font-medium tracking-wide justify-center group/btn w-full max-w-48"
                      >
                        <FaGithub size={16} className="group-hover/btn:rotate-12 transition-transform" />
                        Source Code
                      </motion.a>
                    )}
                  </div>
                  
                  {/* Note for projects without live demo */}
                  {!project.live && (
                    <div className="mt-3 text-center">
                      <span className="text-slate-400 text-xs font-elegant">
                        Development/Personal Project
                      </span>
                    </div>
                  )}
                </div>

                {/* Gradient border effect on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>
                
                {/* Subtle shine effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className={`absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/5 group-hover:animate-shine`}></div>
                </div>
              </div>

              {/* Enhanced floating glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none blur-xl -z-10 scale-105`}></div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass p-8 rounded-3xl max-w-2xl mx-auto relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-elegant text-2xl font-bold text-white mb-4">
                Want to see more?
              </h3>
              <p className="font-elegant text-slate-300 mb-6 font-light tracking-wide">
                Check out my GitHub for additional projects and contributions
              </p>
              <motion.a
                href="https://github.com/senthan-07"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-elegant font-medium tracking-wide hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 group glow"
              >
                <FaGithub size={20} className="group-hover:rotate-12 transition-transform" />
                View All Projects
              </motion.a>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) translateY(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }
      `}</style>
    </section>
  )
}
