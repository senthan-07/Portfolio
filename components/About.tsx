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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-elegant text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 md:mb-8 tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
          
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mx-auto rounded-full shadow-lg"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Redesigned Professional Image/Avatar Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* === Animated Background Rings === */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-blue-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ width: '100%', height: '100%', aspectRatio: '1' }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border border-cyan-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />

              {/* === Main Profile Card === */}
              <motion.div
                className="relative max-w-sm mx-auto"
                initial={false}
                animate={false}
              >
                <motion.div
                  className="relative bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 border border-slate-600/30 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 overflow-hidden group"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Card Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 rounded-3xl"></div>
                  <motion.div
                    className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* === Card Content === */}
                  <div className="relative z-10 text-center">
                    {/* --- Avatar --- */}
                    <motion.div
                      className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {/* Animated Gradient Ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2"
                        style={{
                          background: 'conic-gradient(from 0deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)',
                          padding: '2px',
                          borderRadius: '50%'
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      >
                        <div className="w-full h-full bg-slate-800 rounded-full"></div>
                      </motion.div>
                      {/* Avatar Content */}
                      <div className="absolute inset-2 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-400/50 via-cyan-400/50 to-purple-400/50 rounded-full"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                        />
                        <span className="relative z-10 text-white text-3xl font-bold tracking-wider font-elegant">
                          SA
                        </span>
                      </div>
                    </motion.div>

                    {/* --- Name and Title --- */}
                    <motion.h3
                      className="text-white text-2xl font-bold font-elegant tracking-wide mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Senthan Amuthan
                    </motion.h3>
                    <motion.p
                      className="text-slate-300 text-base font-medium mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Software Developer
                    </motion.p>

                    {/* --- Status Indicator --- */}
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-full border border-slate-600/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-slate-300 text-sm font-medium">Available for opportunities</span>
                    </motion.div>
                  </div>

                  {/* --- Subtle Decorative Dots --- */}
                  <div className="absolute top-6 right-6 w-2 h-2 bg-blue-400 rounded-full opacity-40"></div>
                  <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-30"></div>
                </motion.div>

                {/* === Floating Tech/Accent Icons === */}
                <motion.div
                  className="absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500/90 to-blue-600/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-blue-400/20"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <span className="text-white text-sm sm:text-base md:text-lg">⚛️</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-3 -left-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500/90 to-cyan-600/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-cyan-400/20"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  whileHover={{ scale: 1.1, rotate: -10 }}
                >
                  <span className="text-white text-sm sm:text-base md:text-lg">💻</span>
                </motion.div>

                <motion.div
                  className="absolute top-1/4 -left-3 sm:-left-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500/90 to-purple-600/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-purple-400/20"
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white text-xs sm:text-sm md:text-base">🚀</span>
                </motion.div>

              </motion.div>

              {/* === Additional Floating Accent Icon === */}
              <motion.div
                className="absolute bottom-2 -right-3 sm:right-3 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 3 }}
              >
                <span className="text-white text-xs sm:text-sm">⭐</span>
              </motion.div>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 md:space-y-8 order-1 lg:order-2"
          >
            <div>
              <motion.h3 
                className="font-elegant text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Software Development Engineer
              </motion.h3>
              
              <motion.p 
                className="font-elegant text-base sm:text-lg text-slate-300 mb-6 md:mb-8 leading-relaxed tracking-wide font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                I&apos;m a passionate fresher Software Development Engineer with 2-month internship experience. 
                I enjoy building modern web applications and solving problems with clean, efficient code.
              </motion.p>
            </div>

            {/* Enhanced responsive stats display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {[
                { label: "Projects", value: "8+", color: "from-blue-500 to-cyan-500" },
                { label: "Technologies", value: "12+", color: "from-cyan-500 to-purple-500" },
                { label: "Experience", value: "2 Months", color: "from-purple-500 to-pink-500" },
                { label: "Learning", value: "Always", color: "from-pink-500 to-blue-500" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center group hover:bg-slate-800/60 transition-all duration-300 border border-slate-700/30 hover:border-slate-600/50"
                  whileHover={{ y: -3, scale: 1.02 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <div className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm font-medium group-hover:text-slate-300 transition-colors">
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
            className="font-elegant text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Core <span className="gradient-text-static">Strengths</span>
          </motion.h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative glass p-5 sm:p-6 rounded-2xl sm:rounded-3xl text-center group hover:bg-slate-800/60 transition-all duration-500 hover:border-slate-600/60 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer overflow-hidden border border-slate-700/30"
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
                  className="text-3xl sm:text-4xl mb-3 sm:mb-4 relative z-10"
                  whileHover={{ 
                    scale: 1.3,
                    rotate: [0, -15, 15, 0],
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {highlight.icon}
                </motion.div>
                
                <h4 className="font-elegant text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 tracking-wide group-hover:text-cyan-300 transition-colors duration-300 relative z-10">
                  {highlight.title}
                </h4>
                
                <p className="font-elegant text-slate-300 leading-relaxed font-light tracking-wide text-xs sm:text-sm group-hover:text-slate-200 transition-colors duration-300 relative z-10">
                  {highlight.description}
                </p>
                
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
