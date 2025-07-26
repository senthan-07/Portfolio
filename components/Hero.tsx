'use client'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaDownload, FaEnvelope } from 'react-icons/fa'
import ParticlesComponent from './Particles'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-400 rounded-full"
          animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full"
          animate={{ y: [0, -25, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Particles background */}
      <div className="particles-container">
        <ParticlesComponent />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 md:mt-12"
        >
          <motion.h2 
            className="font-elegant text-4xl md:text-7xl font-bold mb-8 tracking-tight mt-8 md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Hi, I&apos;m{' '}
            <span className="gradient-text">Senthan Amuthan</span>
          </motion.h2>

          <motion.p
            className="font-elegant text-2xl md:text-4xl font-normal text-slate-300 mb-8 tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Software Development Engineer
          </motion.p>
          
          <motion.p
            className="font-elegant text-lg md:text-xl font-light text-slate-400 mb-12 max-w-3xl mx-auto tracking-wide leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Passionate about creating innovative solutions and building scalable applications. 
            Currently seeking opportunities to contribute to impactful projects.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.a
              href="/Senthan_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden glow"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.15, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
              animate={{ 
                scale: 1,
                transition: { duration: 0.12, ease: "easeOut" }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FaDownload size={20} className="relative z-10" />
              <span className="relative z-10">View Resume</span>
            </motion.a>
            
            <motion.a
              href="#contact"
              className="group relative inline-flex items-center gap-3 border-2 border-slate-600 text-slate-300 px-8 py-4 rounded-2xl font-semibold hover:border-blue-400 hover:text-blue-400 transition-all duration-300 backdrop-blur-sm glass"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.15, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
              animate={{ 
                scale: 1,
                transition: { duration: 0.12, ease: "easeOut" }
              }}
            >
              <span>Get In Touch</span>
              <motion.div
                className="w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              />
            </motion.a>
          </motion.div>
          
          <motion.div
            className="flex justify-center space-x-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            {[
              { icon: FaGithub, href: "https://github.com/senthan-07", label: "GitHub" },
              { icon: FaLinkedin, href: "https://linkedin.com/in/b-t-senthan-amuthan-17006827b/", label: "LinkedIn" },
              { icon: FaEnvelope, href: "mailto:senthanbalu@gmail.com", label: "Email" }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-slate-400 hover:text-blue-400 p-4 rounded-2xl hover:bg-slate-800/50 backdrop-blur-sm border border-transparent hover:border-slate-700 glass"
                whileHover={{ 
                  y: -3, 
                  scale: 1.15,
                  transition: { duration: 0.12, ease: "easeOut" }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.08 }
                }}
                animate={{ 
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.1, ease: "easeOut" }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.05, duration: 0.5 }}
                style={{
                  transition: "color 0.12s ease, background-color 0.12s ease, border-color 0.12s ease"
                }}
              >
                <social.icon size={24} />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}