'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 200 // Offset for better detection
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ]

  // Get the appropriate transform based on screen size - only after mounting
  const getTransformStyle = () => {
    if (!isMounted) {
      return { transform: 'none' } // Default for SSR
    }
    
    return window.innerWidth >= 768 
      ? { transform: 'translateX(-50%) scale(1.4)' }
      : { transform: 'none' }
  }

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'glass-strong shadow-2xl border-slate-700/30 md:bg-transparent' 
            : 'glass border-slate-700/30 md:bg-transparent'
        } border md:border-slate-700/30 md:rounded-full md:w-auto md:left-1/2 md:transform md:-translate-x-1/2 md:top-4 md:right-auto right-0`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={getTransformStyle()}
      >
        <div className="px-4 py-3 md:px-1 md:py-1">
          <div className="flex items-center justify-between md:justify-center relative">
            {/* Portfolio text - only visible on mobile */}
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="font-elegant text-lg font-semibold text-white tracking-wide bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                Portfolio
              </span>
            </motion.div>

            {/* Mobile Menu Button - right on mobile, hidden on desktop */}
            <motion.button
              className="md:hidden text-white p-2 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300 overflow-hidden backdrop-blur-sm"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Desktop Navigation - centered on desktop */}
            <div className="hidden md:flex">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`relative font-elegant text-base font-medium tracking-wide transition-all duration-300 px-5 py-3 rounded-full group overflow-hidden ${
                      isActive 
                        ? 'text-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/25' 
                        : 'text-slate-200 hover:text-blue-400 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/25'
                    }`}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 glass-strong backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col justify-center items-center h-full px-6">
              <div className="w-full max-w-md space-y-4">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className={`block font-elegant text-xl font-medium tracking-wide py-4 px-6 rounded-lg transition-all duration-300 text-center relative overflow-hidden group w-full backdrop-blur-sm ${
                        isActive 
                          ? 'text-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/25' 
                          : 'text-slate-200 hover:text-blue-400 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/25'
                      }`}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ originX: 0 }}
                      />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}