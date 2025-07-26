'use client'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Building, Code } from 'lucide-react'

export default function Experience() {
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Dexio Designs",
      period: "June 2024 - July 2024",
      location: "Remote",
      description: [
        "Engineered responsive, production-grade UIs in Next.js + Tailwind for client-facing systems",
        "Developed reusable UI components, enhancing development speed and minimizing frontend issues across releases",
        "Led full-stack feature delivery – from designing HLD/LLD architectures to frontend-backend integration and Vercel deployment",
        "Improved development efficiency and team velocity, contributing to faster sprint completion and fewer rollbacks",
        "Converted Figma flows into pixel-perfect, accessible UIs with designers, cutting QA revisions by 50%"
      ],
      technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Prisma", "Figma" ,"Postgres" ,"FastAPI"],
      color: "from-blue-500 to-cyan-500"
    }
  ]

  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-pink-400 rounded-full"
          animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
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
            My <span className="gradient-text">Journey</span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto rounded-full shadow-lg"></div>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 top-full w-0.5 h-12 bg-gradient-to-b from-cyan-400 to-purple-400 opacity-30"></div>
              )}
              
              <div className="relative glass rounded-3xl p-8 overflow-hidden hover:bg-slate-800/60 transition-all duration-500 hover:border-slate-600/60 hover:shadow-2xl hover:shadow-cyan-500/10">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Header section */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="flex-1">
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {exp.title}
                      </motion.h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-slate-300">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-cyan-400" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-400" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="mt-4 lg:mt-0"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
                        <Calendar className="w-4 h-4 text-pink-400" />
                        <span className="text-slate-300 text-sm font-medium">{exp.period}</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-8">
                    <ul className="space-y-4">
                      {exp.description.map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="text-slate-300 flex items-start group/item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.2) + (i * 0.1), duration: 0.5 }}
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-cyan-400 mr-3 mt-1 text-lg group-hover/item:text-purple-400 transition-colors duration-300">•</span>
                          <span className="group-hover/item:text-white transition-colors duration-300 leading-relaxed">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Code className="w-5 h-5 text-pink-400" />
                      <h4 className="text-white font-semibold">Technologies Used</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {exp.technologies.map((tech, i) => (
                        <motion.span
                          key={tech}
                          className="glass text-cyan-300 text-sm px-3 py-1 rounded-full border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (index * 0.2) + (i * 0.1), duration: 0.5 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="glass p-8 rounded-3xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready for the Next Chapter
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              I&apos;m always looking for new opportunities to grow and contribute to exciting projects. 
              Let&apos;s work together to build something amazing!
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
