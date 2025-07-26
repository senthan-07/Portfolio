'use client'
import { motion } from 'framer-motion'
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaJs, 
  FaHtml5, 
  FaGitAlt, 
  FaDocker, 
  FaAws, 
  FaLinux, 
  FaFigma 
} from 'react-icons/fa'
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiExpress, 
  SiDjango, 
  SiGraphql, 
  SiMongodb, 
  SiPostgresql, 
  SiMysql, 
  SiRedis, 
  SiFirebase, 
  SiPostman 
} from 'react-icons/si'
import { BiServer } from 'react-icons/bi'

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      subtitle: "Modern web interfaces",
      skills: [
        { name: "React", icon: FaReact, color: "#61DAFB" },
        { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
        { name: "HTML/CSS", icon: FaHtml5, color: "#E34F26" }
      ]
    },
    {
      title: "Backend",
      subtitle: "Server-side solutions",
      skills: [
        { name: "Node.js", icon: FaNodeJs, color: "#339933" },
        { name: "Express", icon: SiExpress, color: "#FFFFFF" },
        { name: "Python", icon: FaPython, color: "#3776AB" },
        { name: "Django", icon: SiDjango, color: "#092E20" },
        { name: "RESTful APIs", icon: BiServer, color: "#8B5CF6" },
        { name: "GraphQL", icon: SiGraphql, color: "#E10098" }
      ]
    },
    {
      title: "Database",
      subtitle: "Data management",
      skills: [
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
        { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        { name: "Redis", icon: SiRedis, color: "#DC382D" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" }
      ]
    },
    {
      title: "Tools & Others",
      subtitle: "Development ecosystem",
      skills: [
        { name: "Git", icon: FaGitAlt, color: "#F05032" },
        { name: "Docker", icon: FaDocker, color: "#2496ED" },
        { name: "AWS", icon: FaAws, color: "#FF9900" },
        { name: "Linux", icon: FaLinux, color: "#FCC624" },
        { name: "Figma", icon: FaFigma, color: "#F24E1E" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" }
      ]
    }
  ]

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-slate-700/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-slate-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-700/3 rounded-full blur-3xl"></div>
        
        {/* Subtle floating particles */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-1 h-1 bg-slate-400 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-slate-500 rounded-full"
          animate={{ y: [0, -15, 0], opacity: [0.4, 0.8, 0.4] }}
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
           Tech <span className="gradient-text">Stack</span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mx-auto rounded-full shadow-lg"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative glass rounded-3xl p-8 overflow-hidden hover:bg-slate-800/60 transition-all duration-500 hover:border-slate-600/60 hover:shadow-2xl hover:shadow-slate-500/10">
                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-8">
                    <h3 className="font-elegant text-2xl font-bold text-white mb-2 group-hover:text-slate-100 transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="font-elegant text-slate-300 text-sm font-medium tracking-wide">
                      {category.subtitle}
                    </p>
                  </div>
                  
                  {/* Skills grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {category.skills.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (index * 0.1) + (i * 0.05), duration: 0.5 }}
                        className="relative group/skill"
                      >
                        <div className="glass rounded-2xl p-4 group-hover/skill:border-slate-500/70 transition-all duration-300 group-hover/skill:bg-slate-700/90 hover:shadow-lg hover:shadow-slate-500/10">
                          <div className="flex items-center gap-3">
                            <motion.div
                              className="flex-shrink-0"
                              whileHover={{ 
                                rotate: [0, -10, 10, 0],
                                scale: 1.2 
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <skill.icon 
                                className="w-6 h-6 transition-transform duration-300" 
                                style={{ color: skill.color }}
                              />
                            </motion.div>
                            <span className="font-elegant text-slate-100 font-medium text-sm group-hover/skill:text-white transition-colors duration-300">
                              {skill.name}
                            </span>
                          </div>
                        </div>
                        
                        {/* Skill glow effect matching icon color */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover/skill:opacity-15 transition-all duration-300"
                          style={{ backgroundColor: skill.color }}
                        ></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Enhanced subtle glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-slate-600/0 group-hover:bg-slate-600/10 transition-all duration-500 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
