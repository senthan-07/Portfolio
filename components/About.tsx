'use client'
import { motion } from 'framer-motion'

export default function About() {
  const highlights = [
    {
      title: "Quick Learner",
      description: "Passionate about learning new technologies and frameworks",
      icon: "📚",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Fresh Perspective",
      description: "Bringing innovative ideas and modern approaches",
      icon: "✨",
      gradient: "from-cyan-500 to-purple-500"
    },
    {
      title: "Eager to Contribute",
      description: "Ready to make meaningful impact in development teams",
      icon: "🎯",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Problem Solver",
      description: "Analytical mindset with creative solution approaches",
      icon: "🧩",
      gradient: "from-pink-500 to-blue-500"
    }
  ]

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          
          <h2 className="font-elegant text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mx-auto rounded-full shadow-lg"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-80 h-80 mx-auto">
              {/* Enhanced glow effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative w-full h-full glass-strong rounded-3xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-full h-full flex items-center justify-center text-slate-400 rounded-3xl font-elegant relative z-10">
                  <div className="text-center">
                    <motion.div 
                      className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span className="text-white text-xl font-bold">SA</span>
                    </motion.div>
                    <p className="text-slate-300 text-sm group-hover:text-white transition-colors duration-300">Photo</p>
                  </div>
                </div>
              </div>
              
              {/* Floating accent elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full shadow-lg"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full shadow-lg"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div>
              <motion.h3 
                className="font-elegant text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Software Development Engineer
              </motion.h3>
              
              <motion.p 
                className="font-elegant text-lg text-slate-300 mb-8 leading-relaxed tracking-wide font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                I&apos;m a passionate fresher Software Development Engineer with 2-month internship experience. 
                I enjoy building modern web applications and solving problems with clean, efficient code.
              </motion.p>
            </div>

            {/* Modern stats display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Projects", value: "8+", color: "from-blue-500 to-cyan-500" },
                { label: "Technologies", value: "12+", color: "from-cyan-500 to-purple-500" },
                { label: "Experience", value: "2 Months", color: "from-purple-500 to-pink-500" },
                { label: "Learning", value: "Always", color: "from-pink-500 to-blue-500" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass p-4 rounded-2xl text-center group hover:bg-slate-800/60 transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.02 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm font-medium group-hover:text-slate-300 transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Highlights Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.h3 
            className="font-elegant text-3xl font-bold text-white text-center mb-12 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Core <span className="gradient-text-static">Strengths</span>
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative glass p-6 rounded-3xl text-center group hover:bg-slate-800/60 transition-all duration-500 hover:border-slate-600/60 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer overflow-hidden"
                whileHover={{ 
                  y: -8, 
                  scale: 1.05,
                  rotateX: 5,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <motion.div 
                  className="text-4xl mb-4 relative z-10"
                  whileHover={{ 
                    scale: 1.3,
                    rotate: [0, -15, 15, 0],
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {highlight.icon}
                </motion.div>
                
                <h4 className="font-elegant text-lg font-bold text-white mb-3 tracking-wide group-hover:text-cyan-300 transition-colors duration-300 relative z-10">
                  {highlight.title}
                </h4>
                
                <p className="font-elegant text-slate-300 leading-relaxed font-light tracking-wide text-sm group-hover:text-slate-200 transition-colors duration-300 relative z-10">
                  {highlight.description}
                </p>
                
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
